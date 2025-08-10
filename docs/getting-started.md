



## Setting up Docker Container service  

### Frontend service:
1. Ensure Docker is installed on your machine.
test installation by running `docker --version` and afterwards, `docker compose version`, in your terminal.
additional RUN commands were required in the dockerfile to ensure frontend service was running correctly. these can be removed if not needed.
the dockerfile, for the frontend service is located in the `frontend` directory.
this file is used to build the docker image for the frontend service
2. Navigate to the frontend directory in your terminal.
3. Run the command `docker-compose up --build` to start the frontend service.
4. The frontend service should now be running and accessible at `http://localhost:3000`.
to bring the frontend service down,  press ctrl +c to stop the containers, and 
run `docker-compose down` in the terminal while in the frontend directory. 
this cmd completely clean up the containers

go to the root directory to set up the docker-compose.yml file, which orchestrates the services.
using the environment variables, this file connects the frontend and backend services, allowing them to communicate with each other .
because this is a monorepo, the docker-compose.yml file is located in the root, and is fairly simple 


### Backend service: 
1. Ensure Docker is installed on your machine.
2. the frontend was set up first, so the backend service can be started. only after a few commands
3. Navigate to the backend directory in your terminal.
4. Run the command `docker-compose up --build` to start the backend service.
5. The backend service should now be running and accessible at `http://localhost:8000`.

### environment variables
the environment section in the `docker-compose.yml` file is used to set environment variables
for when the build is running on the docker container, and not local host, these variables will be 
used to run the application using containers; and not the variables from local environment .

**DO NOT** run `docker-compose up` separately in each frontend/backend directory.
You only need to run docker-compose up once, from the directory where your main 
docker-compose.yml file is located (typically the root of your monorepo)