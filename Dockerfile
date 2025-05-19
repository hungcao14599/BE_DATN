# Image Node.js chính thức
FROM node:18

# Thư mục làm việc trong container
WORKDIR /app

# Copy package.json và cài đặt package
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port ứng dụng đang chạy
EXPOSE 3000

# Lệnh khởi chạy app
CMD ["npm", "start"]