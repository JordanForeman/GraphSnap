var app = app || {};

(function($){

	'use strict'

	var Header = Backbone.View.extend({

		el: '#main-header',

		events: {
			'click #menuToggle': 'showSidebar'
		},

		initialize: function(){
			this.render();
		},

		render: function(){
			return this;
		},

		showSidebar: function(){
			if(!app.sidebar)
				return console.log('Sidebar object not attached');

			app.sidebar.toggle();
		}

	});

	app.header = new Header();

})(jQuery);
