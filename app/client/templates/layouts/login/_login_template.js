/*****************************************************************************/
/* LoginTemplate: Event Handlers */
/*****************************************************************************/
Template.LoginTemplate.events({
  "click #facebookLoginButton": function(event, template) {
    event.preventDefault();
    Meteor.loginWithFacebook({}, function(err){
        if (err) {
            console.log("Facebook login didn't work!",err);
        }else{
            console.log("Facebook login work!");
        }
    });
  },
  // "click #githubLoginButton": function(event, template) {
  //   event.preventDefault();
  //   Meteor.loginWithGithub({}, function(err){
  //       if (err) {
  //           console.log("Github login didn't work!",err);
  //       }else{
  //           console.log("Github login work!");
  //       }
  //   });
  // },
  "click #systemSignupButton": function(event, template) {
    event.preventDefault();
    authLoginForm.set(false);
  }
});

/*****************************************************************************/
/* LoginTemplate: Helpers */
/*****************************************************************************/
Template.LoginTemplate.helpers({
});

/*****************************************************************************/
/* LoginTemplate: Lifecycle Hooks */
/*****************************************************************************/
Template.LoginTemplate.onCreated(function () {
});

Template.LoginTemplate.onRendered(function () {
});

Template.LoginTemplate.onDestroyed(function () {
});
