/*****************************************************************************/
/* Space: Event Handlers */
/*****************************************************************************/
Template.Space.events({
  "click #bookDateButton": function(event, template) {
    event.preventDefault();
    $("#Bookingboxmodal").remove();
    var space = Spaces.findOne(this.id);
    Blaze.renderWithData(Template.Bookingboxmodal,space,document.body);
    $("#Bookingboxmodal").modal("show");
  }
});

/*****************************************************************************/
/* Space: Helpers */
/*****************************************************************************/
Template.Space.helpers({
    Space: function(){
        var space = Spaces.findOne(this.id);
        if(space){
            return space;
        }
        else{
            Router.go('home');
        }
    },
    theAddress: function(space) {
        var venue = Venues.findOne(space.venue_id);
        var data = venue.location.address+" "+
        venue.location.district+" "+
        venue.location.city+" "+
        venue.location.province+" "+
        venue.location.zipcode;
        return data;
    },
    theVenue: function(space) {
        var venue = Venues.findOne(space.venue_id);
        return venue.name;
    },
    isOpen: function(){
        return "Open Today";
    },
    getPoster: function(){
        var space = Spaces.findOne(this.id);
        var poster = "http://placehold.it/300x200?text="+space.type;
        if(space.poster){
            poster = "/cfs/files/Posters/"+space.poster;
        }
        return poster;
    }
});

/*****************************************************************************/
/* Space: Lifecycle Hooks */
/*****************************************************************************/
Template.Space.onCreated(function () {
});

Template.Space.onRendered(function () {
});

Template.Space.onDestroyed(function () {
});
