INSERT INTO department(department_name)
VALUES 
("Marketing"),
("Information Technology"),
("Maintenance"),
("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Associate", 80000, 1),
("Web Developer", 90000, 2),
("HVAC Master", 950000, 3),
("People Professional", 80000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Jeffery", "Gibson", 1, 13),
("Jena", "Lupia", 4, 11),
("Michael", "Barton", 2, 12),
("Donald", "Gainey", 3, 11);