mkdir -p build
deno compile --output build/manage --allow-all manage.ts && build/manage ${@:1}