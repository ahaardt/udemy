// keys.js - figure out what credentials to return
// use capital ID

if (process.env.NODE_ENV === 'production') {
    //we are in production - return production keys
    module.exports = require('./prod');
} else {
    //we are in development - return dev keys
    module.exports = require('./dev');
}


