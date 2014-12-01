/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': false,
  HomeController: {
    '*': true
  },
  AuthController: {
    'login': true,
    'logout': true,
    'register': true,
    'facebook_oauth2': true,
    'findOne': ['hasJsonWebToken'],
    'populate': ['hasJsonWebToken'],
    'remove': ['hasJsonWebToken'],
    'update': ['hasJsonWebToken']
  },
  UserController: {
    '*': false,
    'jwt': ['sessionAuth'],
    'findOne': ['hasJsonWebToken'],
    'populate': ['hasJsonWebToken'],
    'remove': ['hasJsonWebToken'],
    'destroy': ['hasJsonWebToken'],
    'update': ['hasJsonWebToken']
  },
  PostController: {
    '*': false,
    'create': ['hasJsonWebToken'],
    'update': ['hasJsonWebToken'],
    'find': ['hasJsonWebToken'],
    'populate': ['hasJsonWebToken'],
    'remove': ['hasJsonWebToken'],
    'destroy': ['hasJsonWebToken'],
    'findOne': ['hasJsonWebToken']
  },
  CommentController: {
    '*': false,
    'create': ['hasJsonWebToken'],
    'find': ['hasJsonWebToken'],
    'populate': ['hasJsonWebToken'],
    'remove': ['hasJsonWebToken'],
    'destroy': ['hasJsonWebToken'],
    'findOne': ['hasJsonWebToken']
  }

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
