/*****************************************************************************/
/* SignupTemplate: Event Handlers */
/*****************************************************************************/
Template.SignupTemplate.events({
  "click #facebookSignupButton": function(event, template) {
    event.preventDefault();
    Meteor.loginWithFacebook({}, function(err){
        if (err) {
            console.log("Facebook login didn't work!",err);
        }else{
            console.log("Facebook login work!");
        }
    });
  },
  "click #githubSignupButton": function(event, template) {
    event.preventDefault();
    Meteor.loginWithGithub({}, function(err){
        if (err) {
            console.log("Github login didn't work!",err);
        }else{
            console.log("Github login work!");
        }
    });
  },
  "click #systemLoginButton": function(event, template) {
    event.preventDefault();
    authLoginForm.set(true);
  },
  'submit form': function(event) {
      event.preventDefault();
      var fullname = event.target.fullname.value;
      var email = event.target.email.value;
      var password = event.target.password.value;
      var user_data = {
        fullname:fullname,
        email:email,
        password:password
      }
      console.log("Form submitted.",user_data);
  }
});

/*****************************************************************************/
/* SignupTemplate: Helpers */
/*****************************************************************************/
Template.SignupTemplate.helpers({
});

/*****************************************************************************/
/* SignupTemplate: Lifecycle Hooks */
/*****************************************************************************/
Template.SignupTemplate.onCreated(function () {
});

Template.SignupTemplate.onRendered(function () {
});

Template.SignupTemplate.onDestroyed(function () {
});
