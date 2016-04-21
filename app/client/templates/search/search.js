searchResults = new ReactiveVar();
advanceSearch = new ReactiveVar(false);
searchType = new ReactiveVar({});
searchPrice = new ReactiveVar({});
searchProvince = new ReactiveVar({});
searchPriceFrom = new ReactiveVar();
searchPriceTo = new ReactiveVar();
searchNearby = new ReactiveVar({});
searchFacility = new ReactiveVar({});

listType = new ReactiveArray([
    {id:1,name:'โต๊ะทำงาน',active:false},
    {id:2,name:'ห้องประชุม',active:false},
    {id:3,name:'สตูดิโอ',active:false}]);
priceList = new ReactiveArray([
    {id:1,name:'รายชั่วโมง'},
    {id:2,name:'รายวัน'},
    {id:3,name:'รายเดือน'}]);
searchPriceBy = new ReactiveVar(2);
/*****************************************************************************/
/* Search: Event Handlers */
/*****************************************************************************/
Template.Search.events({
    'click .advance-search': function(event, template){
        event.preventDefault();
        advanceSearch.set(true);
    },
    'change .search-province' : function(event, template){
        event.preventDefault();
        var search_province = $('select[name=search-province]').val();
        searchProvince.set({
            "term" : { 
                "venue.location.province" : search_province
            }
        });
        elasticSearch();
    },
    'click .apply-advance-search': function(event, template){
        event.preventDefault();

        $nearby_bts = $(this).find('input[name=nearby-bts]').is(':checked');
        $nearby_mrt = $(this).find('input[name=nearby-mrt]').is(':checked');
        $has_wifi = $(this).find('input[name=has-wifi]').is(':checked');
        $has_printer = $(this).find('input[name=has-printer]').is(':checked');
        $has_locker = $(this).find('input[name=has-locker]').is(':checked');
        if($nearby_bts){
            searchNearby.set({
                "term" : { 
                    "venue.detail.nearby" : "BTS"
                }
            });
        }
        if($nearby_mrt){
            searchNearby.set({
                "term" : { 
                    "venue.detail.nearby" : "MRT"
                }
            });
        }
        if($has_wifi){
            searchFacility.set({
                "term" : { 
                    "venue.facility" : "WiFi"
                }
            });
        }

        elasticSearch();
        advanceSearch.set(false);
    },
    'click .cancel-advance-search': function(event, template){
        event.preventDefault();
        advanceSearch.set(false);
    },
    'click .space-type': function(event, template){
        event.preventDefault();
        var typeId = $(event.currentTarget).attr("id");
        searchType.set({})
        switch(typeId){
            case "1":
            case 1:
                searchType.set({
                    "term" : { 
                        "space.type" : "share"
                    }
                });
                break;
            case "2":
            case 2:
                searchType.set({
                    "term" : { 
                        "space.type" : "meeting"
                    }
                });
                break;
            case "3":
            case 3:
                searchType.set({
                    "term" : { 
                        "space.type" : "studio"
                    }
                });
                break;
        }
        elasticSearch();
    },
    'click .price-type': function(event, template){
        event.preventDefault();
        var priceId = $(event.currentTarget).attr("id");
        searchPriceBy.set(priceId);
        searchPrice.set({})
        switch(priceId){
            case "1":
            case 1:
                searchPrice.set({
                    "range": {
                        "space.per_hour": {
                            "from":searchPriceFrom.get(),
                            "to":searchPriceTo.get()
                        }
                    }
                });
                break;
            case "2":
            case 2:
                searchPrice.set({
                    "range": {
                        "space.per_day": {
                            "from":searchPriceFrom.get(),
                            "to":searchPriceTo.get()
                        }
                    }
                });
                break;
            case "3":
            case 3:
                searchPrice.set({
                    "range": {
                        "space.per_month": {
                            "from":searchPriceFrom.get(),
                            "to":searchPriceTo.get()
                        }
                    }
                });
                break;
        }
        console.log(searchPrice.get());
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
        return poster;
    },

    spaceType: function(){
        return listType.array();
    },
    isTypeActive:function(){
        var status = 'btn-default';
        if(this.active){
            status = 'btn-primary';
        }
        return status
    },
    priceType: function(){
        return priceList.array();
    },
    provinceList: function(){
        var province = ["กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา" ,"ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา" ,"นครศรีธรรมราช","นครสวรรค์","นนทบุรี","นราธิวาส","น่าน","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี" ,"พะเยา","พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน" ,"ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา" ,"สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี" ,"สุรินทร์","หนองคาย","หนองบัวลำภู","อยุธยา","อ่างทอง","อำนาจเจริญ","อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี"];
        return province;
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
        values: [100, 10000],
        slide: function (e, ui) {
            $('.from-price').html(ui.values[0]);
            searchPriceFrom.set(ui.values[0]);
            $('.to-price').html(ui.values[1]);
            searchPriceTo.set(ui.values[1]);
            switch(searchPriceBy.get()){
                case "1":
                case 1:
                    searchPrice.set({
                        "range": {
                            "space.per_hour": {
                                "from":searchPriceFrom.get(),
                                "to":searchPriceTo.get()
                            }
                        }
                    });
                    break;
                case "2":
                case 2:
                    searchPrice.set({
                        "range": {
                            "space.per_day": {
                                "from":searchPriceFrom.get(),
                                "to":searchPriceTo.get()
                            }
                        }
                    });
                    break;
                case "3":
                case 3:
                    searchPrice.set({
                        "range": {
                            "space.per_month": {
                                "from":searchPriceFrom.get(),
                                "to":searchPriceTo.get()
                            }
                        }
                    });
                    break;
            }
            
            setTimeout(function(){
               elasticSearch();
            }, 1000);
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
function elasticSearch(){
    var keyword = '';
    if(Router.current().data() && Router.current().data().keyword !='')
        keyword = Router.current().data().keyword;
    var search_space_type = searchType.get();
    var search_by_province = searchProvince.get();
    var search_price_range = searchPrice.get();
    var search_nearby_place = searchNearby.get();
    var search_by_facility = searchFacility.get();
    var search = {
        index: 'cowscastle',
        type: 'space',
        query: {
            "filtered": {
                "query":  { 
                    "match": { 
                        _all:{
                          "query": keyword,
                          "analyzer": "thai"
                        },
                    }
                },
                "filter": { 
                    "bool" : {
                        "must" : [
                            search_space_type,
                            search_by_province,
                            search_price_range,
                            search_nearby_place,
                            search_by_facility
                        ]
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
}
