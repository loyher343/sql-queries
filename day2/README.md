#SQL Day 2: The Pain Begins to Set In

Just kidding. I hope you're enjoying your new programming language. Let's finish up our CRUD operations today by learning Update and Delete, and then we'll talk a little more about creating tables and relationships between them. 

We'll keep using Microsoft's Chinook database, https://chinook.ml, for the beginning of this lesson, just so we can learn all of the operations in one place. Then, if we have time, we'll learn how to set up databases either online or on your local machine. 

## Update
To update a value in a table, we need to specify the table name, the update to perform, and the condition under which we'll update the value. Here's the basic form: 

```
UPDATE table_name
SET column_name = value
WHERE condition;
```

If you don't specify a condition, all rows in the table will be updated, so be careful!

You can also update multiple values at once by separating the updates with commas:

```
UPDATE table_name
SET column_1 = value1, column2 = value2
WHERE condition;
```

## Delete
The DELETE statement deletes one or more rows based upon a condition. If you don't specify a condition, you will delete all rows in the table. Here's the syntax: 

```
DELETE FROM table_name
WHERE condition;
```

As with SELECT statements, you can include subqueries in the where clauses of the UPDATE and DELETE statements. Usually, however, it's best to test these subqueries to avoid unintended updates or deletions. 

## Joins
Let's return to SELECT statements now and practice joins. We join tables when we have related data in two or more tables. For example, in the world schema (country, city, and countrylangugae tables), the countrycode in both the city and countrylanguage tables refers to a country in the country table. We could find the name of the city in one select statement and the name of the country in another select statement: 

```
SELECT name, 