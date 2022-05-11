DROP DATABASE IF EXISTS employeetrackerDB;
CREATE DATABASE employeetrackerDB;
USE employeetrackerDB;



CREATE TABLE department ( 
    
    department_id INT AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(30)
    
);

CREATE TABLE role (
    
    role_id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(50),
    salary DECIMAL(10,2),
    department_id INTEGER,
    CONSTRAINT department_fk FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
    
    employee_id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
    CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL

);