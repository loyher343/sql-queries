#SQL Queries

## Overview
Today we are going to explore the language with which we will persist the data for our applications, SQL, or Structured Query Language.

I'll talk a bit about the concept behind SQL, the relational database, but we will also be playing around with the database as we go over these major concepts. 

To do that, we'll begin with the <a href="https://chinook.ml" target="_blank">Microsoft Chinook database</a>. This database comes loaded with data, but we'll delete all of that data for our purposes this morning. This afternoon you'll be using the built-in data to practice queries. 

## Getting Started
If you haven't already done so, open the <a href="https://chinook.ml" target="_blank">Microsoft Chinook database</a> in another tab. You can look at the schema on the left side of the site to see the data that comes with chinook, but when you are ready, us the scripts in the drop_table.sql script to remove the standard data. Then we can start fresh. 

We will be building a few tables together to cover queries, but we can also use the world data, originally provided by the MySQL foundation, for more complex data. I have modified the data to work with the dialect used by Chinook, and I have removed a few data points from the records. I believe the statistics are a few years out of date, but they are still interesting.  

## Create
We'll cover database and table creation in more depth tomorrow, but we need to do a few basic create statements to get things running. 

### Table Creation
Chinook creates the database schema for us, but we still need to create a table. The basic format is as follows: 

```
CREATE TABLE table_name (
    col_name data_type options/constraints,
    col_name data_type options/constraints
)
```

Don't worry too much about the data types or options yet. We'll mostly be using some form of text and some numeric type for most of our data and we'll add options tomorrow. 

Create a table of your own. Feel free to use this as a model: 
```
CREATE TABLE expenses (
    id integer primary key autoincrement,
    name text,
    amount real
)
```
The options following the id column tell the database to generate and increment this value automatically. We don't need them if we are willing to supply the id ourselves. 

### Record/Row Creation
Now that we have a table, we need to insert some records. These become rows in the tables. Here's the basic format: 

```
INSERT INTO table_name (col_name, col_name) VALUES (value1, value2);
```

For the expense table above, we'd need to insert the data as follows. Notice that we don't have to insert the id because we told the database to autoincrement the id for each new record. 

``` 
INSERT INTO expenses (name, amount) VALUES ('Coffee', 3.78)
```

Okay, that's enough for creation right now. Let's spend some time querying existing data. I have provided some sample data from the MySQL/PostgreSQL world database. 

## Read
To retrieve data from our database, we use the `SELECT` statement. 

### The Basics
#### SELECT statements
The SELECT statement queries the database for information from a table. To retrieve all rows and all columns for a table, you write: 

```
SELECT * FROM table_name;
```

Now let's limit the columns we get back by providing column names.

```
SELECT column_name, column_name from table_name;
```

Now try loading some of the world data into <a href="https://chinook.ml">Chinook</a>. If you want to drop Chinook's data first to clean up the view, then copy and run the statements in drop_tables.sql;

Once you have the data, try selecting certain columns from the table. For each of the sections below, create queries for your data based on the provided syntax. 

#### A Note on Aliases
Occasionally, you want to provide aliases for the original column names. You do so by providing an 'AS' clause:

```
SELECT column_name AS new_name from table_name;
```

#### WHERE clauses
Great--we can limit the columns, but now we want to limit the rows. Let's refine our searches by providing conditions in the WHERE clause.

``` 
SELECT *
FROM table_name
WHERE condition;
```

You can use =, !=, >, <, IN, and NOT IN to create your conditions.

```
SELECT * 
FROM city
WHERE population >= 1000000;
```

#### ORDER BY clauses
To organize our results, we can specify an order in an ORDER BY clause.

```
SELECT col_name_1, col_name_2
FROM table_name
WHERE condition
ORDER BY col_name_2 DESC;
```

#### LIMIT clauses
Now we want to limit our results with the LIMIT clause. 

```
SELECT *
FROM table_name
WHERE condition
ORDER BY col_name ASC
LIMIT 5;
```

You can add an offset after the number in the limit clause to start after a certain number of results:

```
SELECT *
FROM table_name
WHERE condition
ORDER BY col_name DESC
LIMIT 5 OFFSET 1;
```

The results above will skip the first row returned by the rest of the query. 

### Beyond the Basics
#### Calculated Values
If a value can be calculated from existing data, we usually do not store it in the database. So if have a quantity for a certain product purchased and a price per product, we don't usually include the total in the database. Instead we SELECT an expression which, when evaluated/calculated, provides the correct value. Here is a template, followed by an example: 

``` 
SELECT expression AS label 
FROM table_name;
```
```
SELECT *, quantity * price_per_product AS total
FROM orders;
``` 

We can perform most of the mathematical operations we perform in any programming language. In addition, we have a few built-in helper functions. However, there are some differences between SQL dialects in the implementations of operations and built-in functions. Nonetheless, here is a basic example: 

```
SELECT name, ROUND(population / 1000000) as population_in_millions
FROM city;
```

#### Aggregate Functions
The functions above prove really useful for calculating values for individual rows, but at times we want to perform calculations on all of the rows or groups of rows. For those occasions, we need aggregate functions.

The most common aggregate functions are the following: 

* COUNT()
* SUM()
* MAX()
* MIN()
* AVG()

The following query will return one result, the maximum value for a partiular column in a table: 
```
SELECT MAX(col_name) AS max_value
FROM table_name
```
We can do the same for the average, sum, min, and count functions. 

However, we often want to group the results by some column, rather than calculating the value for the entire table. 

```
SELECT col_1, AVG(col_2) AS average_value
FROM table_name
GROUP BY col_1;
```

If we want to filter these results, we can further refine with a HAVING clause:

```
SELECT col_1, MIN(col_2) AS minimum_value
FROM table_name
GROUP BY col_1
HAVING minimum_value > 100;
```

### More Practice
Okay, you should have a full toolbox for querying data. Find a data set or use one of mine and see how much you can learn from querying the data.

## Additional Material
### Subqueries
Sometimes it's useful to embed one query within another. For example, if you need to find all of the cities whose population is greater than another city's, you could perform two queries: 

```
-- Step 1: Find the population of first city:
SELECT population FROM city WHERE name = 'London';

-- Step 2: Copy the value from the result of this query
-- Step 3: Use that value to find cities with a greater population. 
SELECT name, population FROM city WHERE population > 7285000;
```

But that's a lot of steps, and you can imagine how cumbersome the process would become if you wanted to use multiple comparisons involving different cities. 

Instead, we can make sequel perform both queries in one statement: 

```
SELECT name, population 
FROM city
WHERE population > 
    (SELECT population 
    FROM city 
    WHERE name = 'London');
```

Now SQL will find the population of London and insert it in the outer query to find cities with a population greater than that value. 

### Joining Data Across Tables
We'll save this for tomorrow unless we really blaze ahead today. 

## Update
Same as above.

## Delete
Same as above.