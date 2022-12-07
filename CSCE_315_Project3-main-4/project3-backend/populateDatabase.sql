-- Truncate tables
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE items CASCADE;
TRUNCATE TABLE bases CASCADE;
TRUNCATE TABLE proteins CASCADE;
TRUNCATE TABLE starters CASCADE;
TRUNCATE TABLE inventory CASCADE;
TRUNCATE TABLE menu_inventory_bridge CASCADE;
TRUNCATE TABLE employees CASCADE;

-- Alter id sequence
ALTER SEQUENCE bases_id_seq RESTART WITH 1;
ALTER SEQUENCE starters_id_seq RESTART WITH 1;
ALTER SEQUENCE proteins_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE items_id_seq RESTART WITH 1;
ALTER SEQUENCE employees_id_seq RESTART WITH 1;
ALTER SEQUENCE inventory_id_seq RESTART WITH 1;
ALTER SEQUENCE menu_inventory_bridge_id_seq RESTART WITH 1;

-- Copy data
\COPY bases(name, quantity, price) FROM './CSCE 315/bases.csv' DELIMITER ',';
\COPY proteins(name, quantity) FROM './CSCE 315/proteins.csv' DELIMITER ',';
\COPY starters(name, quantity, price) FROM './CSCE 315/starters.csv' DELIMITER ',';
\COPY employees(first_name, last_name, date_of_birth) FROM './CSCE 315/employees.csv' DELIMITER ',';
\COPY orders(order_date, order_time, order_total, employee_id) FROM './CSCE 315/orders.csv' DELIMITER ',';
\COPY items(is_combo, order_id, starter_id, base_id, protein_id, cost) FROM './CSCE 315/items.csv' (format csv, null "NULL", DELIMITER ',');
\COPY inventory(ingredient_name, quantity) FROM './CSCE 315/inventory.csv' DELIMITER ',';
\COPY menu_inventory_bridge(starter_id, base_id, protein_id, inventory_id) FROM './CSCE 315/menu_inventory.csv' (format csv, null "NULL", DELIMITER ',');
