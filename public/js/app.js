var Data = {

	updateCustomField : function(customFieldId, newValue){
		
		$.ajax({
			type: "POST",
			url: '/api/CustomField/Update',
			data: {
				id: customFieldId,
				value: newValue
			}
		});

		return true;
	},

};

var events = {

	dataInputOnFocusOut: function(){
		var fieldId = $(this).data("id"),
			newValue = $(this).val();

		if(!newValue || newValue.length < 1)
			return;

		var success = Data.updateCustomField(fieldId, newValue);
		if (success) 
			$(this).replaceWith(newValue);
		else
			alert("There was an error saving your changes");
	},

};

var app = {

	init: function(){
		$(".chosen").chosen();

		this.addEventListeners();

		$("#home-splash").css("height", window.height);
	},

	addEventListeners: function(){

		$(".dataInput").on("focusout", events.dataInputOnFocusOut);

	},

	selectProductTypeForChart: function(event){

		var customFieldX = $('#customFieldX');
		// var customFieldY = $('#customFieldY');

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
				
				// customFieldY.append(option);
				// customFieldY.trigger("chosen:updated");
				// $('#customFieldYDiv').show();
			}
		});

		$.get('/api/Products/' + selectedValue, function(data){
			chart.baseData = data;
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

var ChartData = function(){

	this.labels = [];
	this.datasets = [{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : []
	}];

};

ChartData.prototype.addXField = function(val, label){
	this.datasets[0].data.push(val);
	this.labels.push(label);
};

ChartData.prototype.addYField = function(val, label){
	this.datasets[1].data.push(val);
	this.labels.push(label);
};

var chart = {

	baseData : null,
	chartData : {
		labels : [],
		datasets : [{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : []
		}]
	},

	xField : null,
	yField : null,
	xData : null,
	yData : null,

	isReady : false,

	getContext: function(){
		return document.getElementById("myChart").getContext('2d');
	},

	updateChartXField: function(event){
		this.xField = event.target.value;
		this.watchChart();
	},

	getXData: function(){

		this.xData = null;

		$.ajax({
			method: "GET",
			url: '/api/CustomField/TypeId/' + this.xField,
            contentType: "application/json; charset=utf-8",
			dataType: "json",
			success : function(data){
				console.log("======== X ========");
				this.xData = data;
				console.log(this.xData);
				this.cleanData();
			}.bind(this),
		});

	},

	getYData: function(){

		this.yData = null;

		$.ajax({
			method: "GET",
			url: '/api/CustomField/TypeId/' + this.yField,
            contentType: "application/json; charset=utf-8",
			dataType: "json",
			success : function(data){
				console.log("========= Y ========");
				this.yData = data;
				console.log(this.yData);
				this.cleanData();
			}.bind(this),
		});


	},

	updateChartYField: function(event){
		this.yField = event.target.value;
		this.watchChart();
	},

	resetData: function(){
		this.getXData();
		this.getYData();
	},

	cleanData: function(data){

		// if (!this.xData || !this.yData)
		// 	return;

		// X
		for(var i = 0; i < data.length; i++)
		{
			this.chartData.labels.push(data[i].name);
			this.chartData.datasets[0].data.push(data[i].value);
			// this.chartData.addXField(data[i].value, data[i].name);
		}

		// // Y
		// for(i = 0; i < this.yData.length; i++)
		// {
		// 	this.chartData.addYField(this.yData[i].value, this.yData[i].name);
		// }

		this.isReady = true;

	},

	watchChart: function(){
		if (!this.xField || !this.yField)
			return console.log("Please select both axis");

		this.resetData();
	},

	updateChart: function(){

		if (!this.xData || !this.yData)
			return false;

		console.log(this.chartData);

		var context = this.getContext();
		var theChart = new Chart(context).PolarArea(this.chartData);

	},

	updateOrCreateChart: function(){
		this.xField = $("#customFieldX").val();
		this.updateChartFromXData();
	},

	updateChartFromXData: function(){

		this.xData = null;

		$.ajax({
			method: "GET",
			url: '/api/CustomField/TypeId/' + this.xField,
            contentType: "application/json; charset=utf-8",
			dataType: "json",
			success : this.getChartDataEventHandler.bind(this),
		});

	},

	getChartDataEventHandler: function(data){
		this.cleanData(data);
		this.generateChart();
	},

	generateChart: function(){

		if (!this.isReady)
		{
			console.log("Chart data not ready. Data may not have loaded. Trying again in 5 seconds");
			window.setTimeout(generateChart, 5000);
			//todo: only do this once...this whole thing probably isn't necessary though...
		}

		console.log("======== Data ========");
		console.log(this.chartData);	

		var context = this.getContext();
		var theChart = new Chart(context).Line(this.chartData, {});

		console.log(theChart);

	},

};