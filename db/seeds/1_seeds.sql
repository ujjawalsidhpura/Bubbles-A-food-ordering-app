INSERT INTO customers (name, phone, email, password, address)
VALUES ('zsh', 123, 'zsh@gmail.com','$2a$10$KMeI0FFi0yD8c0KjHDjfkumShBcPv2lhXuD8FxwYv8HYbvmfl23Gy','home'),
        ('ujay', 321, 'ujay@gmail.com','$2a$10$KMeI0FFi0yD8c0KjHDjfkuWHt44u9nwoR4RSGGpaBDGTaPO5rwtS6','home'),
        ('ebuka', 132, 'ebuka@gmail.com','$2a$10$KMeI0FFi0yD8c0KjHDjfkuqu.BFedjckbgn1V9PTVSMx6DETFs2nG','home');

INSERT INTO menus (name, description, price, image_url, ingredients, status)
VALUES ('Mango Bubble Tea', 'It’s just the right amount of creamy, with a fresh green tea base and bright, bold mango flavor. Served with ice for an extra chilled drink on a hot summer day.',
8.75, 'https://thelittlestcrumb.com/wp-content/uploads/mango-milk-tea-featured-image-1.jpg', 'mango juice, green tea, milk, simple syrup and boba', TRUE), --- menu id 1
        ('Brown Sugar Bubble Tea', 'The cup is usually rimmed with brown sugar syrup to make a pattern. This is why the drink is also known as tiger milk tea or dirty milk tea.',
        9.95, 'https://www.foxyfolksy.com/wp-content/uploads/2020/06/tiger-sugar-milk-drink.jpg', 'brown sugar, fresh milk, and tapioca balls', TRUE), --- menu id 2
        ('THAI Bubble Tea', 'Most local boba shop owners will add food coloring for intense brightness. This Thai boba tea is an iced drink that brings the streets of Thailand into your mouth. It is no wonder why it is one of the most popular bubble tea flavors.',
        10.25, 'https://www.rachelcooksthai.com/wp-content/uploads/2013/07/thai-tea-boba-0.jpg', 'a mix of Ceylon and sweetened condensed milk', TRUE); --- menu id 3

INSERT INTO orders (customer_id, order_time, status)
VALUES (3, '2021-10-16 10:39:50', FALSE), --- order_id 1
       (1, '2021-10-15 12:12:12', TRUE),  --- order_id 2
       (2, '2021-10-15 16:16:16', TRUE),  --- order_id 3
       (3, '2021-10-13 14:00:00', TRUE);  --- order_id 4

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
       (3, 3),
       (4, 3),
       (4, 2),
       (4, 3);

