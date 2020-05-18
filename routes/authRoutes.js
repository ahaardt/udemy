const passport = require ('passport');

// Export route handlers to be used in index.js taking app object from index.js as argument
module.exports = (app) => {
    app.get(
        '/auth/google',
        //google is the internal identifier for GoogleStrategy
        passport.authenticate('google', {
            // access to Google Profile & Email
            scope: ['profile', 'email']
        })
    );

    app.get ('/auth/google/callback', passport.authenticate ('google'));
    app.get('/api/current_user',(req, res) => {
        res.send(req.user);
    });
    //logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);

    });
};