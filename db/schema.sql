DROP DATABASE IF EXISTS employeetrackerDB;
CREATE DATABASE employeetrackerDB;
USE employeetrackerDB;



CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(30)
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER,
    CONSTRAINT 
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);