# GitLab CI/CD Setup Guide

## Overview
This project uses GitLab CI/CD for automated testing, building, and deployment of the social network backend application.

## Pipeline Stages

The CI/CD pipeline consists of 4 stages:

1. **Install** - Install project dependencies
2. **Test** - Run code quality checks and tests
3. **Build** - Build the application
4. **Deploy** - Deploy to staging or production environments

## Required GitLab CI/CD Variables

Configure these variables in GitLab: **Settings > CI/CD > Variables**

### Staging Environment
- `STAGING_SERVER` - Staging server IP or hostname
- `STAGING_USER` - SSH user for staging server
- `STAGING_SSH_PRIVATE_KEY` - SSH private key for staging server
- `STAGING_PATH` - Application path on staging server (e.g., `/var/www/social-network-be-staging`)

### Production Environment
- `PRODUCTION_SERVER` - Production server IP or hostname
- `PRODUCTION_USER` - SSH user for production server
- `PRODUCTION_SSH_PRIVATE_KEY` - SSH private key for production server
- `PRODUCTION_PATH` - Application path on production server (e.g., `/var/www/social-network-be`)

## Server Prerequisites

### For SSH Deployment

1. **Install Node.js** (version 16+)
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Install PM2** (Process Manager)
```bash
sudo npm install -g pm2
```

3. **Setup application directory**
```bash
sudo mkdir -p /var/www/social-network-be
sudo chown $USER:$USER /var/www/social-network-be
```

4. **Create .env file** on server
```bash
cd /var/www/social-network-be
nano .env
```

Add your environment variables:
```env
ACCESS_TOKEN_SECRET=your_secret_key_here
NODE_ENV=production
PORT=3000
```

5. **Setup SSH access**
```bash
# Generate SSH key pair locally
ssh-keygen -t rsa -b 4096 -C "gitlab-ci"

# Copy public key to server
ssh-copy-id user@server
```

## Deployment Method

### SSH + PM2 Deployment

This method:
- Uses rsync to sync files to the server
- Installs dependencies on the server
- Uses PM2 to manage the Node.js process

Triggers:
- **Staging**: Manually from `develop` branch
- **Production**: Manually from `master` branch

## Workflow

### Development Workflow
1. Create feature branch from `develop`
2. Make changes and commit
3. Push to GitLab - CI pipeline runs automatically
4. Create merge request to `develop`
5. After merge, manually deploy to staging for testing

### Production Deployment
1. Merge `develop` into `master`
2. Push to GitLab - CI pipeline runs
3. Manually trigger production deployment
4. Monitor application logs

## Manual Deployment Commands

### Using PM2
```bash
# SSH to server
ssh user@server

# Navigate to app directory
cd /var/www/social-network-be

# Pull latest changes
git pull origin master

# Install dependencies
npm ci --production

# Restart with PM2
pm2 restart social-network-be

# Or start if not running
pm2 start bin/www.js --name social-network-be --interpreter babel-node

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

## Monitoring and Logs

### PM2 Logs
```bash
# View logs
pm2 logs social-network-be

# Monitor resources
pm2 monit

# View process status
pm2 status
```

## Rollback

### PM2 Rollback
```bash
ssh user@server
cd /var/www/social-network-be
git checkout <previous-commit-hash>
npm ci --production
pm2 restart social-network-be
```

## Troubleshooting

### Pipeline Fails at Install Stage
- Check if `package.json` is valid
- Verify Node.js version compatibility

### Pipeline Fails at Deploy Stage
- Verify SSH keys are correctly configured in GitLab CI/CD variables
- Check if server is accessible
- Verify user has correct permissions on deployment directory

### Application Won't Start
- Check environment variables on server
- Verify database connection
- Check PM2 or Docker logs
- Ensure port 3000 is not already in use

## Security Best Practices

1. **Never commit sensitive data** to repository
2. **Use GitLab CI/CD variables** for secrets (mark as protected and masked)
3. **Restrict SSH access** to specific IPs if possible
4. **Use separate databases** for staging and production
5. **Enable HTTPS** on production server
6. **Regular backups** of database and application files
7. **Keep dependencies updated** regularly

## Additional Resources

- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Docker Documentation](https://docs.docker.com/)
