(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/lib/accounts.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
// Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
                                                                       //
AccountsTemplates.configure({                                          // 3
    enablePasswordChange: true,                                        // 4
    enforceEmailVerification: true,                                    // 5
    sendVerificationEmail: true,                                       // 6
    showForgotPasswordLink: true,                                      // 7
    reCaptcha: {                                                       // 8
        secretKey: "6LeFchMTAAAAABXOY-IBBQScpa2UsXswtQodAPAM"          // 9
    }                                                                  //
});                                                                    //
                                                                       //
Accounts.emailTemplates.verifyEmail = {                                // 14
    subject: function (user) {                                         // 15
        return "Cowscastle Accounts verifying";                        // 16
    },                                                                 //
    text: function (user, url) {                                       // 18
        var greeting = user.profile && user.profile.name ? "Hello " + user.profile.name + "," : "Hello,";
        return greeting + "\n" + "\n" + "<h1>Cowscastle</h1>.\n" + "<h3>Welcome to Cowscastle!</h3>.\n" + "To get started, you need to verify your email address.\n" + "\n" + "<a href='" + url + "'>Verify Email</a>\n" + "\n" + "You can also verify using this link:\n" + url + "\n" + "\n" + "Verifying your email is the first step to book castle!\n";
        +"\n" + "Thanks,";                                             // 33
        +"The Cowscastle Team";                                        // 35
    }                                                                  //
};                                                                     //
                                                                       //
AccountsMeld.configure({                                               // 39
    askBeforeMeld: false                                               // 40
});                                                                    //
                                                                       //
// Accounts.onCreateUser(function(options, user) {                     //
//     console.log('options ====>', options);                          //
//     console.log('user ====>', user);                                //
                                                                       //
//     // return false;                                                //
//     if (options.profile){                                           //
//         user.profile = options.profile;                             //
//     }                                                               //
                                                                       //
//     try {                                                           //
//         if (!user.emails){ user.emails = []}                        //
//         if (user.services.facebook.email) {                         //
//             user.emails.push({                                      //
//                 'address': user.services.facebook.email,            //
//                 'verified': false                                   //
//             });                                                     //
//         }                                                           //
//     } catch(ex){ console.log("Get facebook email error", ex);}      //
                                                                       //
//     console.log('=================================================================');
//     console.log('user ====>', user);                                //
//     return user;                                                    //
// });                                                                 //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=accounts.js.map
