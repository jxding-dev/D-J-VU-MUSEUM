@echo off
setlocal

cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 exit /b %errorlevel%
)

echo Starting DÉJÀ VU MUSEUM...
echo Open http://127.0.0.1:5173/ in your browser.
call npm.cmd run dev -- --host 127.0.0.1
