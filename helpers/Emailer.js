var postmark = require("postmark")(process.env.POSTMARK_API_KEY || "315e7595-60c7-4197-9113-9f5295cc7672");

var emailer = function(to, subject, htmlBody) {
	this.to = to;
	this.subject = subject;
	this.htmlBody = htmlBody;
};

emailer.prototype.send = function(callback) {

	postmark.send({

		"From" : "no-reply@graphsnap.com",
		"To" : this.to,
		"Subject" : this.subject,
		"HtmlBody" : this.htmlBody,

	}, callback);

};

module.exports = emailer;