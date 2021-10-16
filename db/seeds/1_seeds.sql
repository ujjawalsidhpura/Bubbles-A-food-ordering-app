INSERT INTO customers (name, phone, email, password, address)
VALUES ('zsh', 123, 'zsh@gmail.com','zsh','home'),
        ('ujay', 321, 'ujay@gmail.com','ujay','home'),
        ('ebuka', 132, 'ebuka@gmail.com','ebuka','home');

INSERT INTO menus (name, description, price, image_url, ingredients, status)
VALUES ('burger', 'juicy burger', 10, 'www.burger.com', 'tomato, lettuce, bread, meat', TRUE), --- menu id 1
        ('fries', 'crispy fries', 5, 'www.fries.com', 'potato, oil', TRUE), --- menu id 2
        ('coke', 'coke cola', 5, 'www.coke.com', 'water, sugar', TRUE); --- menu id 3

INSERT INTO orders (customer_id, order_time, status)
VALUES (3, '2021-10-16 10:39:50', FALSE), --- order_id 1
       (1, '2021-10-15 12:12:12', TRUE),  --- order_id 2
       (2, '2021-10-15 16:16:16', TRUE);  --- order_id 3

INSERT INTO order_details (order_id, menu_id)
VALUES (1, 1),
       (1, 2),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 1),
       (2, 2),
       (2, 3),
       (3, 1),
       (3, 2),
       (3, 3);

