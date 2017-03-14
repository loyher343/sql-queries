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
SELECT table_1.col1, table_2.col1, table_1.col3 
FROM table_1
JOIN table_2
on table_1.col1 = table_2.col2;
```

You can list any of the columns from either table in the select statement. However, if the columns from different tables have the same name, you will have to preface the column name with the table name. This becomes a little easier if you alias the table name by following the table name with an abbreviation. Then you can use the abbreviation in front of the column name. 

``` 
SELECT o.id, c.id, c.name, o.total 
FROM orders o
JOIN customers c
ON o.customer_id = c.id;
```

You can also join multiple tables as long as they have relationships to each other. We'll practice that with the world database. 

## Table Relationships
Let's take some time to clarify our table relationships so that we can make joins more efficient and protect our tables from accidental corruption. You've already been using joins, so this will be a review, but let's make sure we're clear. 

### The Problem: Repeating Information
Let's say you're building a game and you want to keep track of users. So you build a user table: 
```
CREATE TABLE users (
    first_name text,
    last_name text,
    email text    
)
```

Great, but now you want to add a scores table. That way you can store scores and display high scores. So you build that table: 
```
CREATE TABLE scores (
    first_name text,
    last_name text,
    score integer,  
)
```

Well, now we have a problem. You don't really want to repeat the names, but you can't just have a first name or a last name, and you need to attach the user to the score. If you do it with both, though, you'll have to update these columns if a user ever changes his or her name. I realize this is a simplistic, easily avoidable problem in this setup, but go with me. 

So the solution is to create an id field on the user table and use it on the scores table. For that we need primary and foreign keys.

### Primary Keys
Primary keys are columns (or, if you want to get complicated, combinations of columns) that uniquely identify each row of data in a table. These keys are often the basis for relationships with other tables. They also get indexed automatically in the database, so they provide faster results when you base your condition on the primary key. 

We declare a primary key in our users table: 

```
CREATE TABLE users (
    id integer primary key autoincrement,
    name text,
    email text
)
```

Now that we have an identifying column/key, we can have other tables link to that key. When another table contains a reference to that primary key, it will become a foreign key in that table. 

```
CREATE TABLE scores (
    id integer primary key autoincrement,
    user_id integer,
    score integer,
    foreign key (user_id) references users (id)
)
```

Now you can separate out the scores from the user information, but still leave a reference to each user on the scores table. 

If you want to join the information, you just use a join:

```
SELECT score, users.name
FROM scores
JOIN users
ON scores.user_id = users.id;
```
### Different Kinds of Relationships
I'm going to see how it goes in class before I begin explaining the different kinds of relationships.

## Outer Joins
Same as above.
## Unions
Same as above. 

## Starting a Server
