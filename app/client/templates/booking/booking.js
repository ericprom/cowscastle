paymentSuccess = new ReactiveVar(false);
paymentProcess = new ReactiveVar(false);
creditCradType = new ReactiveVar();
isInstant = new ReactiveVar(false);
usingCreditcard = new ReactiveVar("creditcard");
/*****************************************************************************/
/* Booking: Event Handlers */
/*****************************************************************************/
Template.Booking.events({
    'change #paymentType': function(event, template) {
        var payment_type = $('select[name=payment-type]').val();
        switch(payment_type){
            case "creditcard":
                usingCreditcard.set("creditcard");
                break;
            case "paypal":
                usingCreditcard.set("paypal");
                break;
        }
    },
    'keyup .card-number': _.throttle(function(e) {
        var number = $(e.target).val().trim();
        var result = "unknown";
        var regex = new RegExp("^4");
        if (number.match(regex) != null){
            result =  "visa";
        }
        regex = new RegExp("^(34|37)");
        if (number.match(regex) != null){
            result =  "americanexpress";
        }
        regex = new RegExp("^5[1-5]");
        if (number.match(regex) != null){
            result =  "mastercard";
        }
        regex = new RegExp("^6011");
        if (number.match(regex) != null){
            result =  "discover";
        }
        creditCradType.set(result);
    }, 200),
    'click .book-now-btn': function(event, template){
        event.preventDefault();
            var bookingID = Router.current().data().params.id;
            var data = {
                id: bookingID
            }
            Meteor.call('confirm/booking',data,function(err,resp){
                if(resp){
                    toastr.success('ระบบระบบได้ทำการจองเรียบ้อยแล้ว', 'Cows Castle');
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
    },
    'click .pay-by-credit-btn': function(event, template){
        event.preventDefault();
        var name = $('[data-stripe="cardHolder"]').val();
        var number = $('[data-stripe="cardNumber"]').val();
        var type = creditCradType.get();
        var cvv2 = $('[data-stripe="cvc"]').val();
        var expire_year = $('[data-stripe="expYr"]').val();
        var expire_month = $('[data-stripe="expMo"]').val();
        if(name!=''&&number!=''&&type!=''&&cvv2!=''&&expire_year!=''&&expire_month!=''){
            if(type=='unknown'){
                toastr.warning('ระบบยังไม่รองรับการจ่ายเงินด้วยบัตรประเภทนี้', 'Cows Castle');
            }
            else{
                if(paymentProcess.get()==false){
                    paymentProcess.set(true);
                    Meteor.Paypal.authorize({
                        name: name,
                        number: number,
                        type: type,
                        cvv2: cvv2,
                        expire_year: expire_year,
                        expire_month:expire_month
                    },
                    {
                        total: '1.00',
                        currency: 'THB'
                    },
                    function(error, results){
                        paymentSuccess.set(results.save);
                        if(results.error){
                            var details = results.error.response.details;
                            for (var i = 0; i < details.length; i++) {
                                var field = details[i].field;
                                var issue = details[i].issue;
                                var input = field.split('.');
                                toastr.warning(input[3]+" "+issue, 'Cows Castle');
                            }
                        }
                        paymentProcess.set(false);
                    });
                }
            }
        }
        else{
            toastr.warning('กรอกรายละเอียดให้ครบ', 'Cows Castle');
        }
    }
});
venueFacility = new ReactiveArray();
/*****************************************************************************/
/* Booking: Helpers */
/*****************************************************************************/
Template.Booking.helpers({
    Booking: function(){
        var booking = Bookings.findOne(this.id);
        if(booking.confirm){
            Router.go('dashboard');
        }
        else{
            return booking;
        }
    },
    Space: function(){
        var booking = Bookings.findOne(this.id);
        if(booking){
            var space = Spaces.findOne(booking.space_id);
            if(space.instant){
                isInstant.set(true);
            }
            else{
                isInstant.set(false);
            }
            return space;
        }
        else{
            Router.go('home');
        }
    },
    theVenue: function(space) {
        var venue = Venues.findOne(space);
        return venue.name;
    },
    getPoster: function(){
        var booking = Bookings.findOne(this.id);
        var space = Spaces.findOne(booking.space_id);
        var poster = "http://placehold.it/300x200?text="+space.type;
        if(space.poster){
            poster = "/cfs/files/Posters/"+space.poster;
        }
        return poster;
    },
    isPayByCredit:function(){
        if(usingCreditcard.get()=='creditcard'){
            return true;
        }
        else{
            return false;
        }
    },
    InstantBooking:function(){
        return isInstant.get();
    },
    isProcressing:function(){
        if(paymentProcess.get()){
            var data = {
                icon: 'fa-spinner fa-spin',
                status: 'disabled'
            }
            return data;
        }
        else{
            var data = {
                icon: 'fa-credit-card',
                status: ''
            }
            return data;
        }
    },
    isPaySuccess:function(){
        return paymentSuccess.get();
    },
    BillAmount: function(){
        var amount = 0;
        var booking = Bookings.findOne(this.id);
        if(booking){
            var space = Spaces.findOne(booking.space_id);
            console.log(booking,space);
            switch(booking.type){
                case "day":
                    amount = parseInt(booking.duration)*parseInt(booking.amount)*parseFloat(space.per_day);
                    console.log(amount);
                    break;
            }
        }
        return amount+ " บาท";
    },
    unixToDate: function(value){
        return moment.unix(value).format("M/D/YYYY");
    },
});

/*****************************************************************************/
/* Booking: Lifecycle Hooks */
/*****************************************************************************/
Template.Booking.onCreated(function () {
});

Template.Booking.onRendered(function () {
});

Template.Booking.onDestroyed(function () {
});
