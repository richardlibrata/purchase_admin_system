# Getting started

For this project uses node.js, express.js and MySQL database to purchase an item listed in the stock.

## Installation

Clone the repository

```bash
git clone https://github.com/richardlibrata/purchase_admin_system.git
```

You need a Xampp server that you can install here:

    https://www.apachefriends.org/download.html

Activate the Apache and MySQL server, then go to this link

    http://localhost

Make sure to import your SQL file through

    http://localhost/phpmyadmin/index.php

Switch to the repo folder, I strongly recommend to xampp/htdocs in order for database to work.

```bash
cd [your target folder]
```

Install all the dependencies that you need

    npm init -y
    npm install express ejs body-parser method-override
    npm install dotenv mysql2
    npm install express-ejs-layouts

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Run your local node.js

```bash
node app.js
```

Open in your browser url localhost webserve
    http://localhost:3000

## Learn More

To learn more about node.js and other related stuff, take a look at the following resources:

- [XAMPP](https://www.apachefriends.org/) - XAMPP Apache + MariaDB + PHP + Perl
- [Node.js Menu](https://nodejs.org/en) - run JavaScript Everywhere.
- [Express.js](https://expressjs.com/) - fast, unopinionated, minimalist web framework for Node.js.
- [NPM](https://docs.npmjs.com/) - documentation for the npm registry, website, and command-line interface.
