[![Minnow][minnow-image]][minnow-url]
# [Minnow](minnow-url) `0.1` - The Backend

> An application that allows you to make money from your secrets. 

| [![Build Status][travis-image]][travis-url] | [![Dependency Status][dependency-image]][dependency-url] | [![Coverage Status][coverage-image]][coverage-url] | [![Code Climate][climate-image]][climate-url] | [![Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International][license-image]][license-url] | 
| ------ | ------ | ------ | ------ | ------ |


The backend is built on [Sails](http://sailsjs.org) and depends on [Waterlock](http://waterlock.ninja) for API authentication. There are a few other components that have been added as well. These include [waterlock-facebook-auth](https://github.com/davidrivera/waterlock-facebook-auth) that handles Facebook authentication along with the other modules listed below.

# Getting Started

1. clone the repo `git clone https://therepo.com`
1. cd `therepo`
1. Rename `config/local.sample.js` to `local.js` and update variables in the file as needed
1. npm install //Installs the node modules used by the project
1. sails lift //Launches the sails app


# Gaining a JWT (JSON Web Token)

A JWT is needed before most actions are able to be completed. Note: The JSON web token currently is set to expire in 7 days. This can be set via the `config/waterlock.js` file.

1. Logging in/Creating an account
- It's fast an easy to create an account or login. Currently, all you need to make a POST request with the email address, a password and the type. The type can either be `facebook` or `local`. If the email isn't found in the database, a new user is created. 
Example request:
```
http://localhost:1337?type=local&email='rob@test.com'&password='secret'
```
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
> If you're using the [waterlock-facebook-auth], you'll get a facebookId in the response.

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

## local.js

The `config/local.js` file contains important variables that are used during local development. You can read more about the local config file [here](http://sailsjs.org/#/documentation/reference/sails.config/sails.config.local.html). To get started quickly, just rename `local.js.sample` to `local.js` and then change the variables included as you see fit.

# Dependencies 

1. [Waterlock NPM](https://www.npmjs.org/package/waterlock)
1. [waterlock-facebook-auth](https://github.com/davidrivera/waterlock-facebook-auth)
1. [RedisCloud](https://devcenter.heroku.com/articles/rediscloud) - Redis is used for application cache.
1. [MongoHQ](https://devcenter.heroku.com/articles/mongohq) - User records and post contents are held here.
1. [Postmark](https://addons.heroku.com/postmark) - Email delivery
1. [Papertrail](https://addons.heroku.com/papertrail) - Logs and logging
1. [New Relic](https://addons.heroku.com/newrelic) - Monitoring and troubleshooting.
1. [CUID](https://www.npmjs.org/package/cuid) - This is used to hash the post slugs.

# Documentation

You can find Sails documentation at <http://sailsjs.org/#/documentation>.

# Testing

See testing [README](test/README.md).

# Image Management

The minnow doesn't like the hastle of dealing with images, therefore it has chosen to use the flickrapi. And because the minnow chooses the simple path, it went with the node module [flickrapi](https://www.npmjs.org/package/flickrapi).

# Further Reading

1. [Sails.js Documentation > Core Concepts](http://sailsjs.org/#/documentation/concepts/)
1. [Node.js Documentation](http://nodejs.org/documentation/)
1. [Waterline Documentation](http://sailsjs.org/#/documentation/reference/waterline) - The Sails default ORM
1. [sailsCasts](http://irlnathan.github.io/sailscasts/)
1. [_lodash Documentation](http://devdocs.io/lodash/) 
1. [ExpressJS Documentation](http://expressjs.com/guide/error-handling.html) - Sails is built on ExpressJS
1. [Embedded Javascript (EJS) Templates](http://www.embeddedjs.com) - This is the default view engine included with SailsJS
1. [How To Implement Password Reset In Node.js](http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/)
1. [Json Web Tokens: Examples](http://angular-tips.com/blog/2014/05/json-web-tokens-examples/)
1. [Facebook Developers Documentation](https://developers.facebook.com/)
1. [User Authentication with Sails.js](http://sethetter.com/user-authentication-with-sails-js/)
1. [Promises in Sails JS - Remove Callback Hell](http://maangalabs.com/blog/2014/08/23/promises-in-sails-js-remove-callback-hell/)
1. [JavaScript Promises ... In Wicked Detail](http://dailyjs.com/2014/02/20/promises-in-detail/)
1. [Generating REST API With Sails JS - Part 2](http://maangalabs.com/blog/2014/07/26/generating-rest-api-with-sails-js-part-2/)



[license-image]: http://img.shields.io/badge/license-BY--NC--ND%204.0-blue.svg?style=flat
[license-url]: LICENSE

[travis-url]: https://magnum.travis-ci.com/robksawyer/minnow-back
[travis-image]: https://magnum.travis-ci.com/robksawyer/minnow-back.svg?token=tu1UvVgnNuKF7LkzqttM&branch=master&style=flat

[dependency-image]: https://gemnasium.com/8a83683bf41d385f992e7399998ad722.svg?style=flat
[dependency-url]: https://gemnasium.com/robksawyer/minnow-back

[coverage-image]: http://img.shields.io/coveralls/robksawyer/minnow-back/master.svg?style=flat
[coverage-url]: https://coveralls.io/r/robksawyer/minnow-back?branch=master

[minnow-image]: http://s17.postimg.org/7yzn6tinz/big_minnow_logo_500.png
[minnow-url]: http://getminnow.com/

[climate-image]: https://codeclimate.com/repos/54764e11e30ba02095004001/badges/da65b9e693df1becc355/gpa.svg
[climate-url]: https://codeclimate.com/repos/54764e11e30ba02095004001/feed
