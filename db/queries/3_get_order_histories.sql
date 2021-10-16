SELECT customers.id, customers.name AS customer_name,  SUM(menus.price) AS total_price
FROM order_details
JOIN menus ON menu_id = menus.id
JOIN orders ON order_id = orders.id
JOIN customers ON customer_id = customers.id
WHERE customer_id = 3
GROUP BY orders.id, customers.id;
