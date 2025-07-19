@echo off
echo =================================
echo BiGMaN Website Setup for Windows
echo =================================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Git is installed!
echo.

echo Setting up your BiGMaN affiliate website...
echo.

echo 1. First, create a new repository on GitHub
echo 2. Name it something like "my-affiliate-site"
echo 3. Make it public (required for GitHub Pages)
echo 4. Don't initialize with README (we already have files)
echo.

set /p github_url="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

if "%github_url%"=="" (
    echo No URL provided. Exiting...
    pause
    exit /b 1
)

echo.
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Making initial commit...
git commit -m "Initial commit: BiGMaN affiliate website"

echo Adding remote repository...
git remote add origin %github_url%

echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo Push failed! Make sure:
    echo 1. Your GitHub repository URL is correct
    echo 2. You have Git configured with your GitHub credentials
    echo 3. The repository exists and is empty
    echo.
    echo You can run these commands manually:
    echo git remote add origin %github_url%
    echo git branch -M main
    echo git push -u origin main
    pause
    exit /b 1
)

echo.
echo =================================
echo SUCCESS! Your website is uploaded
echo =================================
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Click Settings ^> Pages
echo 3. Under "Source", select "Deploy from a branch"
echo 4. Select "main" branch and "/ (root)" folder
echo 5. Click Save
echo.
echo Your website will be available at:
echo https://yourusername.github.io/repository-name
echo.
echo Don't forget to:
echo 1. Edit products.json to add your affiliate products
echo 2. Replace "your-associate-id-20" in script.js with your Amazon Associate ID
echo 3. Update contact information in index.html
echo.
echo See README.md for detailed instructions!
echo.
pause
