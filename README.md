# docker-challenge

### HOW TO RUN WITH DOCKER-COMPOSE

```bash
docker-compose up
```

### HOW TO RUN WITHOUT DOCKER-COMPOSE

##### 1) NETWORK
```bash
docker network create fullcycle
```

##### 2) DATABASE
```bash
docker build -t thiagoalvesfoz/db ./db
docker run --rm -d --name=db --network=fullcycle -e MYSQL_ROOT_PASSWORD=root -v $(pwd)/mysql:/var/lib/mysql thiagoalvesfoz/db
```
`v` *volume is optional*  
`-e` *password is required*   


##### 3) FRONTEND
```bash
docker build -t thiagoalvesfoz/frontend ./frontend
docker run -d --name=frontend --network=fullcycle -v $(pwd)/frontend:/usr/src/app thiagoalvesfoz/frontend
```
`-v` *volume is optional*

##### 4) RUN NGINX
```bash
docker build -t thiagoalvesfoz/nginx ./nginx
docker run --rm --name=nginx --network=fullcycle -p 8080:80 thiagoalvesfoz/nginx
```

