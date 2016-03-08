(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/logos.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var csLogo = new FS.Store.GridFS("Logos");                             // 1
Logos = new FS.Collection("Logos", {                                   // 2
    stores: [csLogo]                                                   // 3
});                                                                    //
if (Meteor.isServer) {                                                 // 5
    Logos.allow({                                                      // 6
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
    Logos.deny({                                                       // 21
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

//# sourceMappingURL=logos.js.map
