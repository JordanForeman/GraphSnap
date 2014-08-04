var valid = function(){

	var _attemptCount = 0;

	var routeLogin = function(){
		_attemptCount++;

		if (_attemptCount > 1)
			route.login();
	};

	return {
		routeLogin : routeLogin
	};
}();

var route = function(){

	var login = function(){
		window.location = "/Login";
	};

	return {
		login : login
	};
}();

var contact = function(){

	var sendMsg = function(){
		var fromEmail = $("#home-contactForm-email").val(),
			message = $("#home-contactForm-message").val();


		$.ajax({
			type: "POST",
			url: "/Contact",
			data: {
				from: fromEmail,
				msg: message,
				success: function(data, textStatus, jqXHR){
					return console.log(data + " " + textStatus);
				},
				error: function(jqXHR, textStatus, errorThrown){
					return console.log(errorThrown + " " + textStatus);
				},
				dataType: "json"
			}
		});

		return false;
	};

	return {
		sendMsg : sendMsg
	};

}();

//BACKBONE Implementation
// var HomePage = Backbone.View.extend({

// 	tagName: 'body',

	

// });