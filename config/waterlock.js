
/**
 * waterlock
 *
 * defines various options used by waterlock
 * for more informaiton checkout
 * 
 * http://waterlock.ninja/documentation
 */
module.exports.waterlock = {
  
  // Base URL
  // 
  // used by auth methods for callback URI's using oauth and for password
  // reset links.
  baseUrl: 'http://localhost:1337',
  
  // Auth Method(s) 
  // 
  // this can be a single string, an object, or an array of objects for your 
  // chosen auth method(s) you will need to see the individual module's README
  // file for more information on the attributes necessary. This is an example
  // of the local authentication method with password reset tokens disabled.
  authMethod: [
    {
      name:'waterlock-local-auth',
      passwordReset:{
        tokens: false,
        mail: {
          protocol: 'SMTP',
          options:{
            service: 'Gmail',
            auth: {
              user: process.env.PASS_RESET_AUTH_EMAIL_ADDRESS,
              pass: process.env.PASS_RESET_AUTH_EMAIL_ADDRESS_PASS
            }
          },
          from: process.env.PASS_RESET_EMAIL_ADDRESS,
          subject: 'Your password reset!',
          forwardUrl: 'http://localhost:1337'
        },  
        template:{
          file: '../views/email.jade',
          vars:{}
        }
      },
      createOnNotFound: true
    },
    {
      name: 'waterlock-facebook-auth',
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET
    }
  ],

  // JSON Web Tokens
  //
  // this provides waterlock with basic information to build your tokens, 
  // these tokens are used for authentication, password reset, 
  // and anything else you can imagine
  jsonWebTokens: {

    // CHANGE THIS SECRET
    secret: process.env.WATERLOCK_SECRET || '8927389723j23kh2387232jh2jhj2h3',
    expiry:{
      unit: 'days',
      length: '7'
    },
    audience: 'minnow',
    subject: 'small and curious',

    // tracks jwt usage if set to true
    trackUsage: true,

    // if set to false will authenticate the
    // express session object and attach the
    // user to it during the hasJsonWebToken 
    // middleware
    stateless: false,
  },

  // Post Actions
  // 
  // Lets waterlock know how to handle different login/logout
  // attempt outcomes.
  postActions:{

    // post login event
    login: {

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      success: 'default',

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      failure: 'default'
    },

    //post logout event
    logout: {

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      success: 'default',

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      failure: 'default'
    }
  }
};
