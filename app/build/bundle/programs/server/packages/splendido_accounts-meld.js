(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var AccountsEmailsField = Package['splendido:accounts-emails-field'].AccountsEmailsField;

/* Package-scope variables */
var AccountsMeld, checkForMelds, MeldActions, updateOrCreateUserFromExternalService;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/splendido_accounts-meld/packages/splendido_accounts-meld.js                      //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
(function () {                                                                               // 1
                                                                                             // 2
////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                    //     // 4
// packages/splendido:accounts-meld/lib/_globals.js                                   //     // 5
//                                                                                    //     // 6
////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                      //     // 8
                                                                                      // 1   // 9
AccountsMeld = undefined;                                                             // 2   // 10
                                                                                      // 3   // 11
checkForMelds = undefined;                                                            // 4   // 12
                                                                                      // 5   // 13
MeldActions = undefined;                                                              // 6   // 14
                                                                                      // 7   // 15
updateOrCreateUserFromExternalService = undefined;                                    // 8   // 16
                                                                                      // 9   // 17
////////////////////////////////////////////////////////////////////////////////////////     // 18
                                                                                             // 19
}).call(this);                                                                               // 20
                                                                                             // 21
                                                                                             // 22
                                                                                             // 23
                                                                                             // 24
                                                                                             // 25
                                                                                             // 26
(function () {                                                                               // 27
                                                                                             // 28
////////////////////////////////////////////////////////////////////////////////////////     // 29
//                                                                                    //     // 30
// packages/splendido:accounts-meld/lib/accounts-meld-server.js                       //     // 31
//                                                                                    //     // 32
////////////////////////////////////////////////////////////////////////////////////////     // 33
                                                                                      //     // 34
/* global                                                                             // 1   // 35
		AccountsEmailsField: false,                                                         // 2   // 36
    AccountsMeld: true,                                                               // 3   // 37
    checkForMelds: true,                                                              // 4   // 38
		MeldActions: true,                                                                  // 5   // 39
    updateOrCreateUserFromExternalService: true                                       // 6   // 40
*/                                                                                    // 7   // 41
'use strict';                                                                         // 8   // 42
                                                                                      // 9   // 43
// ----------------------------------------                                           // 10  // 44
// Collection to keep meld action documents                                           // 11  // 45
// ----------------------------------------                                           // 12  // 46
                                                                                      // 13  // 47
// Each document is composed as follow:                                               // 14  // 48
// {                                                                                  // 15  // 49
//     dst_user_id: user_id associated to the account which should survive            // 16  // 50
//     src_user_id: user_id associated to the account to be deleted                   // 17  // 51
//     meld:        one of ["ask", yes", "not_now", "never", "melding", "done"]       // 18  // 52
//                  used to track the status of the meld action.                      // 19  // 53
//     src_info: {  a bit of information about the source account                     // 20  // 54
//       emails: src_user.registered_emails (see accounts-emails-field package)       // 21  // 55
//       services: array of registered services' name, but 'resume'                   // 22  // 56
//     }                                                                              // 23  // 57
//     dst_info: {  a bit of information about the destination account                // 24  // 58
//       emails: dst_user.registered_emails (see accounts-emails-field package)       // 25  // 59
//       services: array of registered services' name, but 'resume'                   // 26  // 60
//     }                                                                              // 27  // 61
// }                                                                                  // 28  // 62
//                                                                                    // 29  // 63
//                                                                                    // 30  // 64
// Server - Client interaction flow:                                                  // 31  // 65
//                                                                                    // 32  // 66
// 1) a meld action is created: 'meld': 'ask'                                         // 33  // 67
// 2) the client is prompted with a question for which answer allowed values are      // 34  // 68
//    - 'yes' -> requires to perform the meld action                                  // 35  // 69
//    - 'not_now' -> requires to as again at the next login                           // 36  // 70
//    - 'never' -> requires not to meld and not to bother again...                    // 37  // 71
//                                                                                    // 38  // 72
// 3a) client updates the meld action an sets 'meld': 'yes'                           // 39  // 73
// 3aa) server sets 'meld': 'melding'                                                 // 40  // 74
//      (so that client can visualize something...)                                   // 41  // 75
// 3ab) in case the meld action cannot be performed because of the same service       // 42  // 76
//      appearing inside both accounts but with different ids the server sets         // 43  // 77
//      'meld': 'ask'                                                                 // 44  // 78
//      ...the hope is the user can remove one of the two conflitting services        // 45  // 79
//      and then ask again to meld.                                                   // 46  // 80
//      should be probably very rare, but SOMETHING BETTER SHOULD BE DONE!            // 47  // 81
// 3ac) when the meld action is completed the server sets 'meld': 'done'              // 48  // 82
// 3ad) the client should visualize something and then set 'meld': 'ok'               // 49  // 83
//                                                                                    // 50  // 84
// 3b) client updates the meld action an sets 'meld': 'not_now'                       // 51  // 85
// 3ba) at the next login the server changes 'meld': 'not_now' --> 'meld': 'ask'      // 52  // 86
//                                                                                    // 53  // 87
// 3c) client updates the meld action an sets 'meld': 'never'                         // 54  // 88
// 3ca) at the next login the server sees the mels action with 'meld': 'never'        // 55  // 89
//      and does nothing...                                                           // 56  // 90
//                                                                                    // 57  // 91
                                                                                      // 58  // 92
MeldActions = new Meteor.Collection("meldActions");                                   // 59  // 93
                                                                                      // 60  // 94
// Allow client-side modification of a meld action only                               // 61  // 95
// to catch the user answer after having proposed a meld                              // 62  // 96
// and to delete the document of a completed meld action.                             // 63  // 97
MeldActions.allow({                                                                   // 64  // 98
	update: function(userId, doc, fieldNames, modifier) {                                // 65  // 99
		// Only the destination user can modify a document                                  // 66  // 100
		if (userId !== doc.dst_user_id) {                                                   // 67  // 101
			return false;                                                                      // 68  // 102
		}                                                                                   // 69  // 103
		// ...and only the field meld can be modified                                       // 70  // 104
		if (fieldNames.length > 1 || fieldNames[0] !== "meld") {                            // 71  // 105
			return false;                                                                      // 72  // 106
		}                                                                                   // 73  // 107
		// ...and only if meld is 'ask' or 'melding'                                        // 74  // 108
		if (!_.contains(['ask', 'melding'], doc.meld)) {                                    // 75  // 109
			return false;                                                                      // 76  // 110
		}                                                                                   // 77  // 111
		// ...when meld is "ask" only ["yes", "not_now", "never"] are allowed               // 78  // 112
		if (doc.meld === "ask") {                                                           // 79  // 113
			var allowedModifiers = [{                                                          // 80  // 114
				'$set': {                                                                         // 81  // 115
					meld: 'yes'                                                                      // 82  // 116
				}                                                                                 // 83  // 117
			}, {                                                                               // 84  // 118
				'$set': {                                                                         // 85  // 119
					meld: 'not_now'                                                                  // 86  // 120
				}                                                                                 // 87  // 121
			}, {                                                                               // 88  // 122
				'$set': {                                                                         // 89  // 123
					meld: 'never'                                                                    // 90  // 124
				}                                                                                 // 91  // 125
			}];                                                                                // 92  // 126
			var notAllowed = _.every(allowedModifiers, function(mod) {                         // 93  // 127
				return !_.isEqual(mod, modifier);                                                 // 94  // 128
			});                                                                                // 95  // 129
			if (notAllowed) {                                                                  // 96  // 130
				return false;                                                                     // 97  // 131
			}                                                                                  // 98  // 132
		}                                                                                   // 99  // 133
		// ...when meld is "melding" only answer "ok" is allowed                            // 100
		if (doc.meld === "melding") {                                                       // 101
			if (!_.isEqual(modifier, {                                                         // 102
					'$set': {                                                                        // 103
						meld: 'ok'                                                                      // 104
					}                                                                                // 105
				})) {                                                                             // 106
				return false;                                                                     // 107
			}                                                                                  // 108
		}                                                                                   // 109
		// ...only in case all the above conditions are satisfied:                          // 110
		return true;                                                                        // 111
	},                                                                                   // 112
	remove: function(userId, doc) {                                                      // 113
		// no removals unless the meld action is completed!                                 // 114
		return doc.meld === "done";                                                         // 115
	}                                                                                    // 116
});                                                                                   // 117
                                                                                      // 118
// Publish meld action registered for the current user                                // 119
// ...except those marked with "ok", yes", "not_now", "never"                         // 120
//    which are not meant to be displayed client-side.                                // 121
Meteor.publish("pendingMeldActions", function() {                                     // 122
	return MeldActions.find({                                                            // 123
		dst_user_id: this.userId,                                                           // 124
		meld: {                                                                             // 125
			$nin: ["not_now", "never", "ok", "yes"]                                            // 126
		}                                                                                   // 127
	});                                                                                  // 128
});                                                                                   // 129
                                                                                      // 130
// Observe the changes of meld actions to respond to                                  // 131
// client-side user interactions:                                                     // 132
//  - remove unnecessary data when a meld action is marked                            // 133
//    as to be never performed                                                        // 134
//  - actually proceed to meld accounts when the client-side                          // 135
//    answer is "yes"                                                                 // 136
MeldActions.find().observeChanges({                                                   // 137
	changed: function(id, fields) {                                                      // 138
		if (fields.meld === "never") {                                                      // 139
			// Remove unnecessary data from the document                                       // 140
			MeldActions.update(id, {                                                           // 141
				$unset: {                                                                         // 142
					src_info: "",                                                                    // 143
					dst_info: ""                                                                     // 144
				}                                                                                 // 145
			});                                                                                // 146
		} else if (fields.meld === "yes") {                                                 // 147
			// Proceed with actual melding of the two accounts...                              // 148
			AccountsMeld.executeMeldAction(id);                                                // 149
		}                                                                                   // 150
	}                                                                                    // 151
});                                                                                   // 152
                                                                                      // 153
                                                                                      // 154
                                                                                      // 155
// ------------------                                                                 // 156
// AccountsMeld class                                                                 // 157
// ------------------                                                                 // 158
                                                                                      // 159
var AM = function() {};                                                               // 160
                                                                                      // 161
// Configuration pattern to be checked with check                                     // 162
AM.prototype.CONFIG_PAT = {                                                           // 163
	askBeforeMeld: Match.Optional(Boolean),                                              // 164
	checkForConflictingServices: Match.Optional(Boolean),                                // 165
	meldUserCallback: Match.Optional(Match.Where(_.isFunction)),                         // 166
	meldDBCallback: Match.Optional(Match.Where(_.isFunction)),                           // 167
	serviceAddedCallback: Match.Optional(Match.Where(_.isFunction))                      // 168
};                                                                                    // 169
                                                                                      // 170
// Current configuration values                                                       // 171
AM.prototype._config = {                                                              // 172
	// Flags telling whether to ask the user before melding any two accounts             // 173
	askBeforeMeld: false,                                                                // 174
	// Flags telling whether to check for conflicting services before melding            // 175
	checkForConflictingServices: false,                                                  // 176
	// Reference to the callback to meld user objects                                    // 177
	meldUserCallback: null,                                                              // 178
	// Reference to the callback to meld collections' objects                            // 179
	meldDBCallback: null,                                                                // 180
	// Reference to the callback to update user profile when a service is added          // 181
	serviceAddedCallback: null                                                           // 182
};                                                                                    // 183
                                                                                      // 184
AM.prototype._meldUsersObject = function(srcUser, dstUser) {                          // 185
	// Checks whether a callback for melding users' object was specified                 // 186
	var meldUserCallback = this.getConfig('meldUserCallback');                           // 187
	// ...in case it was, uses the requested one                                         // 188
	if (meldUserCallback) {                                                              // 189
		var meldedUser = meldUserCallback(srcUser, dstUser);                                // 190
		meldedUser = _.omit(                                                                // 191
			meldedUser,                                                                        // 192
			'_id', 'services', 'emails', 'registered_emails'                                   // 193
		);                                                                                  // 194
		_.each(meldedUser, function(value, key) {                                           // 195
			dstUser[key] = value;                                                              // 196
		});                                                                                 // 197
	}                                                                                    // 198
	// ...otherwise perfors some default fusion                                          // 199
	else {                                                                               // 200
		// 'createdAt' field: keep the oldest between the two                               // 201
		if (srcUser.createdAt < dstUser.createdAt) {                                        // 202
			dstUser.createdAt = srcUser.createdAt;                                             // 203
		}                                                                                   // 204
		// 'profile' field                                                                  // 205
		var profile = {};                                                                   // 206
		_.defaults(profile, dstUser.profile || {});                                         // 207
		_.defaults(profile, srcUser.profile || {});                                         // 208
		if (!_.isEmpty(profile)) {                                                          // 209
			dstUser.profile = profile;                                                         // 210
		}                                                                                   // 211
	}                                                                                    // 212
	// 'services' field (at this point we know some check was already done...)           // 213
	// adds services appearing inside the src user which                                 // 214
	// do not appear inside the destination user (but for 'resume')                      // 215
	// TODO: check whether we need to re-encrypt data using                              // 216
	//       'pinEncryptedFieldsToUser'. See                                             // 217
	//       meteor/packages/accounts-base/accounts_server.js#L1136                      // 218
	var newServices = {};                                                                // 219
	var srcServices = _.omit(srcUser.services, _.keys(dstUser.services));                // 220
	// NOTE: it is mandatory to skip also 'resume' data in order to prevent the          // 221
	//       current login action to be interrupted in case the srcUser actually         // 222
	//       has a different and outdated 'resume' data.                                 // 223
	srcServices = _.omit(srcUser.services, "resume");                                    // 224
	_.each(_.keys(srcServices), function(serviceName) {                                  // 225
		newServices['services.' + serviceName] = srcServices[serviceName];                  // 226
		dstUser.services[serviceName] = srcServices[serviceName];                           // 227
	});                                                                                  // 228
	// TODO: check there are no overlapping services which have different ids!!!         // 229
	//       'emails' field: fuses the two emails fields, giving precedence to           // 230
	//       verified ones...                                                            // 231
	var srcEmails = srcUser.emails || [];                                                // 232
	var dstEmails = dstUser.emails || [];                                                // 233
	// creates an object with addresses as keys and verification status as values        // 234
	var emails = {};                                                                     // 235
	_.each(_.flatten([srcEmails, dstEmails]), function(email) {                          // 236
		emails[email.address] = emails[email.address] || email.verified;                    // 237
	});                                                                                  // 238
	// transforms emails back to                                                         // 239
	// [{address: addr1, verified: bool}, {address: addr2, verified: bool}, ...]         // 240
	dstUser.emails = _.map(emails, function(verified, address) {                         // 241
		return {                                                                            // 242
			address: address,                                                                  // 243
			verified: verified                                                                 // 244
		};                                                                                  // 245
	});                                                                                  // 246
	if (!dstUser.emails.length) {                                                        // 247
		delete dstUser.emails;                                                              // 248
	}                                                                                    // 249
	// updates the registered_emails field                                               // 250
	AccountsEmailsField.updateEmails({                                                   // 251
		user: dstUser                                                                       // 252
	});                                                                                  // 253
	// Removes the old user                                                              // 254
	Meteor.users.remove(srcUser._id);                                                    // 255
	// Updates the current user                                                          // 256
	Meteor.users.update(dstUser._id, {                                                   // 257
		$set: _.omit(dstUser, "_id", "services")                                            // 258
	});                                                                                  // 259
	Meteor.users.update(dstUser._id, {                                                   // 260
		$set: newServices                                                                   // 261
	});                                                                                  // 262
};                                                                                    // 263
                                                                                      // 264
AM.prototype.getConfig = function(paramName) {                                        // 265
	return this._config[paramName];                                                      // 266
};                                                                                    // 267
                                                                                      // 268
AM.prototype.configure = function(config) {                                           // 269
	check(config, this.CONFIG_PAT);                                                      // 270
	// Update the current configuration                                                  // 271
	this._config = _.defaults(config, this._config);                                     // 272
};                                                                                    // 273
                                                                                      // 274
AM.prototype.createMeldAction = function(srcUser, dstUser) {                          // 275
	MeldActions.insert({                                                                 // 276
		src_user_id: srcUser._id,                                                           // 277
		dst_user_id: dstUser._id,                                                           // 278
		meld: "ask",                                                                        // 279
		src_info: {                                                                         // 280
			emails: srcUser.registered_emails,                                                 // 281
			services: _.without(_.keys(srcUser.services), "resume")                            // 282
		},                                                                                  // 283
		dst_info: {                                                                         // 284
			emails: dstUser.registered_emails,                                                 // 285
			services: _.without(_.keys(dstUser.services), "resume")                            // 286
		}                                                                                   // 287
	});                                                                                  // 288
};                                                                                    // 289
                                                                                      // 290
AM.prototype.executeMeldAction = function(id) {                                       // 291
	// Retrieve the meld action document                                                 // 292
	var meldAction = MeldActions.findOne(id);                                            // 293
	// Marks the meld action as "melding"                                                // 294
	MeldActions.update(meldAction._id, {                                                 // 295
		$set: {                                                                             // 296
			meld: "melding"                                                                    // 297
		}                                                                                   // 298
	});                                                                                  // 299
                                                                                      // 300
	// Retrieve the source account                                                       // 301
	var srcUser = Meteor.users.findOne(meldAction.src_user_id);                          // 302
	// Retrieve the destination account                                                  // 303
	var dstUser = Meteor.users.findOne(meldAction.dst_user_id);                          // 304
                                                                                      // 305
	// Actually melds the two accounts                                                   // 306
	var meldResult = this.meldAccounts(srcUser, dstUser);                                // 307
	if (meldResult) {                                                                    // 308
		// Marks the meld action as "done"                                                  // 309
		MeldActions.update(meldAction._id, {                                                // 310
			$set: {                                                                            // 311
				meld: "done"                                                                      // 312
			}                                                                                  // 313
		});                                                                                 // 314
		// Possibly removes old meld actions registered for the same two                    // 315
		// accounts but for the opposite direction                                          // 316
		var invMeldAction = MeldActions.findOne({                                           // 317
			src_user_id: meldAction.dst_user_id,                                               // 318
			dst_user_id: meldAction.src_user_id,                                               // 319
		});                                                                                 // 320
		if (invMeldAction) {                                                                // 321
			MeldActions.remove(invMeldAction._id);                                             // 322
		}                                                                                   // 323
	} else {                                                                             // 324
		// XXX TODO: For now this seems the only thing to be improved in a near             // 325
		//           future. Some error status and better client communication of           // 326
		//           the problem should be put in place...                                  // 327
		MeldActions.update(meldAction._id, {                                                // 328
			$set: {                                                                            // 329
				meld: "not_now"                                                                   // 330
			}                                                                                  // 331
		});                                                                                 // 332
	}                                                                                    // 333
};                                                                                    // 334
                                                                                      // 335
AM.prototype.meldAccounts = function(srcUser, dstUser) {                              // 336
	//checks there are no overlapping services which have different ids!!!               // 337
	var canMeld = true;                                                                  // 338
	// Checks for conflicting services before proceeding with actual melding             // 339
	if (this.getConfig('checkForConflictingServices')) {                                 // 340
		if (!!srcUser.services && !!dstUser.services) {                                     // 341
			_.each(_.keys(srcUser.services), function(serviceName) {                           // 342
				if (serviceName !== "resume" && !!dstUser.services[serviceName]) {                // 343
					if (serviceName === "password") {                                                // 344
						var sameService = _.isEqual(                                                    // 345
							srcUser.services[serviceName],                                                 // 346
							dstUser.services[serviceName]                                                  // 347
						);                                                                              // 348
						if (!sameService) {                                                             // 349
							canMeld = false;                                                               // 350
						}                                                                               // 351
					} else {                                                                         // 352
						var srcService = srcUser.services[serviceName];                                 // 353
						var dstService = dstUser.services[serviceName];                                 // 354
						if (!!srcService.id &&                                                          // 355
							!!dstService.id &&                                                             // 356
							srcService.id !== dstService.id                                                // 357
						) {                                                                             // 358
							canMeld = false;                                                               // 359
						}                                                                               // 360
					}                                                                                // 361
				}                                                                                 // 362
			});                                                                                // 363
		}                                                                                   // 364
	}                                                                                    // 365
	if (!canMeld) {                                                                      // 366
		return false;                                                                       // 367
	}                                                                                    // 368
	// Melds users'object                                                                // 369
	this._meldUsersObject(srcUser, dstUser);                                             // 370
	// Check whether a callback for DB document migration was specified                  // 371
	var meldDBCallback = this.getConfig('meldDBCallback');                               // 372
	if (meldDBCallback) {                                                                // 373
		meldDBCallback(srcUser._id, dstUser._id);                                           // 374
	}                                                                                    // 375
	return true;                                                                         // 376
};                                                                                    // 377
                                                                                      // 378
AccountsMeld = new AM();                                                              // 379
                                                                                      // 380
                                                                                      // 381
                                                                                      // 382
                                                                                      // 383
// ------------------------------------------------                                   // 384
// Callback functions to be registered with 'hooks'                                   // 385
// ------------------------------------------------                                   // 386
                                                                                      // 387
                                                                                      // 388
                                                                                      // 389
checkForMelds = function(dstUser) {                                                   // 390
	// Updates all possibly pending meld actions...                                      // 391
	MeldActions.update({                                                                 // 392
		dst_user_id: dstUser._id,                                                           // 393
		meld: "not_now"                                                                     // 394
	}, {                                                                                 // 395
		$set: {                                                                             // 396
			meld: "ask"                                                                        // 397
		}                                                                                   // 398
	}, {                                                                                 // 399
		multi: true                                                                         // 400
	});                                                                                  // 401
	// Picks up verified email addresses and creates a list like                         // 402
	// [                                                                                 // 403
	//    {$elemMatch: {"address": addr1, "verified": true}},                            // 404
	//    {$elemMatch: {"address": addr2, "verified": true}},                            // 405
	//    ...                                                                            // 406
	// ]                                                                                 // 407
	var queryEmails = _.chain(dstUser.registered_emails)                                 // 408
		.filter(function(email) {                                                           // 409
			return email.verified;                                                             // 410
		})                                                                                  // 411
		.map(function(email) {                                                              // 412
			return {                                                                           // 413
				"registered_emails": {                                                            // 414
					$elemMatch: email                                                                // 415
				}                                                                                 // 416
			};                                                                                 // 417
		})                                                                                  // 418
		.value();                                                                           // 419
	// In case there is at least one registered address                                  // 420
	if (queryEmails.length) {                                                            // 421
		// Finds users with at least one registered email address matching the              // 422
		// above list                                                                       // 423
		if (queryEmails.length > 1) {                                                       // 424
			queryEmails = {                                                                    // 425
				$or: queryEmails                                                                  // 426
			};                                                                                 // 427
		} else {                                                                            // 428
			queryEmails = queryEmails[0];                                                      // 429
		}                                                                                   // 430
		// Excludes current user...                                                         // 431
		queryEmails._id = {                                                                 // 432
			$ne: dstUser._id                                                                   // 433
		};                                                                                  // 434
		var users = Meteor.users.find(queryEmails);                                         // 435
		users.forEach(function(user) {                                                      // 436
			if (AccountsMeld.getConfig('askBeforeMeld')) {                                     // 437
				// Checks if there is already a document about this meld action                   // 438
				var meldAction = MeldActions.findOne({                                            // 439
					src_user_id: user._id,                                                           // 440
					dst_user_id: dstUser._id                                                         // 441
				});                                                                               // 442
				if (meldAction) {                                                                 // 443
					// If the last time the answer was "Not now", ask again...                       // 444
					if (meldAction.meld === "not_now") {                                             // 445
						MeldActions.update(meldAction._id, {                                            // 446
							$set: {                                                                        // 447
								meld: "ask"                                                                   // 448
							}                                                                              // 449
						});                                                                             // 450
					}                                                                                // 451
				} else {                                                                          // 452
					// Creates a new meld action                                                     // 453
					AccountsMeld.createMeldAction(user, dstUser);                                    // 454
				}                                                                                 // 455
			} else {                                                                           // 456
				// Directly melds the two accounts                                                // 457
				AccountsMeld.meldAccounts(user, dstUser);                                         // 458
			}                                                                                  // 459
		});                                                                                 // 460
	}                                                                                    // 461
};                                                                                    // 462
                                                                                      // 463
                                                                                      // 464
var createServiceSelector = function(serviceName, serviceData) {                      // 465
	// Selector construction copied from                                                 // 466
	// accounts-base/accounts_server.js Lines 1114-1131                                  // 467
	var selector = {};                                                                   // 468
	var serviceIdKey = "services." + serviceName + ".id";                                // 469
                                                                                      // 470
	// XXX Temporary special case for Twitter. (Issue #629)                              // 471
	//   The serviceData.id will be a string representation of an integer.               // 472
	//   We want it to match either a stored string or int representation.               // 473
	//   This is to cater to earlier versions of Meteor storing twitter                  // 474
	//   user IDs in number form, and recent versions storing them as strings.           // 475
	//   This can be removed once migration technology is in place, and twitter          // 476
	//   users stored with integer IDs have been migrated to string IDs.                 // 477
	if (serviceName === "twitter" && !isNaN(serviceData.id)) {                           // 478
		selector.$or = [{}, {}];                                                            // 479
		selector.$or[0][serviceIdKey] = serviceData.id;                                     // 480
		selector.$or[1][serviceIdKey] = parseInt(serviceData.id, 10);                       // 481
	} else {                                                                             // 482
		selector[serviceIdKey] = serviceData.id;                                            // 483
	}                                                                                    // 484
                                                                                      // 485
	return selector;                                                                     // 486
};                                                                                    // 487
                                                                                      // 488
                                                                                      // 489
var origUpdateOrCreateUserFromExternalService =                                       // 490
	Accounts.updateOrCreateUserFromExternalService;                                      // 491
                                                                                      // 492
updateOrCreateUserFromExternalService = function(serviceName, serviceData, options) { // 493
	var                                                                                  // 494
		currentUser = Meteor.user(),                                                        // 495
		selector,                                                                           // 496
		setAttr,                                                                            // 497
		serviceIdKey,                                                                       // 498
		user;                                                                               // 499
                                                                                      // 500
	if (currentUser) {                                                                   // 501
		// The user was already logged in with a different account                          // 502
		// Checks if the service is already registered with this same account               // 503
		if (!currentUser.services[serviceName]) {                                           // 504
			// It may be that the same service is already used with a different                // 505
			// account. Checks if there is already an account with this service                // 506
                                                                                      // 507
			// Creates a selector for the current service                                      // 508
			selector = createServiceSelector(serviceName, serviceData);                        // 509
			// Look for a user with the appropriate service user id.                           // 510
			user = Meteor.users.findOne(selector);                                             // 511
			if (!user) {                                                                       // 512
				// This service is being used for the first time!                                 // 513
				// Simply add the service to the current user, and that's it!                     // 514
				setAttr = {};                                                                     // 515
				serviceIdKey = "services." + serviceName + ".id";                                 // 516
				setAttr[serviceIdKey] = serviceData.id;                                           // 517
				// This is just to fake updateOrCreateUserFromExternalService so to have          // 518
				// it attach the new service to the existing user instead of creating a           // 519
				// new one                                                                        // 520
				Meteor.users.update({                                                             // 521
					_id: currentUser._id                                                             // 522
				}, {                                                                              // 523
					$set: setAttr                                                                    // 524
				});                                                                               // 525
				// Now calls original updateOrCreateUserFromExternalService                       // 526
				origUpdateOrCreateUserFromExternalService.apply(this, arguments);                 // 527
				// Reloads updated currentUser                                                    // 528
				currentUser = Meteor.users.findOne(currentUser._id);                              // 529
				// Updates the registered_emails field                                            // 530
				AccountsEmailsField.updateEmails({                                                // 531
					user: currentUser                                                                // 532
				});                                                                               // 533
				// Checks whether a callback for user update after a new service is               // 534
				// added was specified                                                            // 535
				var serviceAddedCbk = AccountsMeld.getConfig('serviceAddedCallback');             // 536
				if (serviceAddedCbk) {                                                            // 537
					serviceAddedCbk(currentUser._id, serviceName);                                   // 538
				}                                                                                 // 539
				// Cancels the login to save some data exchange with the client                   // 540
				// currentUser will remain logged in                                              // 541
				return {                                                                          // 542
					type: serviceName,                                                               // 543
					error: new Meteor.Error(                                                         // 544
						Accounts.LoginCancelledError.numericError,                                      // 545
						"Service correctly added to the current user, no need to proceed!"              // 546
					)                                                                                // 547
				};                                                                                // 548
			} else {                                                                           // 549
				// This service was already registered for "user"                                 // 550
				if (AccountsMeld.getConfig('askBeforeMeld')) {                                    // 551
					// Checks if there is already a document about this meld action                  // 552
					var meldAction = MeldActions.findOne({                                           // 553
						src_user_id: user._id,                                                          // 554
						dst_user_id: currentUser._id                                                    // 555
					});                                                                              // 556
					if (meldAction) {                                                                // 557
						// If the last time the answer was "Not now", ask again...                      // 558
						if (meldAction.meld === "not_now") {                                            // 559
							MeldActions.update(meldAction._id, {                                           // 560
								$set: {                                                                       // 561
									meld: "ask"                                                                  // 562
								}                                                                             // 563
							});                                                                            // 564
						}                                                                               // 565
					} else {                                                                         // 566
						// Creates a new meld action                                                    // 567
						AccountsMeld.createMeldAction(user, currentUser);                               // 568
					}                                                                                // 569
					// Cancels the login to keep currentUser logged in...                            // 570
					return {                                                                         // 571
						type: serviceName,                                                              // 572
						error: new Meteor.Error(                                                        // 573
							Accounts.LoginCancelledError.numericError,                                     // 574
							"Another account registered with the same service was found!"                  // 575
						)                                                                               // 576
					};                                                                               // 577
				} else {                                                                          // 578
					// Directly melds the two accounts                                               // 579
					AccountsMeld.meldAccounts(user, currentUser);                                    // 580
					// Cancels the login                                                             // 581
					return {                                                                         // 582
						type: serviceName,                                                              // 583
						error: new Meteor.Error(                                                        // 584
							Accounts.LoginCancelledError.numericError,                                     // 585
							"Another account registered with the same service was found, " +               // 586
							"and melded with the current one!"                                             // 587
						)                                                                               // 588
					};                                                                               // 589
				}                                                                                 // 590
			}                                                                                  // 591
		}                                                                                   // 592
	} else {                                                                             // 593
		// The user is logging in now...                                                    // 594
		// Only In case automatic melding is set                                            // 595
		if (!AccountsMeld.getConfig('askBeforeMeld')) {                                     // 596
			// Creates a selector for the current service                                      // 597
			selector = createServiceSelector(serviceName, serviceData);                        // 598
			// Look for a user with the appropriate service user id.                           // 599
			user = Meteor.users.findOne(selector);                                             // 600
			if (!user) {                                                                       // 601
				// This service is being used for the first time!                                 // 602
				// Extracts the email address associated with the current service                 // 603
				var serviceEmails = AccountsEmailsField.getEmailsFromService(                     // 604
					serviceName, serviceData                                                         // 605
				).filter(function(serviceEmail) {                                                 // 606
					return serviceEmail.verified;                                                    // 607
				});                                                                               // 608
				// In case it is a verified email...                                              // 609
				if (serviceEmails.length) {                                                       // 610
					// ...checks whether the email address used with the service is                  // 611
					// already associated with an existing account.                                  // 612
					selector = {                                                                     // 613
						$or: serviceEmails.map(function(serviceEmail) {                                 // 614
							return {                                                                       // 615
								"registered_emails": {$elemMatch: serviceEmail}                               // 616
							};                                                                             // 617
						})                                                                              // 618
					};                                                                               // 619
					var otherUser = Meteor.users.findOne(selector);                                  // 620
					if (otherUser) {                                                                 // 621
						// Simply add the service to 'user', and that's it!                             // 622
						setAttr = {};                                                                   // 623
						serviceIdKey = "services." + serviceName + ".id";                               // 624
						setAttr[serviceIdKey] = serviceData.id;                                         // 625
						// This is just to fake updateOrCreateUserFromExternalService so to             // 626
						// have it attach the new service to the existing user instead of               // 627
						// creating a new one                                                           // 628
						Meteor.users.update({                                                           // 629
							_id: otherUser._id                                                             // 630
						}, {                                                                            // 631
							$set: setAttr                                                                  // 632
						});                                                                             // 633
					}                                                                                // 634
				}                                                                                 // 635
			}                                                                                  // 636
		}                                                                                   // 637
	}                                                                                    // 638
	// Let the user in!                                                                  // 639
	return origUpdateOrCreateUserFromExternalService.apply(this, arguments);             // 640
};                                                                                    // 641
                                                                                      // 642
////////////////////////////////////////////////////////////////////////////////////////     // 677
                                                                                             // 678
}).call(this);                                                                               // 679
                                                                                             // 680
                                                                                             // 681
                                                                                             // 682
                                                                                             // 683
                                                                                             // 684
                                                                                             // 685
(function () {                                                                               // 686
                                                                                             // 687
////////////////////////////////////////////////////////////////////////////////////////     // 688
//                                                                                    //     // 689
// packages/splendido:accounts-meld/lib/accounts-meld-hooks.js                        //     // 690
//                                                                                    //     // 691
////////////////////////////////////////////////////////////////////////////////////////     // 692
                                                                                      //     // 693
/* global                                                                             // 1   // 694
	checkForMelds: false,                                                                // 2   // 695
	updateOrCreateUserFromExternalService: false                                         // 3   // 696
*/                                                                                    // 4   // 697
'use strict';                                                                         // 5   // 698
                                                                                      // 6   // 699
// Register `updateOrCreateUserFromExternalService` function to                       // 7   // 700
// be used in place of the original                                                   // 8   // 701
// `Accounts.updateOrCreateUserFromExternalService`                                   // 9   // 702
Accounts.updateOrCreateUserFromExternalService =                                      // 10  // 703
	updateOrCreateUserFromExternalService;                                               // 11  // 704
                                                                                      // 12  // 705
                                                                                      // 13  // 706
// Register `updateEmails` and checkPasswordLogin` functions                          // 14  // 707
// to be triggered with the `onLogin` hook                                            // 15  // 708
Accounts.onLogin(function(attempt) {                                                  // 16  // 709
                                                                                      // 17  // 710
	// Reload user object which was possibly modified                                    // 18  // 711
	// by splendido:accounts-emails-field by a previous onLogin callback                 // 19  // 712
	// note: the *attempt* object is cloned for each hook callback                       // 20  // 713
	//       se there's no way to get the modified user object from the                  // 21  // 714
	//       *attempt* one...                                                            // 22  // 715
	var user = Meteor.users.findOne(attempt.user._id);                                   // 23  // 716
                                                                                      // 24  // 717
	// Checks for possible meld actions to be created                                    // 25  // 718
	checkForMelds(user);                                                                 // 26  // 719
});                                                                                   // 27  // 720
                                                                                      // 28  // 721
////////////////////////////////////////////////////////////////////////////////////////     // 722
                                                                                             // 723
}).call(this);                                                                               // 724
                                                                                             // 725
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['splendido:accounts-meld'] = {
  AccountsMeld: AccountsMeld,
  MeldActions: MeldActions
};

})();

//# sourceMappingURL=splendido_accounts-meld.js.map
