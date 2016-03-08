(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Async = Package['arunoda:npm'].Async;

/* Package-scope variables */
var Paypal;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/mrt_paypal/packages/mrt_paypal.js                                                        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
(function () {                                                                                       // 1
                                                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                             //    // 4
// packages/mrt:paypal/paypal.js                                                               //    // 5
//                                                                                             //    // 6
/////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                               //    // 8
Meteor.Paypal = {                                                                              // 1  // 9
                                                                                               // 2  // 10
  account_options: {},                                                                         // 3  // 11
  //authorize submits a payment authorization to Paypal                                        // 4  // 12
  authorize: function(card_info, payment_info, callback){                                      // 5  // 13
    Meteor.call('paypal_submit', 'authorize', card_info, payment_info, callback);              // 6  // 14
  },                                                                                           // 7  // 15
  purchase: function(card_info, payment_info, callback){                                       // 8  // 16
    Meteor.call('paypal_submit', 'sale', card_info, payment_info, callback);                   // 9  // 17
  },                                                                                           // 10
  //config is for the paypal configuration settings.                                           // 11
  config: function(options){                                                                   // 12
    this.account_options = options;                                                            // 13
  },                                                                                           // 14
  payment_json: function(){                                                                    // 15
    return {                                                                                   // 16
      "intent": "sale",                                                                        // 17
      "payer": {                                                                               // 18
        "payment_method": "credit_card",                                                       // 19
        "funding_instruments": []},                                                            // 20
      "transactions": []                                                                       // 21
    };                                                                                         // 22
  },                                                                                           // 23
  //parseCardData splits up the card data and puts it into a paypal friendly format.           // 24
  parseCardData: function(data){                                                               // 25
    var first_name = '', last_name = '';                                                       // 26
    if (data.name){                                                                            // 27
      first_name = data.name.split(' ')[0];                                                    // 28
      last_name = data.name.split(' ')[1]                                                      // 29
    }                                                                                          // 30
    return {                                                                                   // 31
      credit_card: {                                                                           // 32
        type: data.type,                                                                       // 33
        number: data.number,                                                                   // 34
        first_name: first_name,                                                                // 35
        last_name: last_name,                                                                  // 36
        cvv2: data.cvv2,                                                                       // 37
        expire_month: data.expire_month,                                                       // 38
        expire_year: data.expire_year                                                          // 39
      }};                                                                                      // 40
  },                                                                                           // 41
  //parsePaymentData splits up the card data and gets it into a paypal friendly format.        // 42
  parsePaymentData: function(data){                                                            // 43
    return {amount: {total: data.total, currency: data.currency}};                             // 44
  }                                                                                            // 45
};                                                                                             // 46
                                                                                               // 47
if(Meteor.isServer){                                                                           // 48
  Meteor.startup(function(){                                                                   // 49
    var paypal_sdk = Npm.require('paypal-rest-sdk');                                           // 50
    var Fiber = Npm.require('fibers');                                                         // 51
    var Future = Npm.require('fibers/future');                                                 // 52
    Meteor.methods({                                                                           // 53
      paypal_submit: function(transaction_type, cardData, paymentData){                        // 54
        paypal_sdk.configure(Meteor.Paypal.account_options);                                   // 55
        var payment_json = Meteor.Paypal.payment_json();                                       // 56
        payment_json.intent = transaction_type;                                                // 57
        payment_json.payer.funding_instruments.push(Meteor.Paypal.parseCardData(cardData));    // 58
        payment_json.transactions.push(Meteor.Paypal.parsePaymentData(paymentData));           // 59
        var fut = new Future();                                                                // 60
        this.unblock();                                                                        // 61
        paypal_sdk.payment.create(payment_json, Meteor.bindEnvironment(function(err, payment){ // 62
          if (err){                                                                            // 63
            fut.return({saved: false, error: err});                                            // 64
          } else {                                                                             // 65
            fut.return({saved: true, payment: payment});                                       // 66
          }                                                                                    // 67
        },                                                                                     // 68
        function(e){                                                                           // 69
          console.error(e);                                                                    // 70
        }));                                                                                   // 71
        return fut.wait();                                                                     // 72
    }});                                                                                       // 73
  });                                                                                          // 74
}                                                                                              // 75
                                                                                               // 76
                                                                                               // 77
/////////////////////////////////////////////////////////////////////////////////////////////////    // 86
                                                                                                     // 87
}).call(this);                                                                                       // 88
                                                                                                     // 89
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:paypal'] = {
  Paypal: Paypal
};

})();

//# sourceMappingURL=mrt_paypal.js.map
