# build
build:
	pnpm exec tsc
build-docker:
	docker build -t passamon-guildfi/todo-backend:latest .

# dev command
run-dev: build
	node dist/server.js	
run-docker:
	docker run -p 8080:8080 passamon-guildfi/todo-backend:latest
