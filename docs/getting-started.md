
## Setting up Local __without__ Docker Containers

1. In termial run cmd in `/backend` path  `npm start`. 

_Running the node server before hosting the client side on a localhost, ensures the frontend has access to the API the moment the developer views the project_

2. open a new terminal and go to path `frontend` and run `npm run dev`. 

3. Ctrl + right click the link to localhost and you will be redirected to the browser. 


## Setting up Local Using Docker Container Service  

1. Ensure Docker is installed on your machine.
test installation by running `docker --version` and afterwards, `docker compose version`, in your terminal.
if you get a version number, then docker is already installed.

2. Ensure you have the `docker-compose.yml` file in the root directory of your project.

3. Run the command `docker compose up --build` in the root directory to run the containers.

4. The frontend service should now be running and accessible at `http://localhost:3000`and the backend service should now be running and accessible at `http://localhost:8000`.
to bring the frontend service down,  press ctrl +c to stop the containers, and 
run `docker-compose down` to completely clean up the containers

 The environment variables in the `docker-compose.yml` file, connects the frontend and backend services, allowing them to communicate with each other. This is a monorepo, therefore the docker-compose.yml file is located in the root, orchestrating the services, and is fairly simple


**DO NOT** run `docker-compose up` separately in each frontend/backend directory.
You only need to run docker-compose up once, from the directory where your main 
docker-compose.yml file is located (typically the root of your monorepo)