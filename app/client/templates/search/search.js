searchResults = new ReactiveVar();
isMeeting = new ReactiveVar(false);
advanceSearch = new ReactiveVar(false);
/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
Template.Search.events({
    'click .cancel-advance-search': function(event, template){
        event.preventDefault();
        advanceSearch.set(false);
    },
    'click .advance-search': function(event, template){
        event.preventDefault();
        advanceSearch.set(true);
    },
    'click .space-type': function(event, template){
        event.preventDefault();
        var spaceId = $(event.currentTarget).attr("id");
        if(spaceId==2){
            isMeeting.set(true);
        }
        else{
            isMeeting.set(false);
        }
    },
    'click .space-list': function(event, template){
        event.preventDefault();
        var space_id =  $(event.currentTarget).attr("space-id");
        Router.go('space',{_id:space_id});
    },
});

/*****************************************************************************/
/* Search: Helpers */
/*****************************************************************************/
Template.Search.helpers({
    isAdvance: function(){
        return advanceSearch.get();
    },
    searchResults: function(){
        return searchResults.get();
    },
    theVenue: function() {
        return Venues.findOne(this.venue_id);
    },
    costPerDay: function() {
        if(this.per_day && this.per_day!=''){
            return this.per_day + " ฿/วัน";
        }
        else{
            return "0฿/วัน";
        }
    },
    getPoster: function(){
        var poster = "http://placehold.it/300x200?text="+this.type;
        if(typeof this.poster != 'undefined'){
            poster = "/cfs/files/Posters/"+this.poster;
        }
        console.log(poster);
        return poster;
    },





  spaceList: function(){
    return [
      {id:1,name:'โต๊ะทำงาน'},
      {id:2,name:'ห้องประชุม'},
      {id:3,name:'สตูดิโอ'}
    ];
  },
  typeList: function(){
    return [
      {id:1,name:'รายชั่วโมง'},
      {id:2,name:'รายวัน'},
      {id:3,name:'รายเดือน'}
    ];
  },
  forMeeting: function(){
    return isMeeting.get();
  },
  capacityList: function(){
    return [
      {id:1,name:'1 คน'},
      {id:2,name:'2 คน'},
      {id:3,name:'3 คน'},
      {id:4,name:'4 คน'},
      {id:5,name:'5 คน'},
      {id:6,name:'6 คน'},
      {id:6,name:'7 คน'},
      {id:8,name:'8 คน'},
      {id:9,name:'9 คน'},
      {id:10,name:'10+ คน'}
    ];
  },
  capacityAttributes: function(){
    var list = [
      {id:1,name:'1 คน'},
      {id:2,name:'2 คน'},
      {id:3,name:'3 คน'},
      {id:4,name:'4 คน'},
      {id:5,name:'5 คน'},
      {id:6,name:'6 คน'},
      {id:6,name:'7 คน'},
      {id:8,name:'8 คน'},
      {id:9,name:'9 คน'},
      {id:10,name:'10+ คน'}
    ];
    return {
      value: this.id,
      selected: _.contains(list, this.id)?'selected': null
    }
  },
});

/*****************************************************************************/
/* Search: Lifecycle Hooks */
/*****************************************************************************/
Template.Search.onCreated(function () {
});

Template.Search.onRendered(function () {
    // GoogleMaps.init(
    //     {
    //         // 'sensor': true, //optional
    //         // 'key': 'MY-GOOGLEMAPS-API-KEY', //optional
    //         // 'language': 'en' //optional
    //     },
    //     function(){
    //         var mapOptions = {
    //             zoom: 13,
    //             mapTypeId: google.maps.MapTypeId.SATELLITE
    //         };
    //         map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    //         map.setCenter(new google.maps.LatLng( 35.363556, 138.730438 ));
    //     }
    // );

     $("#price-range").slider({
        range: true,
        min: 10,
        max: 50000,
        step: 100,
        values: [200, 20000],
        slide: function (e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if (hours1.length == 1) hours1 = '0' + hours1;
            if (minutes1.length == 1) minutes1 = '0' + minutes1;
            if (minutes1 == 0) minutes1 = '00';
            if (hours1 >= 12) {
                if (hours1 == 12) {
                    hours1 = hours1;
                    minutes1 = minutes1 + " PM";
                } else {
                    hours1 = hours1 - 12;
                    minutes1 = minutes1 + " PM";
                }
            } else {
                hours1 = hours1;
                minutes1 = minutes1 + " AM";
            }
            if (hours1 == 0) {
                hours1 = 12;
                minutes1 = minutes1;
            }
            //$('.opening-time').html(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if (hours2.length == 1) hours2 = '0' + hours2;
            if (minutes2.length == 1) minutes2 = '0' + minutes2;
            if (minutes2 == 0) minutes2 = '00';
            if (hours2 >= 12) {
                if (hours2 == 12) {
                    hours2 = hours2;
                    minutes2 = minutes2 + " PM";
                } else if (hours2 == 24) {
                    hours2 = 11;
                    minutes2 = "59 PM";
                } else {
                    hours2 = hours2 - 12;
                    minutes2 = minutes2 + " PM";
                }
            } else {
                hours2 = hours2;
                minutes2 = minutes2 + " AM";
            }

            //$('.closing-time').html(hours2 + ':' + minutes2);
        }
    });
});

Template.Search.onDestroyed(function () {
});

Tracker.autorun(function(){
    var ids = spaceIDs.get();
    if(ids!=null && ids.length>0){
        var space = Spaces.find({_id: {$in: ids}}).fetch();
        searchResults.set(space)
    }
    else{
        searchResults.set([]);
    }
});
