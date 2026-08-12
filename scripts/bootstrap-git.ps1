param(
  [Parameter(Mandatory=$true)]
  [string]$Remote
)

git init
git branch -M main
git add .
git commit -m "chore: bootstrap LEAD UNMSM web"
git remote add origin $Remote
git push -u origin main
