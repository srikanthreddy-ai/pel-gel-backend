@echo off
cd /d D:\pelgel-admin-Incentive-portal\pel-gel-backend
echo Starting pel-gel-backend with PM2...
pm2 start bin/www --name "pel-gel-backend"
pm2 logs pel-gel-backend
pause