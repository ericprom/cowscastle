
BookingDuration = new ReactiveVar(1);
BookingAmount = new ReactiveVar(1);
/*****************************************************************************/
/* Bookingbox: Event Handlers */
/*****************************************************************************/
Template.Bookingbox.events({
    'click #bookingButton': function(event, template){
        event.preventDefault();
        var space_id = Router.current().data().params._id;
        var booking_date = template.find('#booking-box-date').value;
        var booking_duration = BookingDuration.get();
        var booking_amount = BookingAmount.get();
        if(space_id != '' && booking_date!=''){
            var space = {
                id: space_id,
                date: moment(booking_date).unix(),
                duration: booking_duration,
                amount: booking_amount,
                type: 'day',
            }
            $("#Bookingboxmodal").modal("hide");
            Meteor.call('booking/space',space,function(err,resp){
                if(resp){
                    Router.go('booking',{_id:resp});
                }
                else{
                    toastr.warning('เกิดข้อผิดพลาด!', 'Warning!');
                }
            });
        }
        else{
            toastr.warning('กรุณาเลือกวันที่!', 'Warning!');
        }
    },

    'click .add-booking-duration': function(event, template){
        event.preventDefault();
        if(BookingDuration.get()>=1){
            BookingDuration.set(BookingDuration.get()+1);
        }
    },
    'click .subtract-booking-duration': function(event, template){
        event.preventDefault();
        if(BookingDuration.get()>1){
            BookingDuration.set(BookingDuration.get()-1);
        }
    },
    'click .add-booking-amount': function(event, template){
        event.preventDefault();
        if(BookingAmount.get()>=1){
            BookingAmount.set(BookingAmount.get()+1);
        }
    },
    'click .subtract-booking-amount': function(event, template){
        event.preventDefault();
        if(BookingAmount.get()>1){
            BookingAmount.set(BookingAmount.get()-1);
        }
    },
});

/*****************************************************************************/
/* Bookingbox: Helpers */
/*****************************************************************************/
Template.Bookingbox.helpers({
    CostBox : function(){
        var spaceID = Router.current().data().id;
        var space = Spaces.findOne(spaceID);
        if(space){
            var data = {}
            if(space.per_day){
                data.price = space.per_day+" ฿";
                data.unit = 'ต่อวัน';
            }
            else{
                data.price = "0 ฿";
                data.unit = 'ต่อวัน';
            }
            return data;
        }
    },
    Booking : function(){
        return {
            duration:BookingDuration.get(),
            amount:BookingAmount.get()
        };
    }
});

/*****************************************************************************/
/* Bookingbox: Lifecycle Hooks */
/*****************************************************************************/
Template.Bookingbox.onCreated(function () {
});

Template.Bookingbox.onRendered(function () {
    this.$('#booking-box-date').datetimepicker( {
        pickTime: false
    });
});

Template.Bookingbox.onDestroyed(function () {
});
