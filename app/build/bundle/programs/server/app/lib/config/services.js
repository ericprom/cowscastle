(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/config/services.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isServer) {                                                 // 1
	Meteor.startup(function () {                                          // 2
		// Add Facebook configuration entry                                  //
		ServiceConfiguration.configurations.update({                         // 4
			"service": "facebook"                                               // 5
		}, {                                                                 //
			$set: {                                                             // 7
				"appId": "156590211362489",                                        // 8
				"secret": "a3dedcdfa1eaed6cecba89da3699c3d7"                       // 9
			}                                                                   //
		}, {                                                                 //
			upsert: true                                                        // 12
		});                                                                  //
		// Add GitHub configuration entry                                    //
		ServiceConfiguration.configurations.update({                         // 15
			"service": "github"                                                 // 16
		}, {                                                                 //
			$set: {                                                             // 18
				"clientId": "c5c7aaf5a95c651d5cfb",                                // 19
				"secret": "d8f108bcee14a0d876c0dbd841d4258e444368ad"               // 20
			}                                                                   //
		}, {                                                                 //
			upsert: true                                                        // 23
		});                                                                  //
	});                                                                   //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=services.js.map
