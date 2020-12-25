const { config } = require('dotenv');

const NODE_ENV = process.env.NODE_ENV || 'dev'

class LoadConfig {

    load_file(path_dir_env) {
        const path = path_dir_env + '/' + `.env.${NODE_ENV}`;
        config({ path });
    }
}

module.exports = new LoadConfig();

