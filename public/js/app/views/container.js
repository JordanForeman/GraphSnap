var app = app || {};

(function($){

	'use strict'

	var Container = Backbone.View.extend({

		el: '#main-container',

		initialize: function(){
			this.render();
		},

		render: function(){
			return this;
		}

	});

	app.container = new Container();

})(jQuery);
