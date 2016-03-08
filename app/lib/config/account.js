/**
 * Document : https://github.com/meteor-useraccounts/core/blob/master/Guide.md#configuring-texts
 */

AccountsTemplates.configure({
    reCaptcha: {
        siteKey: "6LeFchMTAAAAAIzyAaCTNvb-2qo68gpWm7c6hNsJ",
        theme: "light",
        data_type: "image"
    },
    showReCaptcha: true,
    /**
     * Terms & privacy
     */
    privacyUrl: '/privacy',
    termsUrl: '/terms',
    hideSignInLink: true,
    hideSignUpLink: true,
    /**
     * Validation
     */
    // forbidClientAccountCreation: true,
    negativeFeedback: true,
    positiveFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    showValidating: true,

    /**
     * Custom text
     */
    texts: {
        socialSignUp: "Sign Up",
        inputIcons: {
            isValidating: "fa fa-spinner fa-spin",
            hasSuccess: "fa fa-check",
            hasError: "fa fa-times",
        },
        errors: {
            loginForbidden: "Please check your username & password again",
            mustBeLoggedIn: "Please sign in."
        }
    },

    /**
     * Otherwise
     */
    homeRoutePath: '/dashboard',
    redirectTimeout: 4000
});

/**
 * Custom fields
 */
AccountsTemplates.addFields([{
    _id: 'name',
    type: 'text',
    displayName: 'Full name',
    placeholder: 'Full name',
    required: true,
    minLength: 6,
    re: /.{6,}/,
    errStr: 'Please input at least 6 characters'
}]);
