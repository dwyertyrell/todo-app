# Troubleshooting

## docker container issues

### Starting containers
Always run `docker compose up` in the same directory as the `docker-compose.yml` file, to start containers

### Updating containers
If containers not updating after a change in code,
try and close the containers explicitly and then restarting them using the following command:

```
 docker compose down
 docker compose up --build
```

