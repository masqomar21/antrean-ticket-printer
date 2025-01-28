@echo off
echo Checking if Node.js is installed...
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Downloading and installing Node.js 22 LTS...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi' -OutFile 'nodejs.msi'}"
    start /wait msiexec /i nodejs.msi /qn
    del nodejs.msi
    echo Node.js installation complete.
) ELSE (
    echo Node.js is already installed.
)

echo Installing dependencies...
call npm install

echo Installation complete. Press any key to exit.
pause