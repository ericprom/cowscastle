(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/config/account.js                                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Document : https://github.com/meteor-useraccounts/core/blob/master/Guide.md#configuring-texts
 */                                                                    //
                                                                       //
AccountsTemplates.configure({                                          // 5
    reCaptcha: {                                                       // 6
        siteKey: "6LeFchMTAAAAAIzyAaCTNvb-2qo68gpWm7c6hNsJ",           // 7
        theme: "light",                                                // 8
        data_type: "image"                                             // 9
    },                                                                 //
    showReCaptcha: true,                                               // 11
    /**                                                                //
     * Terms & privacy                                                 //
     */                                                                //
    privacyUrl: '/privacy',                                            // 15
    termsUrl: '/terms',                                                // 16
    hideSignInLink: true,                                              // 17
    hideSignUpLink: true,                                              // 18
    /**                                                                //
     * Validation                                                      //
     */                                                                //
    // forbidClientAccountCreation: true,                              //
    negativeFeedback: true,                                            // 23
    positiveFeedback: true,                                            // 24
    negativeValidation: true,                                          // 25
    positiveValidation: true,                                          // 26
    showValidating: true,                                              // 27
                                                                       //
    /**                                                                //
     * Custom text                                                     //
     */                                                                //
    texts: {                                                           // 32
        socialSignUp: "Sign Up",                                       // 33
        inputIcons: {                                                  // 34
            isValidating: "fa fa-spinner fa-spin",                     // 35
            hasSuccess: "fa fa-check",                                 // 36
            hasError: "fa fa-times"                                    // 37
        },                                                             //
        errors: {                                                      // 39
            loginForbidden: "Please check your username & password again",
            mustBeLoggedIn: "Please sign in."                          // 41
        }                                                              //
    },                                                                 //
                                                                       //
    /**                                                                //
     * Otherwise                                                       //
     */                                                                //
    homeRoutePath: '/dashboard',                                       // 48
    redirectTimeout: 4000                                              // 49
});                                                                    //
                                                                       //
/**                                                                    //
 * Custom fields                                                       //
 */                                                                    //
AccountsTemplates.addFields([{                                         // 55
    _id: 'name',                                                       // 56
    type: 'text',                                                      // 57
    displayName: 'Full name',                                          // 58
    placeholder: 'Full name',                                          // 59
    required: true,                                                    // 60
    minLength: 6,                                                      // 61
    re: /.{6,}/,                                                       // 62
    errStr: 'Please input at least 6 characters'                       // 63
}]);                                                                   //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=account.js.map
