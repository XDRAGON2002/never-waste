# GDSC Solution Challenge 2022 - NeverWaste

## Instructions to run the project in your local environment -

1. Add a .env file in the frontend folder with your firebase API keys, the format for the file is given in frontend/.env.sample for convenience.
2. Download the h5 model file from [here](https://drive.google.com/file/d/1eIIigKzQ3K7Ox9o3y5l91KiQWuMGMAQQ/view?usp=sharing) and place it inside the backend/api directory next to app.py.
3. Have docker setup and running on your system.
4. In the root directory of the project, where the docker-compose.yml file is present run the command `docker-compose up`. This will start the frontend on port 3000 and the backend on port 5000 after the docker containers are built.
5. Access the application on `localhost:3000`.
