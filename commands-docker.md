# HOW TO RUN APP

### CREATE NETWORK
```bash
docker network create fullcycle
```

### DATABASE
```bash
docker build -t thiagoalvesfoz/db ./db
docker run --rm -d --name=db --network=fullcycle -e MYSQL_ROOT_PASSWORD=root -v $(pwd)/mysql:/var/lib/mysql thiagoalvesfoz/db
```
`v` *volume is optional*  
`-e` *password is required*   


### FRONTEND
```bash
docker build -t thiagoalvesfoz/frontend ./frontend
docker run -d --name=frontend --network=fullcycle -v $(pwd)/frontend:/usr/src/app thiagoalvesfoz/frontend
```
`-v` *volume is optional*

### RUN NGINX
```bash
docker build -t thiagoalvesfoz/nginx ./nginx
docker run --rm --name=nginx --network=fullcycle -p 8080:80 thiagoalvesfoz/nginx
```

