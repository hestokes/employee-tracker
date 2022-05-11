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
    CONSTRAINT department_fk FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee(manager_id) ON DELETE SET NULL

);