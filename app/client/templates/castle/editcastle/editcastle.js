createSpace = new ReactiveVar(false);
updateSpace = new ReactiveVar(false);
spaceData = new ReactiveVar();
createAdmin = new ReactiveVar(false);
createPayment = new ReactiveVar(false);
updatePayment = new ReactiveVar(false);
paymentData = new ReactiveVar();
enableButton = new ReactiveVar(false);
logoSource = new ReactiveVar('');
posterSource = new ReactiveVar('');
photoGallery = new ReactiveArray();
venueFacility = new ReactiveArray();
openCloseHour = new ReactiveArray();
nearbyPlace = new ReactiveArray();
var mapSession = 'venueAddress';
/*****************************************************************************/
/* Editcastle: Event Handlers */
/*****************************************************************************/
Template.Editcastle.events({
    // 'keyup .staff-search': _.throttle(function(e) {
    //     var text = $(e.target).val().trim();
    //     console.log(text);
    //     var data = {
    //         keyword: text
    //     }
    //     Meteor.call('search/castle/staff',data,function(err,resp){
    //         console.log(err,resp);
    //     });
    // }, 200),
     "click #deleteCastleButton": function( event, template ) {
        event.preventDefault();
        $("#ddeleteCastleModal").remove();
        var venue = Venues.findOne(this.id);
        Blaze.renderWithData(Template.deleteCastleModal,venue,document.body)
        $("#deleteCastleModal").modal("show");
    },
    'click .venue-step li': function(event, template){
        event.preventDefault();
        var venue = Venues.findOne(this.id);
        var tab =  $(event.currentTarget).attr("venue-tab");
        switch(tab){
            case "detail":
                logoSource.set('');
                logoSource.set(venue.logo);
                for (var i = 0; i < venue.gallery.length; i++) {
                    photoGallery.push({path:venue.gallery[i].path});
                };
                openCloseHour.clear();
                if(venue.detail.openhour){
                    for (var i = 0; i < venue.detail.openhour.length; i++) {
                      openCloseHour.push(venue.detail.openhour[i]);
                    };
                }
                nearbyPlace.clear();
                if(venue.detail.nearby){
                    for (var i = 0; i < venue.detail.nearby.length; i++) {
                      nearbyPlace.push(venue.detail.nearby[i]);
                    };
                }
                break;

            case "space":
                createSpace.set(false);
                updateSpace.set(false);
                enableButton.set(false);
                posterSource.set('');
                break;
            case "staff":
                enableButton.set(false);
                createAdmin.set(false);
                break;
            case "payment":
                enableButton.set(false);
                createPayment.set(false);
                updatePayment.set(false);
                break;
        }
    },
    'click .save-location': function(event, template){
        event.preventDefault();
        var nextId = $(event.currentTarget).parents('.tab-pane').next().attr("id");
        var venue_id = Router.current().data().params._id;
        var venue_address = $('input[name=venue-address]').val();
        var venue_district = $('input[name=venue-district]').val();
        var venue_city = $('input[name=venue-city]').val();
        var venue_province = $('input[name=venue-province]').val();
        var venue_zipcode = $('input[name=venue-zipcode]').val();
        var venue_phone = $('input[name=venue-phone]').val();
        var venue_email = $('input[name=venue-email]').val();
        var venue_website = $('input[name=venue-website]').val();
        var venue_latlng = Session.get(mapSession);
        if(venue_id != ''){
            var location = {
                venue_id: venue_id,
                latlng: venue_latlng,
                address: venue_address || '',
                district: venue_district || '',
                city: venue_city || '',
                province: venue_province || '',
                zipcode: venue_zipcode || '',
                phone: venue_phone || '',
                email: venue_email || '',
                website: venue_website || '',
            }
            Meteor.call('update/castle/location',location,function(err,resp){
                if(resp){
                    toastr.success('Location updated!', 'Success');
                    $('[href=#'+nextId+']').tab('show');
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
        }
        return false;
    },
    'click .save-detail': function(event, template){
        event.preventDefault();
        var nextId = $(event.currentTarget).parents('.tab-pane').next().attr("id");
        var venue_id = Router.current().data().params._id;
        var venue_name = $('input[name=venue-name]').val();
        var venue_slogan = $('input[name=venue-slogan]').val();
        var venue_description = $('textarea[name=venue-description]').val();
        var number_of_floors = $('input[name=number-of-floors]').val();
        var floor_areas = $('input[name=floor-areas]').val();
        var number_of_rooms = $('input[name=number-of-rooms]').val();
        var number_of_desks = $('input[name=number-of-desks]').val();
        var openhour = [];
        $('.open-closing-time').map(function(){
            var check = $(this).find('input[name=open-week-day]').is(':checked');
            $open = $(this).find('select[name=opening-time]');
            $close = $(this).find('select[name=closing-time]');
            $day = $(this).find('input[name=selected-open-day]');
            openhour.push({
                status: check,
                day: $day.val(),
                open: $open.val(),
                close: $close.val(),
                time: $open.val()+'-'+$close.val()
            });
        });
        var nearby = [];
        $('.set-nearby-place').map(function(){
            var check = $(this).find('input[name=nearby-place]').is(':checked');
            $place = $(this).find('input[name=selected-nearby-place]');
            nearby.push({
                status: check,
                place: $place.val(),
            });
        });
        if(venue_id != ''){
            var detail = {
                venue_id:venue_id,
                name: venue_name || '',
                slogan: venue_slogan || '',
                description: venue_description || '',
                floors: number_of_floors || '',
                areas: floor_areas || '',
                rooms: number_of_rooms || '',
                desks: number_of_desks || '',
                openhour: openhour,
                nearby:nearby
            }
            Meteor.call('update/castle/detail',detail,function(err,resp){
                if(resp){
                    toastr.success('Detail updated!', 'Success');
                    console.log(nextId);
                    $('[href=#'+nextId+']').tab('show');
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
        }
        return false;
    },
    'click .add-venue-logo': function(event, template) {
        event.preventDefault();
        $('input[name=venue-logo-upload]').click();
    },
    'change .venue-logo-upload': function(event, template) {
       var file = event.target.files[0];
        FS.Utility.eachFile(event, function(file) {
            Logos.insert(file, function(err, fileObj) {
                if(fileObj){
                    Meteor.subscribe('To', {
                      'collection':'Logos',
                      'query': {
                        _id: fileObj._id
                      }
                    });
                    Logos.remove({_id:logoSource.get()});
                    logoSource.set(fileObj._id);
                    var venue_id = Router.current().data().params._id;
                    if(venue_id != ''){
                        var detail = {
                            venue_id: venue_id,
                            logo: logoSource.get()
                        }
                        Meteor.call('update/castle/logo',detail,function(err,resp){
                            if(resp){
                                toastr.success('อัพเดทโลโก้เรียบร้อย!', 'Success');
                            }
                            else{
                                toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                            }
                        });
                    }
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'LiSM');
                }
            });
        });

    },
    'click .add-venue-photo': function(event, template) {
        event.preventDefault();
        $('input[name=venue-photo-upload]').click();
    },
    'change .venue-photo-upload': function(event, template) {
       var file = event.target.files[0];
        FS.Utility.eachFile(event, function(file) {
            Galleries.insert(file, function(err, fileObj) {
                event.target.value = '';
                if(fileObj){
                    Meteor.subscribe('To', {
                      'collection':'Galleries',
                      'query': {
                        _id: fileObj._id
                      }
                    });
                    photoGallery.push({path:fileObj._id});
                    var venue_id = Router.current().data().params._id;
                    if(venue_id != ''){
                        var data = {
                            venue_id: venue_id,
                            gallery: photoGallery.array()
                        }
                        Meteor.call('update/castle/gallery',data,function(err,resp){
                                console.log(err,resp);
                            if(resp){
                                toastr.success('อัพเดทโลโก้เรียบร้อย!', 'Success');
                            }
                            else{
                                toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                            }
                        });
                    }
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning');
                }
            });
        });
    },

    'click #createSpaceButton': function(event, template){
        event.preventDefault();
        var venue_id = Router.current().data().params._id;
        var space = {
            venue:venue_id,
            name: 'Draft',
        }
        Meteor.call('create/throne',space,function(err,resp){
            if(resp){
                Meteor.subscribe('To', {
                  'collection':'Spaces',
                  'query': {
                    _id: resp
                  }
                });
                var space = Spaces.findOne(resp);
                spaceData.set(space);
                updateSpace.set(true);
                enableButton.set(true);
                posterSource.set('');
            }
            else{
                toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
            }
        });

    },
    'click #cancelSpaceButton': function(event, template){
        event.preventDefault();
        createSpace.set(false);
        updateSpace.set(false);
        enableButton.set(false);
        posterSource.set('');
    },
    'click .castle-list': function(event, template){
        event.preventDefault();
        spaceData.set(this);
        posterSource.set(this.poster);
        updateSpace.set(true);
        enableButton.set(true);
    },
    'click .upload-space-poster': function(event, template) {
        event.preventDefault();
        $('input[name=space-poster-upload]').click();
    },
    'change .space-poster-upload': function(event, template) {
       var file = event.target.files[0];
        FS.Utility.eachFile(event, function(file) {
            Posters.insert(file, function(err, fileObj) {
                event.target.value = '';
                if(fileObj){
                    Meteor.subscribe('To', {
                      'collection':'Posters',
                      'query': {
                        _id: fileObj._id
                      }
                    });
                    Posters.remove({_id:posterSource.get()});
                    posterSource.set(fileObj._id);
                    var space_id = spaceData.get()._id;
                    var poster_id = posterSource.get();
                    if(space_id != ''){
                        var data = {
                            space_id: space_id,
                            poster: poster_id
                        }
                        Meteor.call('update/throne/poster',data,function(err,resp){
                                console.log(err,resp);
                            if(resp){
                                toastr.success('อัพเดทรูปภาพเรียบร้อย!', 'Success');
                            }
                            else{
                                toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                            }
                        });
                    }
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning');
                }
            });
        });
    },
    'click .update-space-poster': function(event, template) {
        event.preventDefault();
        console.log('clicked');
        $('input[name=space-poster-update]').click();
    },
    'change .space-poster-update': function(event, template) {
       var file = event.target.files[0];
        FS.Utility.eachFile(event, function(file) {
            Posters.insert(file, function(err, fileObj) {
                event.target.value = '';
                if(fileObj){
                    Meteor.subscribe('To', {
                      'collection':'Posters',
                      'query': {
                        _id: fileObj._id
                      }
                    });
                    Posters.remove({_id:posterSource.get()});
                    posterSource.set(fileObj._id);
                    var space_id = spaceData.get()._id;
                    var poster_id = posterSource.get();
                    if(space_id != ''){
                        var data = {
                            space_id: space_id,
                            poster: poster_id
                        }
                        Meteor.call('update/throne/poster',data,function(err,resp){
                                console.log(err,resp);
                            if(resp){
                                toastr.success('อัพเดทรูปภาพเรียบร้อย!', 'Success');
                            }
                            else{
                                toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                            }
                        });
                    }
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning');
                }
            });
        });
    },
    'click .update-space-price': function(event, template){
        event.preventDefault();
        var space_id =  spaceData.get()._id;
        var isInstant = $('input[name=update-instant-booking]').is(':checked');
        var space_type = $('select[name=update-space-type]').val();
        var space_name = $('input[name=update-space-name]').val();
        var space_quantity = $('input[name=update-space-quantity]').val();
        var space_detail = $('textarea[name=update-space-detail]').val();
        var cost_per_hour = $('input[name=update-cost-per-hour]').val();
        var cost_per_day = $('input[name=update-cost-per-day]').val();
        var cost_per_month = $('input[name=update-cost-per-month]').val();
        if(space_id != ''){
            var space = {
                space_id:space_id,
                instant:isInstant,
                type:space_type || '',
                name: space_name || '',
                quantity: space_quantity || '',
                detail: space_detail || '',
                per_hour: cost_per_hour || '',
                per_day: cost_per_day || '',
                per_month: cost_per_month || '',
            }
             Meteor.call('update/throne/detail',space,function(err,resp){
                if(resp){
                    toastr.success('Space updated!', 'Success');
                    updateSpace.set(false);
                    enableButton.set(false);
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
        }
    },

    "click #deleteSpaceButton": function( event, template ) {
        event.preventDefault();
        $("#deleteSpaceModal").remove();
        Blaze.renderWithData(Template.deleteSpaceModal,spaceData.get(),document.body)
        $("#deleteSpaceModal").modal("show");
    },
    'click #createAdminButton': function(event, template){
        event.preventDefault();
        createAdmin.set(true);
        enableButton.set(true);
    },

    'click #cancelStaffButton': function(event, template){
        event.preventDefault();
        createAdmin.set(false);
        enableButton.set(false);
    },
    'click .invite-venue-staff': function(event, template){
        event.preventDefault();
        var venue_id = Router.current().data().params._id;
        var venue = Venues.findOne(venue_id);
        var staff_email = $('input[name=staff-email]').val();
        var staff_role = $('select[name=staff-role] option:selected').text();
        if(staff_email != ''){
            var emailData = {
                venue: venue.name,
                role: staff_role,
                activateLink: 'http://cowscastle.com/activate/aefuhsepgfbhspfbuh'
            };
            var email = {
                to: staff_email,
                from: 'Cows Castle<no-reply@cowscastle.com>',
                subject: 'Admin invitation',
                text : emailData
            }
            Meteor.call('send/invitation/email',email,function(err,resp){
                toastr.success('ส่งคำเชิญแล้ว', 'Success');
            });
        }
        else{
            toastr.warning('กรุณากรอกที่อยู่อีเมล', 'Warning');
        }

    },
    'click .add-venue-facility': function(event, template){
        event.preventDefault();
        var nextId = $(event.currentTarget).parents('.tab-pane').next().attr("id");
        var facility = [];
        $('.checkbox-group').map(function(){
            $checkbox = $(this).find('input[name=facility]');
            facility.push({
              facility_id: $checkbox.attr("id"),
              status: $checkbox.is(':checked')
            });
        });
        var venue_id = Router.current().data().params._id;
        if(venue_id != ''){
            var data = {
                venue_id:venue_id,
                facility: facility,
            }
            Meteor.call('update/castle/facility',data,function(err,resp){
                if(resp){
                    toastr.success('Venue facility updated!', 'Success');
                    $('[href=#'+nextId+']').tab('show');
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
    },
    'click #addPaymentButton': function(event, template){
        event.preventDefault();
        createPayment.set(true);
        enableButton.set(true);
    },
    'click #cancelPaymentButton': function(event, template){
        event.preventDefault();
        createPayment.set(false);
        enableButton.set(false);
        updatePayment.set(false);
    },
    'click .add-payment-method': function(event, template){
        event.preventDefault();
        var venue_id = Router.current().data().params._id;
        var bank_name = $('input[name=bank-name]').val();
        var account_name = $('input[name=account-name]').val();
        var account_number = $('input[name=account-number]').val();
        if(venue_id != '' && bank_name != '' && account_name != '' && account_number != ''){
            var bank = {
                venue_id:venue_id,
                name: bank_name || '',
                account: account_name || '',
                number: account_number || '',
            }
            Meteor.call('create/payment',bank,function(err,resp){
                if(resp){
                    toastr.success('Payment added!', 'Success');
                    createPayment.set(false);
                    enableButton.set(false);
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('กรุณากรอกข้อมูลให้ครบ', 'Warning!');
        }
        return false;
    },

    'click .payment-method-edit': function(event, template){
        event.preventDefault();
        paymentData.set(this);
        updatePayment.set(true);
        enableButton.set(true);
    },
    'click .update-payment-method': function(event, template){
        event.preventDefault();
        var payment_id = paymentData.get()._id;
        var bank_name = $('input[name=update-bank-name]').val();
        var account_name = $('input[name=update-account-name]').val();
        var account_number = $('input[name=update-account-number]').val();
        if(payment_id != '' && bank_name != '' && account_name != '' && account_number != ''){
            var bank = {
                payment_id:payment_id,
                name: bank_name || '',
                account: account_name || '',
                number: account_number || '',
            }
            Meteor.call('update/payment',bank,function(err,resp){
                if(resp){
                    toastr.success('Payment updated!', 'Success');
                    updatePayment.set(false);
                    enableButton.set(false);
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('กรุณากรอกข้อมูลให้ครบ', 'Warning!');
        }
        return false;
    },
    "click #deletePaymentButton": function( event, template ) {
        event.preventDefault();
        $("#deletePaymentModal").remove();
        Blaze.renderWithData(Template.deletePaymentModal,paymentData.get(),document.body)
        $("#deletePaymentModal").modal("show");
    },
    'click .first': function(event, template){
        event.preventDefault();
        $('#myWizard a:first').tab('show')
    },
    'click .next': function(event, template){
        event.preventDefault();
        var nextId = $(event.currentTarget).parents('.tab-pane').next().attr("id");
        $('[href=#'+nextId+']').tab('show');
        return false;
    },
    'click .preview': function(event, template){
        event.preventDefault();
        Router.go('venue',{_id:this.id});
    },
});

/*****************************************************************************/
/* Editcastle: Helpers */
/*****************************************************************************/
Template.Editcastle.helpers({
    mapSession: mapSession,
    Venue: function(){
        var teams = Teams.find({venue_id: this.id}).fetch();
        var team_ids = _.map(teams,function(item){return item._id});
        if(team_ids.length>0){
            var staffs = Staffs.find({team_id: {$in: team_ids}}).fetch();
            var staff_ids = _.map(staffs,function(item){return item.staff_id});
            if (_.where(staff_ids, Meteor.userId()).length) {
                var venue = Venues.findOne(this.id);
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
        }
        else{
            Router.go('home');
        }

    },
    Spaces: function(){
        var space = Spaces.find({venue_id:this.id}).fetch();
        return space;
    },
    getSpace: function(){
        return spaceData.get();
    },
    Staffs: function(){
        var teams = Teams.find({venue_id: this.id}).fetch();
        var team_ids = _.map(teams,function(item){return item._id});
        if(team_ids.length>0){
            var staffs = Staffs.find({team_id: {$in: team_ids}}).fetch();
            var staff_ids = _.map(staffs,function(item){return item.staff_id});
            var result = Meteor.users.find({_id: {$in: staff_ids}}).fetch();
            return result;
        }
        else{
            return;
        }
    },
    Payments: function(){
        var payment = Payments.find({venue_id:this.id}).fetch();
        return payment;
    },
    getPayment: function(){
        return paymentData.get();
    },
    getLogo: function(){
        var result = Logos.findOne({_id: logoSource.get(), uploadedAt: {$exists:true}});
        return result;
    },
    getPoster: function(){
        var result = Posters.findOne({_id: posterSource.get(), uploadedAt: {$exists:true}});
        return result;
    },
    GalleryList: function(){
        var image_ids = _.map(photoGallery.array(),function(item){return item.path});
        var result = Galleries.find({_id: {$in: image_ids}, uploadedAt: {$exists:true}}).fetch();
        return result;
    },
    C2Abbr : function (name){
        var abbr = 'CC';
        var array = name.split(' ');
        if(array.length > 1){
            var arr1 = array[0].charAt(0);
            var arr2 = array[1].charAt(0);
            abbr = arr1+arr2;
        }
        else{
            abbr = array[0].charAt(0);
        }
        return abbr;
    },
    Phoneformat : function(number) {
        return Phoneformat.formatLocal('US', number);
    },
    isUpdateSpace : function(){
        return updateSpace.get();
    },
    staffTabClick : function(){
        return enableButton.get();
    },
    isNewAdmin : function(){
        return createAdmin.get();
    },
    isNewPayment : function(){
        return createPayment.get();
    },
    isUpdatePayment : function(){
        return updatePayment.get();
    },
    paymentTabClick : function(){
        return enableButton.get();
    },
    spaceTabClick : function(){
        return enableButton.get();
    },
    spaceList: function(){
        return [
            {id:1,type:'Share Desk'},
            {id:2,type:'Dedicated Desk'},
            {id:3,type:'Private Office'},
            {id:4,type:'Meeting Room'},
            {id:5,type:'Studio'}
        ];
    },
    spaceAttributes: function(){
        return {
            value: this.type,
            selected: (spaceData.get().type==this.type)?'selected': null
        }
    },
    roleList: function(){
        return [
            {id:'1',name:'เจ้าของ'},
            {id:'2',name:'ผู้จัดการ'},
            {id:'3',name:'บัญชี'},
            {id:'4',name:'พนักงานต้อนรับ'}
        ];
    },
    roleAttributes: function(){
        var list = [
            {id:'1',name:'เจ้าของ'},
            {id:'2',name:'ผู้จัดการ'},
            {id:'3',name:'บัญชี'},
            {id:'4',name:'พนักงานต้อนรับ'}
        ];
        return {
            value: this.id,
            selected: _.contains(list, this.id)?'selected': null
        }
    },
    facilityList: function(){
        var amenity = [
            {id:'1',name:'อินเตอร์เน็ต WiFi'},
            {id:'2',name:'พื้นที่จัดงานอีเว้น'},
            {id:'3',name:'มุมผ่อนคลาย'},
            {id:'4',name:'กาแฟ, ชา, และของกินเล่น'},
            {id:'5',name:'เครื่องปริ้น'},
            {id:'6',name:'นำสัตว์เลี้ยวมาได้'},
            {id:'7',name:'สตูดิโอถ่ายรูป'},
            {id:'8',name:'โต๊ะเขียนแบบ'},
            {id:'9',name:'ติดกล้อง CCTV'},
            {id:'10',name:'ห้องครัว'},
            {id:'11',name:'เข้าออกได้ 24 ชั่วโมง'},
            {id:'12',name:'ล็อกเกอร์เก็บของ'}];
        return amenity;
    },
    isCheck:function(data){
        var status = '';
        var get = _.first(_.where(venueFacility.array(),{facility_id: this.id}));
        if(get){
            if(get.status){
                status = 'checked';
            }
            else{
                status = '';
            }
        }
        else{
            status = '';
        }
        return status;
    },
    isInstant:function(data){
        var status = '';
        if(data){
            status = 'checked';
        }
        else{
            status = '';
        }
        return status;
    },
    nearbyList: function(){
        return [
            {id:'1',place:'ใกล้ BTS'},
            {id:'2',place:'ใกล้ MRT'}
        ];
    },
    isNearbyCheck:function(){
      var status = '';
      var get = _.first(_.where(nearbyPlace.array(),{place: this.id}));
      if(get.status){
        status = 'checked';
      }
      else{
        status = '';
      }
      return status;
    },
    weekList: function(){
        return [
            {id:'0',day:'อาทิตย์'},
            {id:'1',day:'จันทร์'},
            {id:'2',day:'อังคาร'},
            {id:'3',day:'พุธ'},
            {id:'4',day:'พฤหัส'},
            {id:'5',day:'ศุกร์'},
            {id:'6',day:'เสาร์'},
        ];
    },
    isWeekCheck:function(){
      var status = '';
      var get = _.first(_.where(openCloseHour.array(),{day: this.id}));
      if(get.status){
        status = 'checked';
      }
      else{
        status = '';
      }
      return status;
    },

    hourList: function(){
        var hour = [];
        for (var i = 0; i < 24; i++) {
            var pad = '00';
            var h = (pad + i).slice(-pad.length);
            hour.push({id:h,hour:h+":00"});
        };
        return hour ;
    },
    openAttributes: function(){
        var get = _.first(_.where(openCloseHour.array(),{day: Template.parentData().id}));
        var time = get.open.split(':');
        return {
            value: this.hour,
            selected: time[0] == this.id?'selected': null
        }
    },
    closeAttributes: function(){
        var get = _.first(_.where(openCloseHour.array(),{day: Template.parentData().id}));
        var time = get.close.split(':');
        return {
            value: this.hour,
            selected: time[0] == this.id?'selected': null
        }
    }
});

/*****************************************************************************/
/* Editcastle: Lifecycle Hooks */
/*****************************************************************************/
Template.Editcastle.onCreated(function () {
});

Template.Editcastle.onRendered(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var step = $(e.target).data('step');
        var percent = (parseInt(step) / 6) * 100;
        $('.progress-bar').css({width: percent + '%'});
        $('.progress-bar').text("Step " + step + " of 6");
    });
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1440,
        step: 30,
        values: [600, 1200],
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
            $('.opening-time').html(hours1 + ':' + minutes1);

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

            $('.closing-time').html(hours2 + ':' + minutes2);
        }
    });
});

Template.Editcastle.onDestroyed(function () {
});
