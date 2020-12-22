const mongoose = require('mongoose');


// Devuelve una promesa
const dbConnection = async() => {
    try {
        const linkDb = process.env.DB_MONGO_LINK + '/' + process.env.DB_NAME
        await mongoose.connect(linkDb, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
        throw new Error('No fue posible conentar a la BD');
    }
};

module.exports = {
    dbConnection
}