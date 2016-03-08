/*****************************************************************************/
/* Sidebar: Event Handlers */
/*****************************************************************************/
Template.Sidebar.events({
});

/*****************************************************************************/
/* Sidebar: Helpers */
/*****************************************************************************/
Template.Sidebar.helpers({
});

/*****************************************************************************/
/* Sidebar: Lifecycle Hooks */
/*****************************************************************************/
Template.Sidebar.onCreated(function () {
});

Template.Sidebar.onRendered(function () {
});

Template.Sidebar.onDestroyed(function () {
});

/*****************************************************************************/
/* SideList: Event Handlers */
/*****************************************************************************/
Template.SideList.events({
  "click a": function(event, template) {
    event.preventDefault();
    var url = event.currentTarget.getAttribute("href");
    if(url == "/login"){
      $("#Login").remove();
      Blaze.render(Template.Login,document.body)
      $("#Login").modal("show");
    }
    else if(url == "/logout"){
      Meteor.logout(function(err){
        if (err) {
          console.log("Logout has failed.");
        }
      });
    }
    else{
      Router.go(url);
    }
    $('.navbar-toggle').click();
  }
});

// Template._loginButtonsLoggedInDropdown.events({
//     'click #login-buttons-edit-profile': function(event) {
//         Router.go('profileEdit');
//     }
// });

// Accounts.ui.config({
//     requestPermissions: {},
//     extraSignupFields: [{
//         fieldName: 'first-name',
//         fieldLabel: 'First name',
//         inputType: 'text',
//         visible: true,
//         validate: function(value, errorFunction) {
//           if (!value) {
//             errorFunction("Please write your first name");
//             return false;
//           } else {
//             return true;
//           }
//         }
//     }, {
//         fieldName: 'last-name',
//         fieldLabel: 'Last name',
//         inputType: 'text',
//         visible: true,
//     }, {
//         fieldName: 'gender',
//         showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
//         fieldLabel: 'Gender',
//         inputType: 'radio',
//         radioLayout: 'vertical',    // It can be 'inline' or 'vertical'
//         data: [{                    // Array of radio options, all properties are required
//             id: 1,                  // id suffix of the radio element
//             label: 'Male',          // label for the radio element
//             value: 'm'              // value of the radio element, this will be saved.
//           }, {
//             id: 2,
//             label: 'Female',
//             value: 'f',
//             checked: 'checked'
//         }],
//         visible: true
//     }, {
//         fieldName: 'country',
//         fieldLabel: 'Country',
//         inputType: 'select',
//         showFieldLabel: true,
//         empty: 'Please select your country of residence',
//         data: [{
//             id: 1,
//             label: 'United States',
//             value: 'us'
//           }, {
//             id: 2,
//             label: 'Spain',
//             value: 'es',
//         }],
//         visible: true
//     }, {
//         fieldName: 'terms',
//         fieldLabel: 'I accept the terms and conditions',
//         inputType: 'checkbox',
//         visible: true,
//         saveToProfile: false,
//         validate: function(value, errorFunction) {
//             if (value) {
//                 return true;
//             } else {
//                 errorFunction('You must accept the terms and conditions.');
//                 return false;
//             }
//         }
//     }]
// });
// accountsUIBootstrap3.setCustomSignupOptions = function() {
//     return {
//         referrerId: Session.get('referrerId') // Or whatever
//     }
// }
// accountsUIBootstrap3.logoutCallback = function(error) {
//   if(error) console.log("Error:" + error);
//   Router.go('home');
// }
// Accounts.ui.config({
//     forceEmailLowercase: true,
//     forceUsernameLowercase: true,
//     forcePasswordLowercase: true
// });

