
lychee.define('app.net.Server').requires([
	'lychee.data.BitON',
	'app.net.remote.Ping'
]).includes([
	'lychee.net.Server'
]).exports(function(lychee, app, global, attachments) {

	/*
	 * IMPLEMENTATION
	 */

	var Class = function(data) {

		var settings = lychee.extend({
			codec: lychee.data.BitON
		}, data);


		lychee.net.Server.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function(remote) {

			console.log('app.net.Server: Remote connected (' + remote.host + ':' + remote.port + ')');

			remote.addService(new app.net.remote.Ping(remote));

		}, this);

		this.bind('disconnect', function(remote) {

			console.log('app.net.Server: Remote disconnected (' + remote.host + ':' + remote.port + ')');

		}, this);


		this.connect();

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			var data = lychee.net.Server.prototype.serialize.call(this);
			data['constructor'] = 'app.net.Server';


			return data;

		}

	};


	return Class;

});
