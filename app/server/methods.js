/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
    'elastic/search': function(search,callback){
        if (Meteor.isServer){
            if (typeof search == 'undefined') {
                search.query = {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        }
                    }
                };
            }
            var asyncdata = function(callback) {
                ES.search({
                    index: search.index,
                    type: search.type,
                    body: {
                        "query": search.query,
                    }
                }, function (err, res) {
                    var results = [];
                    try {
                        if (typeof res.hits != 'undefined') {
                            _.each(res.hits.hits, function(item) {
                                var doc = {
                                    // total: res.hits.total,
                                    _id: item._id,
                                    // space: item._source.space,
                                    // venue: item._source.venue,
                                };
                                if (typeof item._id != 'undefined') {
                                    results.push(doc);
                                }
                            });
                        }
                    }catch(err) {
                        console.log(err);
                    }
                    callback(null, results);
                });
            };
            var syncData = Meteor.wrapAsync(asyncdata);
            return syncData();
        }
    },
    'send/invitation/email': function(email){
        // if (Meteor.isServer){
        //     var result = Meteor.users.find({"profile.name": {$regex : ".*"+search.keyword+".*"}}).fetch()
        //     return result;
        // }
        if (Meteor.isServer){
            SSR.compileTemplate( 'invitaionEmail', Assets.getText( 'invitaion-email.html' ) );
            Email.send({
              to:  email.to,
              from: email.from,
              subject: email.subject,
              html: SSR.render( 'invitaionEmail', email.text )
            });
        }
    },
    'create/castle': function(venue){
        if (Meteor.isServer){
            var result = Venues.insert({
                name:venue.name,
                createdBy:this.userId,
                createdAt: new Date
            });
            if(result){
                var team = Teams.insert({
                    venue_id:result,
                    createdBy:this.userId,
                    createdAt: new Date
                });
                var staff = Staffs.insert({
                    team_id:team,
                    staff_id:this.userId,
                    role:'owner',
                    accepted:true,
                    createdBy:this.userId,
                    createdAt: new Date
                });
            }
            return result;
        }
    },
    'update/castle/location': function(location){
        if (Meteor.isServer){
            var result = Venues.update(location.venue_id,{
                '$set': {
                    'location.address': location.address,
                    'location.latlng': location.latlng,
                    'location.district': location.district,
                    'location.city': location.city,
                    'location.province': location.province,
                    'location.zipcode': location.zipcode,
                    'location.phone': location.phone,
                    'location.email': location.email,
                    'location.website': location.website,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
    'update/castle/detail': function(detail){
        if (Meteor.isServer){
            var result = Venues.update(detail.venue_id,{
                '$set': {
                    'name': detail.name,
                    'detail.slogan': detail.slogan,
                    'detail.description': detail.description,
                    'detail.floors': detail.floors,
                    'detail.areas': detail.areas,
                    'detail.rooms': detail.rooms,
                    'detail.desks': detail.desks,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
    'update/castle/logo': function(detail){
        if (Meteor.isServer){
            var result = Venues.update(detail.venue_id,{
                '$set': {
                    'logo': detail.logo,
                }
            });
            return result;
        }
    },
    'update/castle/gallery': function(data){
        if (Meteor.isServer){
            var result = Venues.update(data.venue_id,{
                '$set': {
                    'gallery': data.gallery,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
    'update/castle/facility': function(data){
        if (Meteor.isServer){
            var result = Venues.update(data.venue_id,{
                '$set': {
                    'facility': data.facility,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
    'delete/castle': function(castle){
      if (Meteor.isServer){
        var result = Venues.remove(castle.id);
        return result;
      }
    },
    'create/throne': function(space){
        if (Meteor.isServer){
            var result = Spaces.insert({
                venue_id:space.venue,
                name:space.name,
                createdBy:this.userId,
                createdAt: new Date
            });
            return result;
        }
    },
    'update/throne/detail': function(space){
        if (Meteor.isServer){
            var result = Spaces.update(space.space_id,{
                '$set': {
                    'instant':space.instant,
                    'type':space.type,
                    'name':space.name,
                    'quantity':space.quantity,
                    'detail':space.detail,
                    'per_hour':space.per_hour,
                    'per_day':space.per_day,
                    'per_month':space.per_month,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
    'delete/throne': function(throne){
      if (Meteor.isServer){
        var result = Spaces.remove(throne.id);
        return result;
      }
    },
    'update/throne/poster': function(data){
        if (Meteor.isServer){
            var result = Spaces.update(data.space_id,{
                '$set': {
                    'poster': data.poster,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },

    'create/payment': function(bank){
        if (Meteor.isServer){
            var result = Payments.insert({
                venue_id:bank.venue_id,
                bank_name:bank.name,
                account_name:bank.account,
                account_number:bank.number,
                createdBy:this.userId,
                createdAt: new Date
            });
            return result;
        }
    },
    'update/payment': function(bank){
        if (Meteor.isServer){
            var result = Payments.update(bank.payment_id,{
                '$set': {
                    'bank_name':bank.name,
                    'account_name':bank.account,
                    'account_number':bank.number,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
    'delete/payment': function(payment){
      if (Meteor.isServer){
        var result = Payments.remove(payment.id);
        return result;
      }
    },
    'update/user/profile': function(user) {
        if (Meteor.isServer){
            var result = Meteor.users.update({
                '_id': this.userId
            }, {
                '$set': {
                    'profile.name': user.name,
                    'profile.location': user.location,
                    'profile.position': user.position,
                    'profile.company': user.company,
                    'profile.bio': user.bio,
                }
            });
            return result;
        }
    },
    'booking/space': function(space){
        if (Meteor.isServer){
            var result = Bookings.insert({
                space_id:space.id,
                date:space.date,
                duration:space.duration,
                amount:space.amount,
                type:space.type,
                createdBy:this.userId,
                createdAt: new Date
            });
            return result;
        }
    },

    'confirmed/booking': function(booking){
        if (Meteor.isServer){
            var result = Bookings.update(booking.id,{
                '$set': {
                    'confirm': true,
                    'updatedBy':this.userId,
                    'updatedAt': new Date
                }
            });
            return result;
        }
    },
});
