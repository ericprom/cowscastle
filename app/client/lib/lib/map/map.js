Meteor.startup(function() {

});

CowsMap = (function(){
    var _this = this;
    _this.settings = {

    }
    _this.currentMap = new ReactiveVar();

    _this.getMap = function(_map_name){
        var map_name = _map_name || _this.currentMap.get();
        return GoogleMaps.maps[map_name] && GoogleMaps.maps[map_name].instance;
    };
    _this.getCenter = function(_map_name){
        var map = _this.getMap();
        return map.getCenter();
    };

    _this.MapOptions = function(settings){
        if (GoogleMaps.loaded()) {
            return _.extend({

                center: new google.maps.LatLng(13.746245559984903, 100.53016100155024),
                zoom: 15
            }, settings);
        }
    };

    _this.zoom = function(zoom_level){
        check(zoom_level, Number);
        _this.getMap().setZoom(zoom_level);
    }
    _this.currentPosition = function(map_name, callback) {
        if (navigator.geolocation && GoogleMaps.loaded()) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var map = _this.getMap(map_name);
                if (map){
                    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(initialLocation);
                    if (callback && typeof callback === 'function') {
                        callback(initialLocation);
                    }
                }
            });
        }
    };
    return _this;
})()
