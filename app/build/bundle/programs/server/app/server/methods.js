(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*****************************************************************************/
/*  Server Methods */                                                  //
/*****************************************************************************/
                                                                       //
Meteor.methods({                                                       // 5
    'elastic/search': function (search, callback) {                    // 6
        if (Meteor.isServer) {                                         // 7
            if (typeof search == 'undefined') {                        // 8
                search.query = {                                       // 9
                    "filtered": {                                      // 10
                        "query": {                                     // 11
                            "match_all": {}                            // 12
                        }                                              //
                    }                                                  //
                };                                                     //
            }                                                          //
            var asyncdata = function (callback) {                      // 17
                ES.search({                                            // 18
                    index: search.index,                               // 19
                    type: search.type,                                 // 20
                    body: {                                            // 21
                        "query": search.query                          // 22
                    }                                                  //
                }, function (err, res) {                               //
                    var results = [];                                  // 25
                    try {                                              // 26
                        if (typeof res.hits != 'undefined') {          // 27
                            _.each(res.hits.hits, function (item) {    // 28
                                var doc = {                            // 29
                                    // total: res.hits.total,          //
                                    _id: item._id                      // 31
                                };                                     //
                                // space: item._source.space,          //
                                // venue: item._source.venue,          //
                                if (typeof item._id != 'undefined') {  // 35
                                    results.push(doc);                 // 36
                                }                                      //
                            });                                        //
                        }                                              //
                    } catch (err) {                                    //
                        console.log(err);                              // 41
                    }                                                  //
                    callback(null, results);                           // 43
                });                                                    //
            };                                                         //
            var syncData = Meteor.wrapAsync(asyncdata);                // 46
            return syncData();                                         // 47
        }                                                              //
    },                                                                 //
    'send/invitation/email': function (email) {                        // 50
        // if (Meteor.isServer){                                       //
        //     var result = Meteor.users.find({"profile.name": {$regex : ".*"+search.keyword+".*"}}).fetch()
        //     return result;                                          //
        // }                                                           //
        if (Meteor.isServer) {                                         // 55
            SSR.compileTemplate('invitaionEmail', Assets.getText('invitaion-email.html'));
            Email.send({                                               // 57
                to: email.to,                                          // 58
                from: email.from,                                      // 59
                subject: email.subject,                                // 60
                html: SSR.render('invitaionEmail', email.text)         // 61
            });                                                        //
        }                                                              //
    },                                                                 //
    'create/castle': function (venue) {                                // 65
        if (Meteor.isServer) {                                         // 66
            var result = Venues.insert({                               // 67
                name: venue.name,                                      // 68
                createdBy: this.userId,                                // 69
                createdAt: new Date()                                  // 70
            });                                                        //
            if (result) {                                              // 72
                var team = Teams.insert({                              // 73
                    venue_id: result,                                  // 74
                    createdBy: this.userId,                            // 75
                    createdAt: new Date()                              // 76
                });                                                    //
                var staff = Staffs.insert({                            // 78
                    team_id: team,                                     // 79
                    staff_id: this.userId,                             // 80
                    role: 'owner',                                     // 81
                    accepted: true,                                    // 82
                    createdBy: this.userId,                            // 83
                    createdAt: new Date()                              // 84
                });                                                    //
            }                                                          //
            return result;                                             // 87
        }                                                              //
    },                                                                 //
    'update/castle/location': function (location) {                    // 90
        if (Meteor.isServer) {                                         // 91
            var result = Venues.update(location.venue_id, {            // 92
                '$set': {                                              // 93
                    'location.address': location.address,              // 94
                    'location.latlng': location.latlng,                // 95
                    'location.district': location.district,            // 96
                    'location.city': location.city,                    // 97
                    'location.province': location.province,            // 98
                    'location.zipcode': location.zipcode,              // 99
                    'location.phone': location.phone,                  // 100
                    'location.email': location.email,                  // 101
                    'location.website': location.website,              // 102
                    'updatedBy': this.userId,                          // 103
                    'updatedAt': new Date()                            // 104
                }                                                      //
            });                                                        //
            return result;                                             // 107
        }                                                              //
    },                                                                 //
    'update/castle/detail': function (detail) {                        // 110
        if (Meteor.isServer) {                                         // 111
            var result = Venues.update(detail.venue_id, {              // 112
                '$set': {                                              // 113
                    'name': detail.name,                               // 114
                    'detail.slogan': detail.slogan,                    // 115
                    'detail.description': detail.description,          // 116
                    'detail.floors': detail.floors,                    // 117
                    'detail.areas': detail.areas,                      // 118
                    'detail.rooms': detail.rooms,                      // 119
                    'detail.desks': detail.desks,                      // 120
                    'updatedBy': this.userId,                          // 121
                    'updatedAt': new Date()                            // 122
                }                                                      //
            });                                                        //
            return result;                                             // 125
        }                                                              //
    },                                                                 //
    'update/castle/logo': function (detail) {                          // 128
        if (Meteor.isServer) {                                         // 129
            var result = Venues.update(detail.venue_id, {              // 130
                '$set': {                                              // 131
                    'logo': detail.logo                                // 132
                }                                                      //
            });                                                        //
            return result;                                             // 135
        }                                                              //
    },                                                                 //
    'update/castle/gallery': function (data) {                         // 138
        if (Meteor.isServer) {                                         // 139
            var result = Venues.update(data.venue_id, {                // 140
                '$set': {                                              // 141
                    'gallery': data.gallery,                           // 142
                    'updatedBy': this.userId,                          // 143
                    'updatedAt': new Date()                            // 144
                }                                                      //
            });                                                        //
            return result;                                             // 147
        }                                                              //
    },                                                                 //
    'update/castle/facility': function (data) {                        // 150
        if (Meteor.isServer) {                                         // 151
            var result = Venues.update(data.venue_id, {                // 152
                '$set': {                                              // 153
                    'facility': data.facility,                         // 154
                    'updatedBy': this.userId,                          // 155
                    'updatedAt': new Date()                            // 156
                }                                                      //
            });                                                        //
            return result;                                             // 159
        }                                                              //
    },                                                                 //
    'delete/castle': function (castle) {                               // 162
        if (Meteor.isServer) {                                         // 163
            var result = Venues.remove(castle.id);                     // 164
            return result;                                             // 165
        }                                                              //
    },                                                                 //
    'create/throne': function (space) {                                // 168
        if (Meteor.isServer) {                                         // 169
            var result = Spaces.insert({                               // 170
                venue_id: space.venue,                                 // 171
                name: space.name,                                      // 172
                createdBy: this.userId,                                // 173
                createdAt: new Date()                                  // 174
            });                                                        //
            return result;                                             // 176
        }                                                              //
    },                                                                 //
    'update/throne/detail': function (space) {                         // 179
        if (Meteor.isServer) {                                         // 180
            var result = Spaces.update(space.space_id, {               // 181
                '$set': {                                              // 182
                    'instant': space.instant,                          // 183
                    'type': space.type,                                // 184
                    'name': space.name,                                // 185
                    'quantity': space.quantity,                        // 186
                    'detail': space.detail,                            // 187
                    'per_hour': space.per_hour,                        // 188
                    'per_day': space.per_day,                          // 189
                    'per_month': space.per_month,                      // 190
                    'updatedBy': this.userId,                          // 191
                    'updatedAt': new Date()                            // 192
                }                                                      //
            });                                                        //
            return result;                                             // 195
        }                                                              //
    },                                                                 //
    'delete/throne': function (throne) {                               // 198
        if (Meteor.isServer) {                                         // 199
            var result = Spaces.remove(throne.id);                     // 200
            return result;                                             // 201
        }                                                              //
    },                                                                 //
    'update/throne/poster': function (data) {                          // 204
        if (Meteor.isServer) {                                         // 205
            var result = Spaces.update(data.space_id, {                // 206
                '$set': {                                              // 207
                    'poster': data.poster,                             // 208
                    'updatedBy': this.userId,                          // 209
                    'updatedAt': new Date()                            // 210
                }                                                      //
            });                                                        //
            return result;                                             // 213
        }                                                              //
    },                                                                 //
                                                                       //
    'create/payment': function (bank) {                                // 217
        if (Meteor.isServer) {                                         // 218
            var result = Payments.insert({                             // 219
                venue_id: bank.venue_id,                               // 220
                bank_name: bank.name,                                  // 221
                account_name: bank.account,                            // 222
                account_number: bank.number,                           // 223
                createdBy: this.userId,                                // 224
                createdAt: new Date()                                  // 225
            });                                                        //
            return result;                                             // 227
        }                                                              //
    },                                                                 //
    'update/payment': function (bank) {                                // 230
        if (Meteor.isServer) {                                         // 231
            var result = Payments.update(bank.payment_id, {            // 232
                '$set': {                                              // 233
                    'bank_name': bank.name,                            // 234
                    'account_name': bank.account,                      // 235
                    'account_number': bank.number,                     // 236
                    'updatedBy': this.userId,                          // 237
                    'updatedAt': new Date()                            // 238
                }                                                      //
            });                                                        //
            return result;                                             // 241
        }                                                              //
    },                                                                 //
    'delete/payment': function (payment) {                             // 244
        if (Meteor.isServer) {                                         // 245
            var result = Payments.remove(payment.id);                  // 246
            return result;                                             // 247
        }                                                              //
    },                                                                 //
    'update/user/profile': function (user) {                           // 250
        if (Meteor.isServer) {                                         // 251
            var result = Meteor.users.update({                         // 252
                '_id': this.userId                                     // 253
            }, {                                                       //
                '$set': {                                              // 255
                    'profile.name': user.name,                         // 256
                    'profile.location': user.location,                 // 257
                    'profile.position': user.position,                 // 258
                    'profile.company': user.company,                   // 259
                    'profile.bio': user.bio                            // 260
                }                                                      //
            });                                                        //
            return result;                                             // 263
        }                                                              //
    },                                                                 //
    'booking/space': function (space) {                                // 266
        if (Meteor.isServer) {                                         // 267
            var result = Bookings.insert({                             // 268
                space_id: space.id,                                    // 269
                date: space.date,                                      // 270
                duration: space.duration,                              // 271
                amount: space.amount,                                  // 272
                type: space.type,                                      // 273
                createdBy: this.userId,                                // 274
                createdAt: new Date()                                  // 275
            });                                                        //
            return result;                                             // 277
        }                                                              //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=methods.js.map
