(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/bootstrap.js                                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
    process.env.MAIL_URL = "smtp://postmaster%40sandbox9fc12c0a66d0405aabd88723ea8edd75.mailgun.org:9da0a1647a4e5f4537fda529827a6e5b@smtp.mailgun.org:587";
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=bootstrap.js.map
