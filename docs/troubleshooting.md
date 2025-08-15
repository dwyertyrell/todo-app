# Troubleshooting

## Running on local environment **without** Docker containers

## Starting localhost without the In-Memory Data on Node server  

If you are viewing this repository while the database is still stored on the node server, you must run the node server first before accessing the in-memory data via the localhost. 

Simply go to `backend` path in the terminal and run `npm start` before attempting to run the frontend on localhost.

## Docker Container Issues

### Starting containers
Always run `docker compose up` in the same directory as the `docker-compose.yml` file, to start containers

### Updating containers
If containers not updating after a change in code,
try and close the containers explicitly and then restarting them using the following command:

```
 docker compose down
 docker compose up --build
```


<!-- incorrect relative path for the accessing the swagger.yaml file in index.js. 
i went up 2 levels instead of 1. Not realising that Relative paths in Node.js are resolved from the current working directory, not the file’s location. -->

<!-- the 'todos' props had value of null in the  <TodoList/>. since i changed the structure of the resoonse object, accessing the payload required a different expression. before doing this, the application  crashed. -->

