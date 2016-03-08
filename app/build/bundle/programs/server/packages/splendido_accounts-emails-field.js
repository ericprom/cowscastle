(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var _ = Package.underscore._;

/* Package-scope variables */
var AccountsEmailsField;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/splendido_accounts-emails-field/packages/splendido_accounts-emails-field.j //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
(function () {                                                                         // 1
                                                                                       // 2
//////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                              //     // 4
// packages/splendido:accounts-emails-field/lib/_globals.js                     //     // 5
//                                                                              //     // 6
//////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                //     // 8
                                                                                // 1   // 9
// Declare global object                                                        // 2   // 10
AccountsEmailsField = undefined;                                                // 3   // 11
                                                                                // 4   // 12
//////////////////////////////////////////////////////////////////////////////////     // 13
                                                                                       // 14
}).call(this);                                                                         // 15
                                                                                       // 16
                                                                                       // 17
                                                                                       // 18
                                                                                       // 19
                                                                                       // 20
                                                                                       // 21
(function () {                                                                         // 22
                                                                                       // 23
//////////////////////////////////////////////////////////////////////////////////     // 24
//                                                                              //     // 25
// packages/splendido:accounts-emails-field/lib/accounts-emails-field.js        //     // 26
//                                                                              //     // 27
//////////////////////////////////////////////////////////////////////////////////     // 28
                                                                                //     // 29
/* global AccountsEmailsField: true */                                          // 1   // 30
'use strict';                                                                   // 2   // 31
                                                                                // 3   // 32
                                                                                // 4   // 33
// List of services that do not permit the use of the account to login into     // 5   // 34
// another website unless the registered email was verified.                    // 6   // 35
// Hence, for the services listed here, we can considered the email address as  // 7   // 36
// verified even if not specific field stating the verification status is       // 8   // 37
// provided!                                                                    // 9   // 38
                                                                                // 10  // 39
var whitelistedServices = ['facebook', 'linkedin'];                             // 11  // 40
                                                                                // 12  // 41
// Facebook                                                                     // 13  // 42
// It doesn't permit the use of the account unless the email                    // 14  // 43
// ownership is confirmed!                                                      // 15  // 44
// tested and verified on 2014/06/08                                            // 16  // 45
// (see issue #29 at                                                            // 17  // 46
// https://github.com/splendido/meteor-accounts-emails-field/issues/29)         // 18  // 47
                                                                                // 19  // 48
// GitHub                                                                       // 20  // 49
// If you register WITHOUT verifying the email you get                          // 21  // 50
// "email": null                                                                // 22  // 51
// on login, if then set the NON-verified email address as public you get it on // 23  // 52
// login!                                                                       // 24  // 53
// So, GitHub provided email address cannot be considered as verified!!!        // 25  // 54
// tested and verified on 2014/06/08                                            // 26  // 55
                                                                                // 27  // 56
// Linkedin                                                                     // 28  // 57
// It doesn't permit to activate your account unless the email                  // 29  // 58
// ownership is confirmed! even if, if you come back later you can access it... // 30  // 59
// In any case 3r-party login is not permitted!!                                // 31  // 60
// tested and verified on 2014/06/08                                            // 32  // 61
// (see issue #1 at                                                             // 33  // 62
// https://github.com/splendido/meteor-accounts-emails-field/issues/1 )         // 34  // 63
                                                                                // 35  // 64
// Twitter                                                                      // 36  // 65
// You never get an email field!!!                                              // 37  // 66
// The access is granted even without verifying the provided email address!     // 38  // 67
                                                                                // 39  // 68
                                                                                // 40  // 69
var getEmailsFromService = function(serviceName, service) {                     // 41  // 70
	// Picks up the email address from the service                                 // 42  // 71
	// NOTE: different services use different names for the email filed!!!         // 43  // 72
	//       so far, `email` and `emailAddress` were found but it may be the       // 44  // 73
	//       new names should be added to support all 3rd-party packages!          // 45  // 74
	// Addition by @neopostmodern: Meteor developer accounts support multiple      // 46  // 75
	//      emails themselves, rewrote to look for `emails` too and everything     // 47  // 76
	//      must be array based then.                                              // 48  // 77
                                                                                // 49  // 78
	var emails = [];                                                               // 50  // 79
                                                                                // 51  // 80
	if (service.email) {                                                           // 52  // 81
		emails = [{                                                                   // 53  // 82
			address: service.email                                                       // 54  // 83
		}];                                                                           // 55  // 84
	}                                                                              // 56  // 85
	if (service.emailAddress) {                                                    // 57  // 86
		emails = [{                                                                   // 58  // 87
			address: service.emailAddress                                                // 59  // 88
		}];                                                                           // 60  // 89
	}                                                                              // 61  // 90
	if (service.emails) {                                                          // 62  // 91
		emails = service.emails;                                                      // 63  // 92
	}                                                                              // 64  // 93
                                                                                // 65  // 94
	return emails.map(function(email) {                                            // 66  // 95
		if (!email.address) {                                                         // 67  // 96
			// e.g. GitHub provides a null value in the field "email" in case the        // 68  // 97
			// email address is not verified!                                            // 69  // 98
			return {                                                                     // 70  // 99
				address: null,                                                              // 71  // 100
				verified: false                                                             // 72  // 101
			};                                                                           // 73  // 102
		}                                                                             // 74  // 103
                                                                                // 75  // 104
		var verified = false;                                                         // 76  // 105
		// Tries to determine whether the 3rd-party email was verified                // 77  // 106
		// NOTE: so far only for the service `google` it was found a field            // 78  // 107
		//       called `verified_email`. But it may be that new names                // 79  // 108
		//       should be atted to better support all 3rd-party packages!            // 80  // 109
		if (_.indexOf(whitelistedServices, serviceName) > -1) {                       // 81  // 110
			verified = true;                                                             // 82  // 111
		}                                                                             // 83  // 112
		else if (email.verified) {                                                    // 84  // 113
			// e.g. Meteor developer account                                             // 85  // 114
			verified = true;                                                             // 86  // 115
		}                                                                             // 87  // 116
		else if (service.verified_email) {                                            // 88  // 117
			verified = true;                                                             // 89  // 118
		}                                                                             // 90  // 119
                                                                                // 91  // 120
		return {                                                                      // 92  // 121
			address: email.address,                                                      // 93  // 122
			verified: verified                                                           // 94  // 123
		};                                                                            // 95  // 124
                                                                                // 96  // 125
	});                                                                            // 97  // 126
};                                                                              // 98  // 127
                                                                                // 99  // 128
                                                                                // 100
var updateEmails = function(info) {                                             // 101
	// Picks up the user object                                                    // 102
	var user = info.user;                                                          // 103
	// creates an object with addresses as keys and verification status as values  // 104
	var emails = {};                                                               // 105
                                                                                // 106
	// Picks up all email addresses inside 'emails' field                          // 107
	_.each(user.emails || [], function(email) {                                    // 108
		emails[email.address] = emails[email.address] || email.verified;              // 109
	});                                                                            // 110
                                                                                // 111
	// Updates or adds all emails found inside services                            // 112
	_.each(user.services, function(service, serviceName) {                         // 113
		if (serviceName === 'resume' ||                                               // 114
		    serviceName === 'email'  ||                                               // 115
				serviceName === 'password')                                                 // 116
		{                                                                             // 117
			return;                                                                      // 118
		}                                                                             // 119
		var serviceEmails = getEmailsFromService(serviceName, service);               // 120
                                                                                // 121
		serviceEmails.forEach(function(serviceEmail) {                                // 122
			if (serviceEmail.address) {                                                  // 123
				emails[serviceEmail.address] = emails[serviceEmail.address] ||              // 124
				                               serviceEmail.verified;                       // 125
			}                                                                            // 126
		});                                                                           // 127
	});                                                                            // 128
                                                                                // 129
	// transforms emails back to                                                   // 130
	// [{address: addr1, verified: bool}, {address: addr2, verified: bool}, ...]   // 131
	var registeredEmails = _.map(emails, function(verified, address) {             // 132
		return {                                                                      // 133
			address: address,                                                            // 134
			verified: verified                                                           // 135
		};                                                                            // 136
	});                                                                            // 137
                                                                                // 138
	// In case we have at least 1 email                                            // 139
	if (registeredEmails.length) {                                                 // 140
		// Updates the registeredEmails field                                         // 141
		Meteor.users.update({                                                         // 142
			_id: user._id                                                                // 143
		}, {                                                                          // 144
			$set: {                                                                      // 145
				registered_emails: registeredEmails                                         // 146
			}                                                                            // 147
		});                                                                           // 148
		// Updates also current user object to be possibly used later                 // 149
		// after the function returns...                                              // 150
		user.registered_emails = registeredEmails;                                    // 151
	} else {                                                                       // 152
		// Removes the registered_emails field                                        // 153
		Meteor.users.update({                                                         // 154
			_id: user._id                                                                // 155
		}, {                                                                          // 156
			$unset: {                                                                    // 157
				registered_emails: ""                                                       // 158
			}                                                                            // 159
		});                                                                           // 160
		// Updates also current user object to be possibly used later                 // 161
		// after the function returns...                                              // 162
		delete user.registered_emails;                                                // 163
	}                                                                              // 164
};                                                                              // 165
                                                                                // 166
                                                                                // 167
// Function to update the 'registered_emails' field for all users at once       // 168
var updateAllUsersEmails = function() {                                         // 169
	Meteor.users.find().forEach(function(user) {                                   // 170
		updateEmails({                                                                // 171
			user: user                                                                   // 172
		});                                                                           // 173
	});                                                                            // 174
};                                                                              // 175
                                                                                // 176
                                                                                // 177
// Create the object to be exported                                             // 178
AccountsEmailsField = {                                                         // 179
	getEmailsFromService: getEmailsFromService,                                    // 180
	updateAllUsersEmails: updateAllUsersEmails,                                    // 181
	updateEmails: updateEmails,                                                    // 182
};                                                                              // 183
                                                                                // 184
                                                                                // 185
// Set up an index on registered_emails                                         // 186
Meteor.users._ensureIndex('registered_emails.address');                         // 187
                                                                                // 188
//////////////////////////////////////////////////////////////////////////////////     // 218
                                                                                       // 219
}).call(this);                                                                         // 220
                                                                                       // 221
                                                                                       // 222
                                                                                       // 223
                                                                                       // 224
                                                                                       // 225
                                                                                       // 226
(function () {                                                                         // 227
                                                                                       // 228
//////////////////////////////////////////////////////////////////////////////////     // 229
//                                                                              //     // 230
// packages/splendido:accounts-emails-field/lib/accounts-emails-field-on-login. //     // 231
//                                                                              //     // 232
//////////////////////////////////////////////////////////////////////////////////     // 233
                                                                                //     // 234
/* global AccountsEmailsField: false */                                         // 1   // 235
'use strict';                                                                   // 2   // 236
                                                                                // 3   // 237
                                                                                // 4   // 238
// Register `updateEmails` function under the `onLogin` hook so to              // 5   // 239
// check/update the `emails` field at every new login!                          // 6   // 240
Accounts.onLogin(AccountsEmailsField.updateEmails);                             // 7   // 241
                                                                                // 8   // 242
//////////////////////////////////////////////////////////////////////////////////     // 243
                                                                                       // 244
}).call(this);                                                                         // 245
                                                                                       // 246
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['splendido:accounts-emails-field'] = {
  AccountsEmailsField: AccountsEmailsField
};

})();

//# sourceMappingURL=splendido_accounts-emails-field.js.map
