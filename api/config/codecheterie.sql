CREATE DATABASE `codecheterie`;

USE codecheterie;

CREATE TABLE `building`
(
`id` INT NOT NULL AUTO_INCREMENT,
`adress` VARCHAR
(200) NOT NULL UNIQUE,
`zip_code` INT(5) NOT NULL,
`city` VARCHAR
(30) NOT NULL,
PRIMARY KEY
(`id`)
);


CREATE TABLE `user`
(
`id` INT NOT NULL AUTO_INCREMENT,
`username` VARCHAR
(80) NOT NULL UNIQUE,
`email` VARCHAR
(150) NOT NULL UNIQUE,
`firstname` VARCHAR
(40) NOT NULL,
`lastname` VARCHAR
(40) NOT NULL,
`password` VARCHAR
(80) NOT NULL,
`building_id` INT, 
PRIMARY KEY
(`id`),
FOREIGN KEY(`building_id`) REFERENCES building(id)
);

CREATE TABLE `events`
(
    `id` BIGINT NOT NULL AUTO_INCREMENT UNIQUE,
    `admin_id` INT NOT NULL,
    `datetime` TIMESTAMP NOT NULL,
    `building_id` INT NOT NULL,
    `nb_places` INT NOT NULL,
    `recycling_center_id` INT NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY(`admin_id`) REFERENCES user (id),
    FOREIGN KEY(`building_id`) REFERENCES building (id)
);


CREATE TABLE `participant`
(
    `event_id` BIGINT NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES user (id),
    FOREIGN KEY(`event_id`) REFERENCES events (id)
);

