/*****************************************************************************/
/* deletePaymentModal: Event Handlers */
/*****************************************************************************/
Template.deletePaymentModal.events({
     'click #removePaymentButton': function(event, template){
        event.preventDefault();
        var payment_id = $('input[name=payment_id]').val();
        $('#deletePaymentModal').modal("hide");
        if(payment_id != '' ){
          var data = {
                id : payment_id
            }
            Meteor.call('delete/payment',data,function(err,resp){
              if(resp){
                toastr.success('This payment has been deleted', 'LiSM');
                updatePayment.set(false);
                enableButton.set(false);
                paymentData.set('')
              }
              else{
                toastr.warning('Something went wrong!', 'LiSM');
              }
            });
        }
        else{
            toastr.warning('No payment selected!', 'LiSM');
        }
    }
});

/*****************************************************************************/
/* deletePaymentModal: Helpers */
/*****************************************************************************/
Template.deletePaymentModal.helpers({});

/*****************************************************************************/
/* deletePaymentModal: Lifecycle Hooks */
/*****************************************************************************/
Template.deletePaymentModal.onCreated(function () {});

Template.deletePaymentModal.onRendered(function () {});

Template.deletePaymentModal.onDestroyed(function () {});
