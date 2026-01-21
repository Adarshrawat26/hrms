# HRMS Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database backups set up
- [ ] SSL certificates obtained
- [ ] Domain configured
- [ ] Monitoring tools configured

### Backend Deployment

#### Option 1: AWS EC2 Deployment

1. **Launch EC2 Instance**

   ```bash
   # Ubuntu 22.04 LTS recommended
   ```

2. **Install Dependencies**

   ```bash
   sudo apt update
   sudo apt install nodejs npm postgresql postgresql-contrib nginx
   ```

3. **Clone Repository**

   ```bash
   cd /home/ubuntu
   git clone <repo-url> hrms
   cd hrms/backend
   npm install
   ```

4. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

5. **Run Migrations**

   ```bash
   npm run prisma:migrate
   npm run seed
   ```

6. **Build and Start**

   ```bash
   npm run build
   npm start
   ```

7. **Setup PM2 for Process Management**

   ```bash
   npm install -g pm2
   pm2 start dist/main.js --name "hrms-backend"
   pm2 startup
   pm2 save
   ```

8. **Configure Nginx Reverse Proxy**

   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable SSL with Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

#### Option 2: DigitalOcean Deployment

1. **Create Droplet** (Ubuntu 22.04, 2GB RAM minimum)

2. **Follow AWS EC2 steps above**

3. **Use Droplet Backups** for automated backups

#### Option 3: Docker Deployment

1. **Build Docker Image**

   ```bash
   docker build -t hrms-backend:latest ./backend
   ```

2. **Push to Registry**

   ```bash
   docker tag hrms-backend:latest your-registry/hrms-backend:latest
   docker push your-registry/hrms-backend:latest
   ```

3. **Deploy with Docker Compose**
   ```yaml
   version: "3.9"
   services:
     backend:
       image: your-registry/hrms-backend:latest
       environment:
         DATABASE_URL: postgresql://user:pass@postgres:5432/hrms
         JWT_SECRET: ${JWT_SECRET}
       ports:
         - "3000:3000"
       depends_on:
         - postgres
   ```

### Frontend Deployment

#### Option 1: Vercel (Recommended for Next.js)

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the `frontend` directory

2. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` pointing to your backend API

3. **Deploy**
   - Vercel automatically builds and deploys on push

#### Option 2: AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Configure Build Settings**

   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - npm install
           - npm run build
     artifacts:
       baseDirectory: ".next"
       files:
         - "**/*"
   ```

3. **Set Environment Variables**
   - `NEXT_PUBLIC_API_URL`

#### Option 3: Self-Hosted (EC2 / DigitalOcean)

1. **Install Node.js**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install nodejs
   ```

2. **Clone Repository**

   ```bash
   cd /home/ubuntu
   git clone <repo-url> hrms
   cd hrms/frontend
   npm install
   ```

3. **Build**

   ```bash
   npm run build
   ```

4. **Setup PM2**

   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "hrms-frontend"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx**

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Database Deployment

#### AWS RDS PostgreSQL

1. **Create RDS Instance**
   - Engine: PostgreSQL 15
   - Multi-AZ: Yes (for production)
   - Storage: 100 GB (adjust as needed)

2. **Configure Security Groups**
   - Allow inbound on port 5432 from application security group

3. **Update Connection String**

   ```env
   DATABASE_URL=postgresql://user:password@endpoint:5432/hrms_db
   ```

4. **Run Migrations**

   ```bash
   npm run prisma:migrate
   ```

5. **Setup Automated Backups**
   - Retention period: 30 days
   - Backup window: Off-peak hours

#### Self-Hosted PostgreSQL

1. **Install PostgreSQL**

   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

2. **Create Database**

   ```bash
   sudo -u postgres psql
   CREATE DATABASE hrms_db;
   CREATE USER hrms_user WITH PASSWORD 'strong_password';
   GRANT ALL PRIVILEGES ON DATABASE hrms_db TO hrms_user;
   ```

3. **Backup Strategy**
   ```bash
   # Daily backup script
   sudo crontab -e
   0 2 * * * pg_dump -U hrms_user hrms_db > /backups/hrms_$(date +\%Y\%m\%d).sql
   ```

### SSL/TLS Configuration

1. **Let's Encrypt with Certbot**

   ```bash
   sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
   sudo certbot renew --dry-run
   ```

2. **HTTP to HTTPS Redirect**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       return 301 https://$server_name$request_uri;
   }
   ```

### Monitoring & Logging

#### CloudWatch (AWS)

- Setup CloudWatch agent for EC2
- Create alarms for CPU, memory, disk usage
- Enable detailed monitoring

#### Application Monitoring

```bash
# Install PM2 Monitoring
pm2 install pm2-auto-pull
pm2 install pm2-logrotate
```

#### Log Aggregation

```bash
# Install Winston for logging
npm install winston
```

### Performance Optimization

1. **Enable Gzip Compression**

   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   gzip_min_length 1000;
   ```

2. **Add Cache Headers**

   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
       expires 365d;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Database Connection Pooling**
   - Use PgBouncer for PostgreSQL
   ```bash
   sudo apt install pgbouncer
   ```

### Security Hardening

1. **Firewall Configuration**

   ```bash
   sudo ufw allow ssh
   sudo ufw allow http
   sudo ufw allow https
   sudo ufw enable
   ```

2. **Security Headers**

   ```nginx
   add_header X-Content-Type-Options "nosniff";
   add_header X-Frame-Options "DENY";
   add_header X-XSS-Protection "1; mode=block";
   ```

3. **Rate Limiting**
   ```nginx
   limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
   limit_req zone=api burst=20 nodelay;
   ```

### CI/CD Setup

#### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "20"
      - run: cd backend && npm install
      - run: cd backend && npm run build
      - run: ssh deploy@api.yourdomain.com 'cd /home/deploy/hrms/backend && git pull && npm install && npm run build && pm2 restart hrms-backend'

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install && npm run build
      - run: |
          curl https://api.vercel.com/v1/integrations/deploy/QmExample/QmExample?teamId=YOUR_TEAM_ID
```

### Post-Deployment Verification

- [ ] Backend API responding on all endpoints
- [ ] Frontend loading correctly
- [ ] Authentication working
- [ ] Database migrations completed
- [ ] SSL certificate valid
- [ ] Monitoring alerts configured
- [ ] Backup processes running
- [ ] Load testing completed
- [ ] Security scanning passed

### Rollback Plan

1. **Keep Previous Version**

   ```bash
   git tag v1.0.0 production
   ```

2. **Quick Rollback Script**
   ```bash
   #!/bin/bash
   git checkout v1.0.0
   npm install
   npm run build
   pm2 restart hrms-backend
   ```

### Maintenance Tasks

**Weekly:**

- Review error logs
- Check disk space
- Verify backups

**Monthly:**

- Security updates
- Performance review
- Database optimization

**Quarterly:**

- Dependency updates
- Load testing
- Disaster recovery drill

## Support

For deployment issues, contact: deployment-support@hrms.com
