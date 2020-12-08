const express = require('express');
const DBConnection = require('./config/db');

//Create server
const app = express();

//conect DB
DBConnection();

//Enable express,json to read info
app.use(express.json({ extended : true }))

//App port
const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))

//Start app
app.listen(
    PORT,
    () => {
        console.log(`Server runnig in port: ${PORT}`);
    }
)