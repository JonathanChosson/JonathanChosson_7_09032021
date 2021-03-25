# Create mysql server based on the official image from the dockerhub
FROM mysql:8.0.23
# Add a database & root password
ENV MYSQL_DATABASE database_development_test
ENV MYSQL_ROOT_PASSWORD=pkoipa
ENV MYSQL_USER: "root"
ENV MYSQL_PASSWORD: "pkoipa"
# Run initial scripts for creating tables 
COPY ./projet6.sql /docker-entrypoint-initdb.d/