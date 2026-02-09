CREATE DATABASE organisation;
USE organisation;

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY, 
    ssid CHAR(5),
    `name` VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    phNum VARCHAR(20),
    `active` BOOLEAN,
    createdAt DATETIME DEFAULT (NOW()),
    updatedAt DATE DEFAULT NULL,
    createdBy CHAR(36),
    updatedBy CHAR(36)
);

CREATE TABLE secrets(
					id CHAR(36),
                    `password` VARCHAR(255),
                    CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES users(id) 
					ON DELETE CASCADE);
                    
CREATE TABLE roles(
					roleId VARCHAR(10) PRIMARY KEY,
                    roleName VARCHAR(50));
                    
CREATE TABLE `organization`(
							orgId VARCHAR(10) PRIMARY KEY,
                            orgName VARCHAR(50) UNIQUE,
                            ownerId CHAR(5),
                            `active` BOOL DEFAULT 1,
                            createdAt DATE );
                            

                            
CREATE TABLE employeeDetails(
							orgId VARCHAR(10),
                            ssid CHAR(5),
                            roleId VARCHAR(10),
                            invitedBy CHAR(5),
                            `status` BOOL DEFAULT 1,
                            dateOfJoin DATE,
                            dateOfResign DATE DEFAULT NULL,
                            updatedBy CHAR(5),
                            updatedAt DATETIME);
                    
CREATE TABLE tasks(
					taskId VARCHAR(10) PRIMARY KEY,
                    title VARCHAR(100),
                    `description` LONGTEXT,
                    orgId VARCHAR(10),
                    taskStatus VARCHAR(50),
                    isDeleted BOOL DEFAULT 0,
                    storyPoints CHAR(10),
                    assignee CHAR(5),
                    reporter CHAR(5),
                    createdAt DATETIME DEFAULT (NOW()),
                    updatedAt DATETIME,
                    CONSTRAINT fk_org_task FOREIGN KEY(orgId) REFERENCES `organization`(orgId) ON DELETE CASCADE);
				


INSERT INTO
			roles
VALUES ("RO01","Owner"),
	   ("RA01","Admin"),
       ("RU01","User");


SELECT * FROM users;
SELECT * FROM secrets;
SELECT * FROM `organization`;
SELECT * FROM roles;
SELECT * FROM employeeDetails;
SELECT * FROM tasks;






CREATE TABLE taskLogs (logId INT AUTO_INCREMENT PRIMARY KEY,
						taskId VARCHAR(10),
                        title VARCHAR(100),
                        orgId VARCHAR(10),
                        old_taskStatus VARCHAR(50),
                        new_taskStatus VARCHAR(50),
                        old_assignee CHAR(5),
                        new_assignee CHAR(5),
                        updatedAt DATETIME DEFAULT (NOW()),
                        updatedBy CHAR(5));

select * from taskLogs;


delimiter //

CREATE TRIGGER logger
BEFORE UPDATE ON tasks
FOR EACH ROW
BEGIN
		INSERT INTO taskLogs
			(taskId,
            title,
			orgId,
			old_taskStatus,
			new_taskStatus,
			old_assignee,
			new_assignee,
			updatedBy)
		VALUES(
			NEW.taskId,
            NEW.title,
			NEW.orgId,
			OLD.taskStatus,
			NEW.taskStatus,
			OLD.assignee,
			NEW.assignee,
			NEW.repoRter);
END //

delimiter ;


                    
                    