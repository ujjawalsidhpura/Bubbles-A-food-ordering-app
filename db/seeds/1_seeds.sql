INSERT INTO customers (name, phone, email, password, address)
VALUES ('zsh', '+14389210007', 'zsh@gmail.com','$2a$10$KMeI0FFi0yD8c0KjHDjfkumShBcPv2lhXuD8FxwYv8HYbvmfl23Gy','home'),
        ('ujay', '+18735090139', 'ujay@gmail.com','$2a$10$KMeI0FFi0yD8c0KjHDjfkuWHt44u9nwoR4RSGGpaBDGTaPO5rwtS6','home'),
        ('ebuka', '+15197817563', 'ebuka@gmail.com','$2a$10$KMeI0FFi0yD8c0KjHDjfkuqu.BFedjckbgn1V9PTVSMx6DETFs2nG','home');

INSERT INTO menus (name, description, price, image_url, ingredients, status)
VALUES ('Classic Milk Bubble Tea', 'This is where the legacy of bubble tea begins.The creamy and rich flavor of this combination makes this drink the most popular flavor among fans.',
10.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSCOlniJMr4V7dNRTupyATwGeWoL5H5bSUA&usqp=CAU', 'powder, syrup, fruit juice, or puree', TRUE), --- menu id 1
('Mango Bubble Tea', 'It’s just the right amount of creamy, with a fresh green tea base and bright, bold mango flavor. Served with ice for an extra chilled drink on a hot summer day.',
8.75, 'https://thelittlestcrumb.com/wp-content/uploads/mango-milk-tea-featured-image-1.jpg', 'mango juice, green tea, milk, simple syrup and boba', TRUE), --- menu id 2
        ('Brown Sugar Bubble Tea', 'The cup is usually rimmed with brown sugar syrup to make a pattern. This is why the drink is also known as tiger milk tea or dirty milk tea.',
        9.95, 'https://www.foxyfolksy.com/wp-content/uploads/2020/06/tiger-sugar-milk-drink.jpg', 'brown sugar, fresh milk, and tapioca pearls', TRUE), --- menu id 3
        ('Thai Bubble Tea', 'Most local boba shop owners will add food coloring for intense brightness. This Thai boba tea is an iced drink that brings the streets of Thailand into your mouth. It is no wonder why it is one of the most popular bubble tea flavors.',
        10.25, 'https://www.rachelcooksthai.com/wp-content/uploads/2013/07/thai-tea-boba-0.jpg', 'a mix of Ceylon and sweetened condensed milk', TRUE), --- menu id 4
        ('Chocolate Bubble Tea', 'If you are a fan of liquid brownies, you must give this chocolate beverage snack a try. It gives a creamy, silky feel that makes it perfect as an after-dinner dessert.',
        9.25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD9ihMIQRu6t_xmlG3B97V78jsYxcoQxi9GQ&usqp=CAU', 'chocolate powder, sugar, creamer, chocolate chips, and tapioca pearls', TRUE), --- menu id 5
        ('Strawberry Bubble Tea', 'Fresh strawberries are boiled into a sweet simple syrup that is then mixed with milk and tea to create a delicious strawberry boba tea.',
        9.25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyb30VR8Goso1kqF78MwsYclNd3VbUUxQHrQ&usqp=CAU', 'strawberries, sugar, green or black tea, milk, and tapioca pearls', TRUE), --- menu id 6
        ('Taro Bubble Tea', 'The purple color of the taro boba tea is what makes it more popular and a favorite among fans. Made from the Asian sweet root called Taro, this purple drink offers an earthy, nutty, and vanilla boba flavor.',
        10.25, 'https://www.siftandsimmer.com/wp-content/uploads/2020/12/real-taro-milk-bubble-tea1.jpg', 'Taro, pearls, fresh milk, sugar', TRUE), --- menu id 7
        ('Matcha Bubble Tea', 'Matcha has a bright, vegetal, and slightly bitter taste, with notes of sweetness and umami. ... Matcha is full of concentrated amounts of all of the many health benefits of green tea. It is also high in caffeine, making it a healthy and energizing tea to start the day with!',
        10.00, 'https://www.vitamix.com/media/other/images/Iced-Matcha-Bubble-Tea-470-449.jpg', 'Mathca, pearls, fresh milk, sugar', TRUE); --- menu id 8
INSERT INTO orders (customer_id, order_time, status)
VALUES (3, '2021-10-16 10:39:50', FALSE), --- order_id 1
       (1, '2021-10-15 12:12:12', TRUE),  --- order_id 2
       (2, '2021-10-15 16:16:16', TRUE),  --- order_id 3
       (3, '2021-10-13 14:00:00', TRUE);  --- order_id 4
          --- order_id 5
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
      --(5, 1);
      --(5, 2);

