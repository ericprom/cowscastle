if (Meteor.isServer) {
	Meteor.startup(function() {
		// Add Facebook configuration entry
		ServiceConfiguration.configurations.update({
			"service": "facebook"
		}, {
			$set: {
				"appId": "156590211362489",
				"secret": "a3dedcdfa1eaed6cecba89da3699c3d7"
			}
		}, {
			upsert: true
		});
		// Add GitHub configuration entry
		ServiceConfiguration.configurations.update({
			"service": "github"
		}, {
			$set: {
				"clientId": "c5c7aaf5a95c651d5cfb",
				"secret": "d8f108bcee14a0d876c0dbd841d4258e444368ad"
			}
		}, {
			upsert: true
		});
	});
}