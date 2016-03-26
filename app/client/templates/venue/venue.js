venueFacility = new ReactiveArray();
openCloseTime = new ReactiveArray();
/*****************************************************************************/
/* Venue: Event Handlers */
/*****************************************************************************/
Template.Venue.events({
    'click .space-list': function(event, template){
        event.preventDefault();
        var space_id =  $(event.currentTarget).attr("space-id");
        Router.go('space',{_id:space_id});
    },
    'click .space-booking-btn': function(event, template){
        event.preventDefault();
        var space_id =  $(event.currentTarget).attr("space-id");
        var space = Spaces.findOne(space_id);
        var venue = Venues.findOne(space.venue_id);
        if(space.instant){
            Router.go('space',{_id:space_id});
        }
        else{
            toastr.info('สอบถาม '+venue.name+' เพื่อจองสถานที่', 'Cows Castle');
        }
    },
});

/*****************************************************************************/
/* Venue: Helpers */
/*****************************************************************************/
Template.Venue.helpers({
    Venue: function(){
        var venue = Venues.findOne(this.id);
        if(venue){
            venueFacility.clear();
            if(venue.facility){
                for (var i = 0; i < venue.facility.length; i++) {
                    venueFacility.push(venue.facility[i]);
                };
            }
            return venue;
        }
        else{
            Router.go('home');
        }
    },
    SpaceLists: function() {
        return Spaces.find({venue_id:this.id});
    },
    theVenue: function() {
        return Venues.findOne(this.venue_id);
    },
    theAddress: function(location) {
        var data = location.address+" "+
        location.district+" "+
        location.city+" "+
        location.province+" "+
        location.zipcode;
        return data;
    },
    openning: function(){
        var venue = Venues.findOne(this.id);
        openCloseTime.clear();
        var day = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'];
        if(venue.detail.openhour){
            for (var i = 0; i < venue.detail.openhour.length; i++) {
                if(venue.detail.openhour[i].status){
                    openCloseTime.push({day:day[venue.detail.openhour[i].day],time:venue.detail.openhour[i].time});
                }

            };
        }
        return openCloseTime.array();
    },
    getCover: function(){
        var venue = Venues.findOne(this.id);
        var gallery = "http://lorempixel.com/1024/600";
        if(venue.gallery.length > 0){
            gallery = "/cfs/files/Galleries/"+venue.gallery[0].path;
        }
        return gallery;
    },
    getPoster: function(){
        var poster = "http://placehold.it/300x200?text="+this.type;
        if(this.poster){
            poster = "/cfs/files/Posters/"+this.poster;
        }
        return poster;
    },
    BookingButton: function(){
        var status = {
            state:'btn-info',
            icon:'fa-send-o',
            text:'ส่งคำขอ'
        };
        if(this.instant){
            status.state = 'btn-primary',
            status.icon = 'fa-bolt';
            status.text = 'จองเลย';
        }
        return status;
    },
    facilityList: function(){
        var amenity = [
            {id:'1',name:'อินเตอร์เน็ต WiFi', icon:'fa-wifi'},
            {id:'2',name:'พื้นที่จัดงานอีเว้น', icon:'fa-check-square-o'},
            {id:'3',name:'มุมผ่อนคลาย', icon:'fa-gamepad'},
            {id:'4',name:'กาแฟ, ชา, และของกินเล่น', icon:'fa-check-square-o'},
            {id:'5',name:'เครื่องปริ้น', icon:'fa-print'},
            {id:'6',name:'นำสัตว์เลี้ยวมาได้', icon:'fa-paw'},
            {id:'7',name:'สตูดิโอถ่ายรูป', icon:'fa-check-square-o'},
            {id:'8',name:'โต๊ะเขียนแบบ', icon:'fa-check-square-o'},
            {id:'9',name:'ติดกล้อง CCTV', icon:'fa-check-square-o'},
            {id:'10',name:'ห้องครัว', icon:'fa-cutlery'},
            {id:'11',name:'เข้าออกได้ 24 ชั่วโมง', icon:'fa-check-square-o'},
            {id:'12',name:'ล็อกเกอร์เก็บของ', icon:'fa-key'}];
        var facility = [];
            for (var i = 0; i < venueFacility.array().length; i++) {
                if(venueFacility.array()[i].status){
                    facility.push(amenity[i]);
                }
            };

        return facility;
    },
    hasFacility:function(){
        var count = 0;
        for (var i = 0; i < venueFacility.array().length; i++) {
            if(venueFacility.array()[i].status){
                count+=1;
            }
        };
        return (count>=1)?true:false;
    },
    hasFloor:function(floor){
        var data = '';
        if(floor!=''){
            data = "จำนวนชั้น: "+ floor+" ชั้น";
        }
        return data;
    },
    hasArea:function(area){
        var data = '';
        if(area!=''){
            data = "ขนาดพื้นที่: "+ area+" ตรม.";
        }
        return data;
    },
    hasRoom:function(room){
        var data = '';
        if(room!=''){
            data = "จำนวนห้อง: "+ room+" ห้อง";
        }
        return data;
    },
    hasDesk:function(desk){
        var data = '';
        if(desk!=''){
            data = "จำนวนโต๊ะ: "+ desk+" โต๊ะ";
        }
        return data;
    }
});

/*****************************************************************************/
/* Venue: Lifecycle Hooks */
/*****************************************************************************/
Template.Venue.onCreated(function () {
});

Template.Venue.onRendered(function () {

});

Template.Venue.onDestroyed(function () {
});
