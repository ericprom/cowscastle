(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;

/* Package-scope variables */
var Phoneformat, PhoneInput;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/dispatch_phoneformat.js/server.js                                               //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
Meteor.methods({                                                                            // 1
  /*                                                                                        // 2
   * Get the country of the client.                                                         // 3
   * @return country The country which the IP address of the client is in.                  // 4
   */                                                                                       // 5
  'phoneformat.getCountryForIp': function () {                                              // 6
    var response = null;                                                                    // 7
                                                                                            // 8
    // Lookup info for the client's IP address, not the server's                            // 9
    var clientIP = this.connection.clientAddress || '';                                     // 10
                                                                                            // 11
    // For local development, client connections are the client's local IP address.         // 12
    // Do not pass in an IP address and the lookup will be based on the server's address.   // 13
    clientIP = (clientIP === '127.0.0.1') ? '' : clientIP;                                  // 14
                                                                                            // 15
    // If phoneformat is configured with a token, do the look up over https                 // 16
    if (Phoneformat.token) {                                                                // 17
      response = HTTP.get('https://ipinfo.io/' + clientIP + '?token=' + Phoneformat.token);
    } else {                                                                                // 19
      response = HTTP.get('http://ipinfo.io/' + clientIP);                                  // 20
    }                                                                                       // 21
                                                                                            // 22
    return response.data && response.data.country;                                          // 23
  }                                                                                         // 24
});                                                                                         // 25
                                                                                            // 26
Phoneformat = {};                                                                           // 27
                                                                                            // 28
// Configure phoneformat to use https with a token                                          // 29
Phoneformat.configure = function (options) {                                                // 30
  options = options || {};                                                                  // 31
                                                                                            // 32
  Phoneformat.token = options.token;                                                        // 33
};                                                                                          // 34
                                                                                            // 35
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dispatch:phoneformat.js'] = {
  Phoneformat: Phoneformat,
  PhoneInput: PhoneInput
};

})();

//# sourceMappingURL=dispatch_phoneformat.js.js.map
