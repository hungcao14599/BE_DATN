# 🚀 Hướng dẫn Setup CI/CD cho Social Network Backend

## Bước 1: Cấu hình GitLab CI/CD Variables

### Truy cập GitLab Settings
1. Mở: `http://git.bonmovies.online/viethung14599/social-network-be/-/settings/ci_cd`
2. Mở rộng phần **Variables**
3. Click **Add Variable** và thêm các biến sau:

### Variables cần thiết cho Staging:

| Key | Value | Type | Protected | Masked |
|-----|-------|------|-----------|--------|
| `STAGING_SERVER` | IP hoặc hostname server staging | Variable | ✅ | ❌ |
| `STAGING_USER` | Username SSH (vd: root, ubuntu) | Variable | ✅ | ❌ |
| `STAGING_SSH_PRIVATE_KEY` | Nội dung SSH private key | File | ✅ | ✅ |
| `STAGING_PATH` | `/var/www/app/social-network-be-staging` | Variable | ✅ | ❌ |

### Variables cần thiết cho Production:

| Key | Value | Type | Protected | Masked |
|-----|-------|------|-----------|--------|
| `PRODUCTION_SERVER` | `34.124.191.55` hoặc domain | Variable | ✅ | ❌ |
| `PRODUCTION_USER` | Username SSH (vd: root, ubuntu) | Variable | ✅ | ❌ |
| `PRODUCTION_SSH_PRIVATE_KEY` | Nội dung SSH private key | File | ✅ | ✅ |
| `PRODUCTION_PATH` | `/var/www/app/social-network-be` | Variable | ✅ | ❌ |

---

## Bước 2: Chuẩn bị Server Production

### 2.1. Kết nối SSH vào server
```bash
ssh root@34.124.191.55
# Hoặc
ssh ubuntu@34.124.191.55
```

### 2.2. Cài đặt Node.js (nếu chưa có)
```bash
# Cài Node.js 16
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kiểm tra version
node --version
npm --version
```

### 2.3. Cài đặt PM2 (Process Manager)
```bash
sudo npm install -g pm2

# Kiểm tra PM2
pm2 --version
```

### 2.4. Cài đặt Babel (nếu chưa có)
```bash
sudo npm install -g @babel/node @babel/core
```

### 2.5. Tạo thư mục ứng dụng
```bash
# Tạo thư mục
sudo mkdir -p /var/www/app/social-network-be

# Phân quyền cho user hiện tại
sudo chown -R $USER:$USER /var/www/app/social-network-be

# Di chuyển vào thư mục
cd /var/www/app/social-network-be
```

### 2.6. Tạo file .env trên server
```bash
nano /var/www/app/social-network-be/.env
```

Thêm nội dung sau vào file `.env`:
```env
# Application
NODE_ENV=production
PORT=3000

# JWT Secret
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key_here_change_this

# Database Configuration
DB_NAME=social_network_tlu
DB_USERNAME=viethung
PASSWORD=Boythach199*
HOST=34.124.191.55
DB_PORT=3306

# Mail Configuration (nếu có)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_email_password
```

**Lưu file**: Nhấn `Ctrl + X`, sau đó `Y`, rồi `Enter`

### 2.7. Cấu hình Firewall (nếu cần)
```bash
# Cho phép port 3000
sudo ufw allow 3000/tcp

# Cho phép SSH
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable

# Kiểm tra status
sudo ufw status
```

---

## Bước 3: Setup SSH Key cho GitLab CI/CD

### 3.1. Tạo SSH Key pair trên máy local
```bash
# Tạo SSH key mới cho GitLab CI/CD
ssh-keygen -t rsa -b 4096 -C "gitlab-ci-cd" -f ~/.ssh/gitlab_ci_rsa

# Không cần nhập passphrase (Enter 2 lần)
```

### 3.2. Copy Public Key lên Server
```bash
# Copy public key lên server
ssh-copy-id -i ~/.ssh/gitlab_ci_rsa.pub root@34.124.191.55

# Hoặc thủ công:
cat ~/.ssh/gitlab_ci_rsa.pub
# Copy nội dung và paste vào /root/.ssh/authorized_keys trên server
```

