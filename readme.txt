0 - npm init to create package.json
    add script section.
        start node .
        dev nodemon . //The . references index.js at root

1 - Install development dependenies
    npm install -D nodemon  -> Nodemon reiniciará el server cada vez que haya cambios.
    npm i express  ->Server
    npm i mongoose ->ORM de mongo para facilitar consultas
    npm i dotenv -> Crear archivo con variables de entorno.

2 - Create index.js /server.js
    import express by using require()

3 - Create variables.env - Environment variables

4 - Create config folder with DB info file.

5 - Create routes file
