searchResults = new ReactiveVar();
isMeeting = new ReactiveVar(false);
advanceSearch = new ReactiveVar(false);
/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
Template.Search.events({
    'click .advance-search': function(event, template){
        event.preventDefault();
        advanceSearch.set(true);
    },
    'click .apply-advance-search': function(event, template){
        event.preventDefault();
        var keyword = '';
        if(Router.current().data() && Router.current().data().keyword !='')
            keyword = Router.current().data().keyword;
        var search = {
            index: 'cowscastle',
            type: 'space',
            query: {
                "filtered": {
                    "query":  { 
                        "match": { 
                            "_all": keyword
                        }
                    },
                    "filter": { 
                        "term": { 
                            "space.type": "Studio" 
                        }
                    }
                }
            }
        }
        console.log(search);
        Meteor.call('elastic/search',search,function(err,resp){
            var ids = _.map(resp,function(item){return item._id});
            console.log(ids);
            spaceIDs.set(ids);
        });
        advanceSearch.set(false);
    },
    'click .cancel-advance-search': function(event, template){
        event.preventDefault();
        advanceSearch.set(false);
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
    }
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
  provinceList: function(){
    var province = ["กระบี่","กรุงเทพมหานคร","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา" ,"ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา" ,"นครศรีธรรมราช","นครสวรรค์","นนทบุรี","นราธิวาส","น่าน","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี" ,"พะเยา","พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน" ,"ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา" ,"สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี" ,"สุรินทร์","หนองคาย","หนองบัวลำภู","อยุธยา","อ่างทอง","อำนาจเจริญ","อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี"];
    return province;
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
        min: 100,
        max: 50000,
        step: 100,
        values: [200, 20000],
        slide: function (e, ui) {
            $('.from-price').html(ui.values[0]);
            $('.to-price').html(ui.values[1]);
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
