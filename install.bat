@REM @echo off
@REM setlocal EnableDelayedExpansion

@REM :: Detect if running in PowerShell
@REM for /f "delims=" %%A in ('powershell -Command "$PSVersionTable.PSVersion.Major"') do set PS_VERSION=%%A

@REM if defined PS_VERSION (
@REM     echo Running in PowerShell...
@REM     set USE_POWERSHELL=1
@REM ) else (
@REM     echo Running in Command Prompt...
@REM     set USE_POWERSHELL=0
@REM )

@REM echo Checking if Node.js is installed...
@REM where node >nul 2>nul
@REM IF %ERRORLEVEL% NEQ 0 (
@REM     echo Node.js is not installed. Downloading and installing Node.js 22 LTS...
    
@REM     if %USE_POWERSHELL%==1 (
@REM         powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi' -OutFile 'nodejs.msi'"
@REM     ) else (
@REM         curl -o nodejs.msi https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi
@REM     )
    
@REM     start /wait msiexec /i nodejs.msi /qn
@REM     del nodejs.msi
@REM     echo Node.js installation complete.
@REM ) ELSE (
@REM     echo Node.js is already installed.
@REM )

@REM echo Installing dependencies...
@REM call npm install

@REM echo Installation complete. Press any key to exit.
@REM pause


@echo off
echo Installing dependencies...
call npm install
echo Installation complete.
pause