npx webpack --mode production
sed -i -e 's|REPLACE_BASE_URL|'"$BASE_URL"'|g' dist/main.js