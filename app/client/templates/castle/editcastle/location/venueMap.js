var MAP = 'venueMap';
var SESSION_NAME = 'mapAddress';
var marker = null;
var CENTER = [];
var locating = new ReactiveVar(null);

Template.venueMap.events({
    'click #use-current-location:not(.locating)': function(event, template){
        locating.set('locating');
        CowsMap.currentPosition(MAP, function(position){
            locating.set(null);
            markCurrent(position);
        });
    }
})

Template.venueMap.helpers({
    isShowButton: function(){
        var status = '';
        switch(Router.current().route.getName()){
            case "venue":
            case "space":
                status = 'hidden';
                break;
        }
        return status;
    },
    locatingClass: function(){
        return locating.get()
    },
    locating: function(){
        return locating.get() === 'locating';
    },
    mapName: MAP,
    mapOptions: CowsMap.MapOptions
});

Template.venueMap.onCreated(function() {});
Template.venueMap.onRendered(function() {
    SESSION_NAME = this.data.session;
    CENTER = this.data.center;
    GoogleMaps.load();
    GoogleMaps.ready(MAP, function(map) {
        CowsMap.currentMap.set(MAP);
        CowsMap.zoom(15);

        var _map = CowsMap.getMap();
        try {
            _map.panTo(new google.maps.LatLng(CENTER[0], CENTER[1]));
        } catch(ex){}
        marker = new google.maps.Marker({
            position: _map.getCenter(),
            map: map.instance
        });

        _map.addListener('drag', function(){
            markCurrent(this.getCenter());
        });
    });
});
Template.venueMap.onDestroyed(function() {});

var markCurrent = function(position){
    marker.setPosition(position);
    Session.set(SESSION_NAME, position.toUrlValue().split(','))
}
