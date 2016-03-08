(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/posters.js                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var csPoster = new FS.Store.GridFS("Posters");                         // 1
Posters = new FS.Collection("Posters", {                               // 2
    stores: [csPoster]                                                 // 3
});                                                                    //
if (Meteor.isServer) {                                                 // 5
    Posters.allow({                                                    // 6
        insert: function (userId, doc) {                               // 7
            return true;                                               // 8
        },                                                             //
        update: function (userId, doc, fieldNames, modifier) {         // 10
            return true;                                               // 11
        },                                                             //
        remove: function (userId, doc) {                               // 13
            return true;                                               // 14
        },                                                             //
        download: function () {                                        // 16
            return true;                                               // 17
        }                                                              //
    });                                                                //
                                                                       //
    Posters.deny({                                                     // 21
        insert: function (userId, doc) {                               // 22
            return false;                                              // 23
        },                                                             //
        update: function (userId, doc, fieldNames, modifier) {         // 25
            return false;                                              // 26
        },                                                             //
        remove: function (userId, doc) {                               // 28
            return false;                                              // 29
        },                                                             //
        download: function () {                                        // 31
            return false;                                              // 32
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=posters.js.map
