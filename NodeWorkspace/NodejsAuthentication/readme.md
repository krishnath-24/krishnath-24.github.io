# passport-google

[Passport](http://passportjs.org/) strategy for authenticating with [Google](https://google.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Google in your Node.js applications.
By plugging into Passport, Google authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).



## Install

```bash
$ npm install passport-google-oauth
```

## Usage

#### Create an Application

Before using `passport-google`, you must register an application with Google.
If you have not already done so, a new application can be created at
[developer applications](http://console.developers.google.com/) within
settings panel.  Your application will be issued a client ID and client
secret, which need to be provided to the strategy.  You will also need to
configure a callback URL which matches the route in your application.

#### Configure Strategy

The Google authentication strategy authenticates users using a google account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
google profile.  The `verify` callback must call `callback` providing a user to
complete authentication.


```js
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new googleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL : 'http://localhost:8000/users/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, callback) {
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'google and local'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    return res.redirect('/users/profile');
  });
```



## Contributing

* feel free to contribute to the project