### 3.3. Test SSH connection
```bash
# Test kết nối
ssh -i ~/.ssh/gitlab_ci_rsa root@34.124.191.55

# Nếu thành công, thoát ra
exit
```

### 3.4. Lấy Private Key để thêm vào GitLab
```bash
# Xem nội dung private key
cat ~/.ssh/gitlab_ci_rsa

# Copy toàn bộ nội dung (bao gồm cả -----BEGIN ... và -----END ...)
```

Paste nội dung này vào biến `PRODUCTION_SSH_PRIVATE_KEY` trong GitLab CI/CD Variables.

---

## Bước 4: Test CI/CD Pipeline

### 4.1. Push code lên GitLab để trigger pipeline
```bash
# Trên máy local
cd /Users/viethung-phenikaax/Desktop/phenikaaX/social-network-be

# Thêm thay đổi nhỏ để test
git commit --allow-empty -m "Test CI/CD pipeline"
git push gitlab master
```

### 4.2. Kiểm tra Pipeline trên GitLab
1. Truy cập: `http://git.bonmovies.online/viethung14599/social-network-be/-/pipelines`
2. Xem pipeline đang chạy
3. Click vào pipeline để xem chi tiết các jobs

### 4.3. Deploy thủ công từ GitLab UI
1. Khi pipeline chạy xong stage **build**
2. Vào tab **deploy_production** job
3. Click nút **Play** (▶️) để chạy deployment
4. Chờ deployment hoàn tất

---

## Bước 5: Kiểm tra ứng dụng đã chạy

### 5.1. SSH vào server và kiểm tra
```bash
ssh root@34.124.191.55

# Kiểm tra PM2
pm2 status

# Xem logs
pm2 logs social-network-be

# Kiểm tra process
pm2 monit
```

### 5.2. Test API
```bash
# Test từ server
curl http://localhost:3000

# Hoặc test từ browser
http://34.124.191.55:3000
```

---

## Bước 6: Setup PM2 Auto-start sau khi server reboot

```bash
# SSH vào server
ssh root@34.124.191.55

# Generate startup script
pm2 startup

# Lưu danh sách process hiện tại
pm2 save

# Test restart
sudo reboot
# Sau khi server restart, SSH lại và kiểm tra
pm2 list
```

---

## 🔧 Troubleshooting

### Lỗi: SSH Permission denied
```bash
# Trên server, kiểm tra quyền
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Lỗi: PM2 command not found trong pipeline
- Cài đặt PM2 globally trên server: `sudo npm install -g pm2`

### Lỗi: Port 3000 đã được sử dụng
```bash
# Tìm process đang dùng port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>

# Hoặc restart PM2
pm2 restart social-network-be
```

### Lỗi: Database connection failed
- Kiểm tra file `.env` trên server có đúng thông tin DB không
- Kiểm tra firewall có cho phép kết nối đến DB server không
- Test kết nối: `mysql -h 34.124.191.55 -u viethung -p`

### Pipeline fails at rsync
- Đảm bảo rsync đã được cài trên server: `sudo apt-get install rsync`

---

## 📊 Workflow Deployment

### Development → Staging
1. Tạo branch `develop` từ `master`
2. Push code lên `develop`
3. Pipeline tự động chạy
4. Manually deploy từ GitLab UI

### Staging → Production
1. Merge `develop` vào `master`
2. Push lên `master`
3. Pipeline tự động chạy
4. Manually deploy production từ GitLab UI

---

## 🔐 Security Checklist

- ✅ SSH key được tạo riêng cho CI/CD
- ✅ Private key được mask trong GitLab Variables
- ✅ `.env` file không được commit vào git
- ✅ Database password được bảo mật
- ✅ JWT secret được generate ngẫu nhiên
- ✅ Firewall được cấu hình đúng
- ✅ PM2 được setup auto-restart

---

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. GitLab Pipeline logs: `http://git.bonmovies.online/viethung14599/social-network-be/-/pipelines`
2. Server logs: `pm2 logs social-network-be`
3. System logs: `journalctl -u pm2-root -f`

---

**Chúc bạn setup thành công! 🎉**
