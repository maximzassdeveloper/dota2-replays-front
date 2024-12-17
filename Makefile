CONT_NAME ?= front
PORT ?= 3000

rebuild: build run

build-project:
	docker rmi $(CONT_NAME)
	docker build -t $(CONT_NAME) .

run:
	docker run --rm -d -p $(PORT)\:3000 --name $(CONT_NAME) -i $(CONT_NAME)

start:
	docker start $(CONT_NAME)

stop:
	docker stop $(CONT_NAME)

dev:
	pnpm run dev

clean:
	docker rm -f $(CONT_NAME)
	docker rmi $(CONT_NAME)