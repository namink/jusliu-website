@echo off
setlocal
cd /d "%~dp0"

where pyw >nul 2>nul
if %errorlevel%==0 (
    start "" pyw "%~dp0pdf2img_gui.py"
    exit /b 0
)

where pythonw >nul 2>nul
if %errorlevel%==0 (
    start "" pythonw "%~dp0pdf2img_gui.py"
    exit /b 0
)

echo Python (pythonw/pyw) not found. Please install Python.
pause
exit /b 1
