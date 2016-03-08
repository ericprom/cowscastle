authLoginForm = new ReactiveVar('');
/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/
Template.Login.events({
	'click .toggleLoginSignup': function(event, template){
		authLoginForm.set(!authLoginForm.get());
	},
	'click .at-terms-link': function(event, template){
		event.preventDefault();
		window.open(event.target.href);
	}
});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({
  isLoginForm : function(){
    return authLoginForm.get();
  },
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.onCreated(function () {
});

Template.Login.onRendered(function () {
  authLoginForm.set(true);
});

Template.Login.onDestroyed(function () {
});
