var app = app || {};
app.DataPoints = app.DataPoints || new Array();

(function($){

	'use strict'

	var DataPoint = Backbone.Model.extend({

		initialize: function() {

		},

		save: function() {
			//TODO: push datapoint to server
			$.ajax({
				method: 'POST',
				url: '/import/datapoint',
				async: false,
				dataType: 'json',
				data: this
			});
		}

	});

	return DataPoint;

})(jQuery);