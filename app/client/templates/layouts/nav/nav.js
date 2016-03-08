spaceIDs = new ReactiveVar();
/*****************************************************************************/
/* Nav: Event Handlers */
/*****************************************************************************/
Template.Nav.events({
    "click a": function(event, template) {
        event.preventDefault();
        var url = event.currentTarget.getAttribute("href");
        if(url == null){
            $('.navbar-toggle').click();
        }
        else if(url == "/logout"){
            Meteor.logout(function(err){
                Router.go('home');
            });
        }
        else if (url){
            Router.go(url);
        }
    },
    "click #callLoginModalButton": function(event, template) {
        event.preventDefault();
        $("#Login").remove();
        Blaze.render(Template.Login,document.body)
        $("#Login").modal("show");
    },
    'click #systemLogoutButton': function(event) {
        Meteor.logout(function(err){
            if (err) {
                console.log("Login has failed.");
            }
        });
    },
    "submit .search-form": function (event) {
        event.preventDefault();
        var keyword = $('input[name=search-nav-text]').val();
        var search = {
            index: 'cowscastle',
            type: 'space',
            query: {
                match: {
                    _all: keyword
                }
            }
        }
        Meteor.call('elastic/search',search,function(err,resp){
            var ids = _.map(resp,function(item){return item._id});
            spaceIDs.set(ids);
            Router.go('search', {keyword:keyword});
        });
    }
});

/*****************************************************************************/
/* Nav: Helpers */
/*****************************************************************************/
Template.Nav.helpers({
    atHome:function(){
        var routeName = Router.current().route.getName();
        if(routeName === 'home')
            return true;
        else
        return false;
    },
    searchFor:function(){
        var keyword = '';
        if(Router.current().data() && Router.current().data().keyword !='')
            keyword = Router.current().data().keyword;
        return keyword;
    },

});

/*****************************************************************************/
/* Nav: Lifecycle Hooks */
/*****************************************************************************/
Template.Nav.onCreated(function () {
});

Template.Nav.onRendered(function () {

    Tracker.autorun(function(){
        var routeName = Router.current().route.getName();
        if (routeName){
            if(routeName === 'home'){
                activate('white');
            }
            else{
                activate('orange');
            }
        }
    });

});

Template.Nav.onDestroyed(function () {
});

/*****************************************************************************/
/* Nav: ANIMATE ON SCROLL */
/*****************************************************************************/
$(window).scroll(function() {
  var routeName = Router.current().route.getName();
  switch(routeName){
    case 'home':
      if($(this).scrollTop() > 300) {
        activate('orange');
      } else {
        activate('white');
      }
      break;
    case 'space':
      bookingBox($(this).scrollTop());
      break;
  }
});


/*****************************************************************************/
/* Nav: UTIL FUNCTION */
/*****************************************************************************/
function activate(action){
  switch(action){
    case "orange":
      $('.navbar-fixed-top').addClass('opaque');
      $('.icon-bar').removeClass('white-icon-bar');
      $('.icon-bar').addClass('orange-icon-bar');
      $('.icon-cowscastle').removeClass('logo-white');
      $('.icon-cowscastle').addClass('logo-orange');

      $('.cowscastle-title').removeClass('title-white');
      $('.cowscastle-title').addClass('title-orange');

      $('.login-btn').removeClass('border-white-text-white');
      $('.login-btn').addClass('border-orange-text-orange');

      $('.navbar-toggle').removeClass('white-navbar-toggle');
      $('.navbar-toggle').addClass('orange-navbar-toggle');


      $('.got-space-btn').removeClass('border-less-text-white');
      $('.got-space-btn').addClass('border-less-text-orange');
      break;
    case "white":
      $('.navbar-fixed-top').removeClass('opaque');
      $('.icon-bar').removeClass('orange-icon-bar');
      $('.icon-bar').addClass('white-icon-bar');
      $('.icon-cowscastle').removeClass('logo-orange');
      $('.icon-cowscastle').addClass('logo-white');

      $('.cowscastle-title').removeClass('title-orange');
      $('.cowscastle-title').addClass('title-white');

      $('.login-btn').removeClass('border-orange-text-orange');
      $('.login-btn').addClass('border-white-text-white');

      $('.navbar-toggle').removeClass('orange-navbar-toggle');
      $('.navbar-toggle').addClass('white-navbar-toggle');


      $('.got-space-btn').removeClass('border-less-text-orange');
      $('.got-space-btn').addClass('border-less-text-white');
      break;
  }
}

function bookingBox(scroll){
    if (scroll > 270) {
        $('.booking-box').addClass('fixed-booking-box');
    }
    else{
        $('.booking-box').removeClass('fixed-booking-box');
    }
}
