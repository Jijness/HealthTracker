@echo off
echo Cài đặt dependencies cho backend...
cd backend
npm  install
cd ..

echo Cài đặt dependencies cho frontend...
cd frontend
npm install
cd ..

echo Đã cài đặt tất cả dependencies!
pause