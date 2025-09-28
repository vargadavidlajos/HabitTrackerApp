# Instructions to run the docker compose file for the database
1. Install docker and docker compose based on your operating system
Example: sudo pacman -S docker docker-compose (for arch users)

2. To run the compose file:
Open a terminal in the same directory as the file and type:
sudo docker compose up -d
This will dowload the containers and start them and then put them in the background as a process.

3. To stop the container
In the same directory as the compose.yml file type in the terminal
sudo docker compose down

4. save the structure
mysqldump -u root -p mydb > backup.sql

5. reload the structure
mysql -u root -p mydb < backup.sql

sudo docker exec -i db2 mysql -u root -ppmamysql HabitTracker < backup.sql
