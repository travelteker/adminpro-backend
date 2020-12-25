const mongoose = require('mongoose');


class LinkMongo {

    async dbConnection(linkMongo) {
        try {
            await mongoose.connect(linkMongo, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        } catch (error) {
            throw new Error('No fue posible conentar a la BD');
        }
    }
}

module.exports = new LinkMongo();
