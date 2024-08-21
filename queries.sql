-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT 
    p.ProductName, 
    c.CategoryName
FROM 
    Products p
JOIN 
    Categories c ON p.CategoryID = c.CategoryID;
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT 
    o.OrderID, 
    s.CompanyName
FROM 
    Orders o
JOIN 
    Shippers s ON o.ShipVia = s.ShipperID
WHERE 
    o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT 
    p.ProductName, 
    od.Quantity
FROM 
    OrderDetails od
JOIN 
    Products p ON od.ProductID = p.ProductID
WHERE 
    od.OrderID = 10251
ORDER BY 
    p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT 
    o.OrderID, 
    c.CompanyName AS CustomerCompanyName, 
    e.LastName AS EmployeeLastName
FROM 
    Orders o
JOIN 
    Customers c ON o.CustomerID = c.CustomerID
JOIN 
    Employees e ON o.EmployeeID = e.EmployeeID;