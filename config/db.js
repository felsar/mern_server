const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' })

const DBConnection = async () => {
    try {
        //connect receive two parameters: 1)Connection (In this case from variables.env) 2- A Configurariton object.
        await mongoose.connect(
            process.env.MONGO_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify:false
            }
        )
        console.log('DB connection successful'); 
    } catch (error) {
        console.log(error);
        process.exit(1); //Stop application
    }
}

module.exports = DBConnection;