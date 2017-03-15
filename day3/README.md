# Day 3: The Payoff

Finally, we can get your server running on your computer and hook your Node/Express application up to the server. And that connection will allow us to persist and retrieve data. 

To get your application hooked up, we will need a database server (we'll use Postgres) and a library that will connect our Node application to the database server (we'll use MassiveJS).

## Postgres
We have been using SQLite on the Chinook database, but now we'll switch dialects and begin using PostgreSQL. PostgreSQL is a robust and open-sourced SQL dialect, and for the most part, you won't need to know much about the differences. 

### Dialectical Differences
We won't cover all of the differences between PostgreSQL and the other dialects, but you should know that the id fields will work differently in your table creation statements. In SQLite, we created id fields with the following syntax: 

```
CREATE TABLE some_table(
    id integer primary key autoincrement
)
```

For PostgreSQL, we'll use the keyword `SERIAL`:
```
CREATE TABLE some_table(
    id integer serial primary key
)
```

### Installation
#### Macs
For the Mac installation, we'll use Homebrew. If you don't have homebrew, you can get it here: https://brew.sh/. 

From here, the steps are fairly simple. I'm taking these from <a href="http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/">Akbar S. Ahmed's blog</a>:

* Open your terminal.
* Install <a href="https://brew.sh/">Homebrew</a> if you don't have it: 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
* Update brew: `brew update`
* Find postgres: `brew search postgres`
* Install postgres: `brew install postgres`
* Start postgres: `brew services start postgres`
* Create a database with your user name: ``createdb `whoami` ``
Note: Use backticks rather than single quotes around whoami. This step is merely a shortcut to save time on the next step. 
* Login with the psql shell: `psql`

#### Windows
Use the installer on the EnterpriseDB installer for Postgres on the 

<a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows">EnterpriseDB Download PostgreSQL page</a>. 

Choose the standard installation configuration and options. Ask one of us for help if you get stuck.

Once the installation completes, search for psql in your program files. Open psql and connect to the default database. psql will prompt you for a server, host, username, and port, but you can leave the defaults for all of these. If you need to enter password, it should be the system password you use to log in to Windows. 

If you get tired of searching for psql in the program files, you can add the directory containing the executable file to your path. 

### PSQL - The Client Shell
We won't spend long in the shell, but you might need to use the shell every once in a while. If you haven't already opened the shell, see the instructions above for your operating system.

Once you are connected, you should see a prompt that begins with the database name. 

To create a database, type `create database database_name;`.
To connect to a different database, type `\c database_name`.

Once in the database, you can view all tables by typing `\dt`.

From there, you can type any SQL statement. Create tables, insert data, select rows, and delete rows or drop tables. 

If you do not type a semicolon, the shell will assume you have more to type before executing the statement. The prompt will change from `database=#` to `database-#`. Type a semicolon to execute the statement on the line above. 

To exit the shell, type `\q`. 

If you get stuck, just remember the main three commands:
* `\c` to connect
* `\dt` to describe/display tables
* `\q` to quit

### GUI Clients
Unless you really like shells (and I do for some odd reason), you'll probably want a graphic interface for your database. pgAdmin is the default PostgreSQL client, but if you have a Mac, you might try <a href="https://eggerapps.at/postico/">Postico</a>. It's very easy to use, and you can insert data as if you're typing in a spreadsheet. 

If you're on a PC or you don't like Postico, then you'll need to use pgAdmin (Note: the brew install above for Macs did not come with pgAdmin, so you'll need to download it from the <a href="https://www.pgadmin.org/download/macos4.php">PostgreSQL Mac download page.</a>) 

If you're using pgAdmin, you'll need to create a server and connect to it. Ask a mentor for help.  

## MassiveJS