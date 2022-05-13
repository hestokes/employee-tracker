INSERT INTO department (department_name)
VALUES ('Sales'),
('Human Resources'),
('Project Management'),
('Information Technology'),
('Executive');

INSERT INTO role (title, salary, department_id)
VALUES('Account Executive', 110000, 1),
('Sr. Executive', 150000, 1),
('Sales Director', 200000, 1),
('Human Resources Coordinator', 75000, 2),
('People Coordinator', 85000, 2),
('Educator', 100000, 2),
('Jr. Developer', 90000, 3),
('Sr. Developer', 130000, 3),
('Project Management Director', 225000, 3),
('Information Technology Project Manager', 850000, 4),
('Information Technology Project Director', 125000, 4),
('Chief Executive Officer', 315000, 5),
('Chief Operating Officer', 280000, 5),
('Chief Financial Officer', 285000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Benjamin', 'Lewis', 12, NULL),
('Jessica', 'Cobb', 13, 1),
('Wendy', 'Martin', 14, 1),
('Biggie', 'Smallson', 3, 2),
('Johnny', 'Copp', 9, 2),
('Royal', 'Robbins', 11, 2),
('Anna', 'Robins', 6, 2),
('Lefty', 'Kreh', 1, 4),
('Flipp', 'Pallot', 1, 4),
('Jumanji', 'Jones', 2, 4),
('Andy', 'Hughes', 4, 7),
('Lindsay', 'Hagwood', 5, 7)