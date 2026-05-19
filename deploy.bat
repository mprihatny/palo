@echo off
REM Deploy script using EasyDiffusion Git installation
cd /d "c:\Users\micha\Desktop\Paľo & Kapucíni\palostranka"
"C:\EasyDiffusion\installer_files\env\Library\mingw64\bin\git.exe" add -A
"C:\EasyDiffusion\installer_files\env\Library\mingw64\bin\git.exe" commit -m "Complete website redesign with dark theme and navbar"
"C:\EasyDiffusion\installer_files\env\Library\mingw64\bin\git.exe" push origin main
pause
