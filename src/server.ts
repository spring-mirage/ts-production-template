
import app from './app';
import config from './config/config';

const server = app.listen(config.PORT)
;(() => {
    try {
        console.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL 
            }
        })
    } catch (error) {
        console.error(`APPLICATION ERROR`, { meta: error });

        server.close(() => {
            if (error) {
                console.error(`APPLICATION CLOSED`, { 
                    meta: error,
                });
            }

            process.exit(1);
        })
    }
})()
