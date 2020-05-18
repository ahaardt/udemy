const express = require ('express');
const mongoose = require ('mongoose');
const keys = require ('./config/keys')
const cookieSession = require ('cookie-session');
const passport = require ('passport');
//Import User Model from User.js
require ('./models/User');
require ('./services/passport');



mongoose.connect(keys.mongoURI);

const app = express ();

app.use (
    //use cookieSession Library to define cookie
    cookieSession ({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //encrypt with key from key file (to keep locally)
        keys: [keys.cookieKey]

    })

);

app.use(passport.initialize());
app.use(passport.session());



require ('./routes/authRoutes')(app);




//Listens for environment variables - dynamic port form Heroku or default port 5000 (for testing environment)
const PORT = process.env.PORT ||  5000;
app.listen(PORT);



