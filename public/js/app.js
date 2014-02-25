var data = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [1.17, 2.67, 1.92, 4.16, 3.41, 4.90, 3.41, 1.92, 3.00, 2.67, 3.41]
		},
	]
}

var app = {

	init: function(){
		$(".chosen").chosen();

		//Chart.js
		var canvas = document.querySelector("#myChart");
		if (canvas){
			var ctx = canvas.getContext("2d");
			
			if (ctx)
				var myNewChart = new Chart(ctx).Line(data);
		}
	},

	selectProductTypeForChart: function(event){

		var customFieldX = $('#customFieldX');
		var customFieldY = $('#customFieldY');

		var selectedIndex = event.target.selectedIndex;
		var selectedValue = event.target[selectedIndex].value;

		$.get('/api/CustomFieldTypes/' + selectedValue, function(data){

			for (var i = 0; i < data.length; i++)
			{
				var option = ['<option value="', 
								data[i]._id, 
								'">', 
								data[i].name, 
								'</option>'].join('');

				customFieldX.append(option);
				customFieldX.trigger("chosen:updated");
				$('#customFieldXDiv').show();
				
				customFieldY.append(option);
				customFieldY.trigger("chosen:updated");
				$('#customFieldYDiv').show();
			}
		});

	},

	selectProductTypeToMake: function(event){
		var selectedIndex = event.target.selectedIndex;
		var selectedValue = event.target[selectedIndex].value;

		var createProductForm = $('#createNewProductForm');

		$.get('/api/ProductTypes/' + selectedValue, function(data){

			var fields = data.customFieldTypes;
			for(var i = 0; i < fields.length; i++)
			{
				var inputType = fields[i].dataType.toLowerCase();
				var inputName = fields[i].name.replace(/\s+/g, '-').toLowerCase();
				// var label = '<label>' + fields[i].name + '</label>';
				var input = '<label>' + fields[i].name + '<input type="' + inputType + '" name="' + inputName + '"></label>';

				// createProductForm.append(label);
				createProductForm.append(input);
				createProductForm.append('<br>');
			}

			$('#productTypeId').attr('value', data._id);
			createProductForm.append('<input type="submit" value="Create Product">');
			// createProductForm.show();
		});

	},

};

var chart = {

	getContext: function(){

		return document.getElementById("myChart").getContext('2d');

	},

	updateChartXField: function(event){

		var data = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : [65,59,90,81,56,55,40]
				},
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [28,48,40,19,96,27,100]
				}
			]
		};

		var context = this.getContext();
		var theChart = new Chart(context).PolarArea(data);

	},

	updateChartYField: function(event){

		var data = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : [65,59,90,81,56,55,40]
				},
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [28,48,40,19,96,27,100]
				}
			]
		};

		var context = this.getContext();
		var theChart = new Chart(context).PolarArea(data);
	},

};