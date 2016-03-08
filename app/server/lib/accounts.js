// Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});

AccountsTemplates.configure({
    enablePasswordChange: true,
    enforceEmailVerification: true,
    sendVerificationEmail: true,
    showForgotPasswordLink: true,
    reCaptcha: {
        secretKey: "6LeFchMTAAAAABXOY-IBBQScpa2UsXswtQodAPAM"
    }
});


Accounts.emailTemplates.verifyEmail = {
   subject: function(user) {
      return "Cowscastle Accounts verifying";
   },
   text: function(user, url) {
       var greeting = (user.profile && user.profile.name) ?
           ("Hello " + user.profile.name + ",") : "Hello,";
       return greeting + "\n"
              + "\n"
              + "<h1>Cowscastle</h1>.\n"
              + "<h3>Welcome to Cowscastle!</h3>.\n"
              + "To get started, you need to verify your email address.\n"
              + "\n"
              + "<a href='"+url+"'>Verify Email</a>\n"
              + "\n"
              + "You can also verify using this link:\n"
              + url + "\n"
              + "\n"
              + "Verifying your email is the first step to book castle!\n";
              + "\n"
              + "Thanks,";
              + "The Cowscastle Team";
   }
}

AccountsMeld.configure({
    askBeforeMeld: false
});

// Accounts.onCreateUser(function(options, user) {
//     console.log('options ====>', options);
//     console.log('user ====>', user);

//     // return false;
//     if (options.profile){
//         user.profile = options.profile;
//     }

//     try {
//         if (!user.emails){ user.emails = []}
//         if (user.services.facebook.email) {
//             user.emails.push({
//                 'address': user.services.facebook.email,
//                 'verified': false
//             });
//         }
//     } catch(ex){ console.log("Get facebook email error", ex);}


//     console.log('=================================================================');
//     console.log('user ====>', user);
//     return user;
// });
