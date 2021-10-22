SELECT customers.id, customers.name AS customer_name,  SUM(menus.price) AS total_price
FROM order_details
JOIN menus ON menu_id = menus.id
JOIN orders ON order_id = orders.id
JOIN customers ON customer_id = customers.id
WHERE customer_id = 3
GROUP BY orders.id, customers.id;


SELECT id, customer_name, item, COUNT(*) AS quantity, Sum(price) AS price
FROM (
SELECT customers.id, customers.name AS customer_name, menus.name AS item, menus.price AS price
FROM order_details
JOIN menus ON menu_id = menus.id
JOIN orders ON order_id = orders.id
JOIN customers ON customer_id = customers.id
WHERE orders.id = $1
) AS orders
GROUP BY id,customer_name, item;
