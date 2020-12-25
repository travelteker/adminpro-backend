const { createLogger, transports, format } = require('winston');
require('winston-mongodb');


class CustomLogger {
    shell() {
        return new transports.Console({ level: 'info'});
    }

    mongo() {
        return new transports.MongoDB({
            level: 'error',
            db: process.env.DB_MONGO_LINK + '/' + process.env.DB_NAME,
            options: { useUnifiedTopology: true},
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        });
    }

    file() {
        return new transports.File({
            maxsize: 5120000,
            maxFiles: 3,
            filename: `${__dirname}/../../logs/api.log`,
            format: format.combine(
                format.label({ label: 'CUSTOM'}),
                format.simple(),
                format.timestamp(),
                format.printf( ({timestamp, level, message, ...metadata}) => {
                    let msg = `${timestamp}|${level}|`;
                    if (metadata) {
                        msg += `${JSON.stringify(metadata)}|`
                    }
                    msg += `${JSON.stringify(message)}`
                    return msg;
                })
            )
        })
    }

    logger(handler) {
        return createLogger({
            transports: [handler]
        });
    }
}


module.exports = new CustomLogger();

// const logger = createLogger({
//     transports: [
//         new transports.Console({
//             level: 'info'
//         }),
//         // new transports.MongoDB({
//         //     level: 'error',
//         //     db: process.env.DB_MONGO_LINK + '/' + process.env.DB_NAME,
//         //     options: { useUnifiedTopology: true},
//         //     collection: 'logs',
//         //     format: format.combine(format.timestamp(), format.json())
//         // }),
//         new transports.File({
//             maxsize: 5120000,
//             maxFiles: 3,
//             filename: `${__dirname}/../../logs/api.log`,
//             format: format.combine(
//                 format.label({ label: 'CUSTOM'}),
//                 format.simple(),
//                 format.timestamp(),
//                 format.printf( ({timestamp, level, message, ...metadata}) => {
//                     let msg = `${timestamp}|${level}|`;
//                     if (metadata) {
//                         msg += `${JSON.stringify(metadata)}|`
//                     }
//                     msg += `${JSON.stringify(message)}`
//                     return msg;
//                 })
//             )
//         })
//     ]
// });

// module.exports = logger;