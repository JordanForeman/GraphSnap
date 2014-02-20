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

	selectProductTypeToMake: function(event){
		var selectedIndex = event.target.selectedIndex;
		var selectedValue = event.target[selectedIndex].value;

		var createProductForm = $('#createNewProductForm');

		$.get('/api/ProductTypes/' + selectedValue, function(data){
			console.log(data);

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