var app = app || {};

(function($){

	'use strict'

	var DataPoint = Backbone.View.extend({
		el: 'tr',

		initialize: function(){
			this.render();
		},

		render: function(){
			return this;
		}
	});

})(jQuery);