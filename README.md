# [Minnow](http://www.gominnow.com) - The Backend

> An application that allows you to make money from your secrets. 

The backend is built on [Sails](http://sailsjs.org) and depends on [Waterlock](http://waterlock.ninja) for API authentication. There are a few other components that have been added as well. These include [waterlock-facebook-auth](https://github.com/davidrivera/waterlock-facebook-auth) that handles Facebook authentication along with the other modules listed below.

# Getting Started

1. clone the repo `git clone https://therepo.com`
1. cd `therepo`
1. npm install //Installs the node modules used by the project
1. sails lift //Launches the sails app


# Gaining a JWT (JSON Web Token)

A JWT is needed before most actions are able to be completed. Note: The JSON web token currently is set to expire in 7 days. This can be set via the `config/waterlock.js` file.

1. Logging in/Creating an account
- It's fast an easy to create an account or login. Currently, all you need to pass along is an email address and a password. If the email isn't found in the database, a new user is created. 
Example response:
```
{
    "auth": {
        "email": "someemail@gmail.com",
        //Note: The password has been removed from the JSON response because it should never really be available in plain text. Even when it is hashed.
        "id": 1,
        "createdAt": "2014-11-24T19:30:07.772Z",
        "updatedAt": "2014-11-24T19:30:07.795Z"
    },
    "id": 1,
    "createdAt": "2014-11-24T19:30:07.789Z",
    "updatedAt": "2014-11-24T19:30:07.789Z"
}
```

2. If an account was created for the user, the user is automatically logged in.
3. Now, to gain the access token a.k.a JWT perform a GET request on `http://localhost:1337/user/jwt`.
Example response:
```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxfHVuZGVmaW5lZCIsInN1YiI6InNtYWxsIGFuZCBjdXJpb3VzIiwiYXVkIjoibWlubm93IiwiZXhwIjoxNDE3NDc0OTgwMTQzLCJuYmYiOjE0MTY4NzAxODAxNDQsImlhdCI6MTQxNjg3MDE4MDE0NCwianRpIjoiMDk0ZjBhMTAtNzQyZS0xMWU0LWFkYmMtMmY1ZWM4MmNhMzE0In0.LAq4n7SMjknE0umjQCwmMsmsyazjaueXP_QxIfC_p_0",
  "expires": 1417474980143
}
```
4. This token can be used to perform later actions. You can use it via a Header, POST or GET request by passing it along like `access_token=MY_TOKEN`.



# Environment Variables

The config variables are set via the [Heroku tool belt](https://toolbelt.heroku.com) comment `heroku config:add MYVAR='something'`. These are set to ensure that private information isn't added directly to the code. 

## Local Variables
- FACEBOOK_CLIENT_ID:                 [Facebook App ID]
- FACEBOOK_CLIENT_SECRET:             [Facebook App Secret]
- PASS_RESET_AUTH_EMAIL_ADDRESS:      [hellominnow@gmail.com]
- PASS_RESET_AUTH_EMAIL_ADDRESS_PASS: [the email password]
- PASS_RESET_EMAIL_ADDRESS:           [hellominnow@gmail.com]
- WATERLOCK_SECRET:                   [Add your own secret]

# local.js

The `config/local.js` file contains important variables that are used during local development. You can read more about the local config file [here](http://sailsjs.org/#/documentation/reference/sails.config/sails.config.local.html). To get started quickly, just rename `local.js.sample` to `local.js` and then change the variables included as you see fit.

# Dependencies 

1. [Waterlock NPM](https://www.npmjs.org/package/waterlock)
1. [waterlock-facebook-auth](https://github.com/davidrivera/waterlock-facebook-auth)
1. [RedisCloud](https://devcenter.heroku.com/articles/rediscloud) - Redis is used for application cache.
1. [MongoHQ](https://devcenter.heroku.com/articles/mongohq) - User records and post contents are held here.
1. [Postmark](https://addons.heroku.com/postmark) - Email delivery
1. [Papertrail](https://addons.heroku.com/papertrail) - Logs and logging
1. [New Relic](https://addons.heroku.com/newrelic) - Monitoring and troubleshooting.

# Documentation

You can find Sails documentation at <http://sailsjs.org/#/documentation>.

# Further Reading

1. [Sails.js Documentation > Core Concepts](http://sailsjs.org/#/documentation/concepts/)
1. [Node.js Documentation](http://nodejs.org/documentation/)
1. [Waterline Documentation](http://sailsjs.org/#/documentation/reference/waterline) - The Sails default ORM
1. [_lodash Documentation](http://devdocs.io/lodash/) 
1. [ExpressJS Documentation](http://expressjs.com/guide/error-handling.html) - Sails is built on ExpressJS
1. [Embedded Javascript (EJS) Templates](http://www.embeddedjs.com) - This is the default view engine included with SailsJS
1. [How To Implement Password Reset In Node.js](http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/)
1. [Json Web Tokens: Examples](http://angular-tips.com/blog/2014/05/json-web-tokens-examples/)
1. [Facebook Developers Documentation](https://developers.facebook.com/)
1. [User Authentication with Sails.js](http://sethetter.com/user-authentication-with-sails-js/)
1. [Promises in Sails JS - Remove Callback Hell](http://maangalabs.com/blog/2014/08/23/promises-in-sails-js-remove-callback-hell/)
1. [JavaScript Promises ... In Wicked Detail](http://dailyjs.com/2014/02/20/promises-in-detail/)