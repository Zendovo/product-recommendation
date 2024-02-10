sed -i -e 's|REPLACE_BASE_URL|'"$BASE_URL"'|g' /usr/share/nginx/html/main.js
nginx -g "daemon off;"