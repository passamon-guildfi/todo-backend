# for CI/CD
build:
	pnpm exec tsc
build-docker:
	docker build -t passamonguildfi/todo-backend:latest .
push-docker:
	docker push passamonguildfi/todo-backend:latest

# for Dev
run-dev: build
	node dist/endpoints.js	
run-docker:
	docker run -p 8080:8080 passamon-guildfi/todo-backend:latest
