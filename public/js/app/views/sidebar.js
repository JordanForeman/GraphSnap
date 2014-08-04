var app = app || {};

(function($){

	'use strict'

	var Sidebar = Backbone.View.extend({

		el: '#sidebar',

		initialize: function(){
			this.render();
		},

		render: function(){
			return this;
		},

		toggle: function(){
			this.$el.toggleClass('visible');

			if (app.header)
				app.header.$el.toggleClass('showingSidebar');

			if (app.container)
				app.container.$el.toggleClass('showingSidebar');
		}

	});

	app.sidebar = new Sidebar();

})(jQuery);
