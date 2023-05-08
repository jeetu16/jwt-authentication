

const authList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:5173'];
const originOpts = {
    origin: (origin, callback) => {
        if (authList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = originOpts;