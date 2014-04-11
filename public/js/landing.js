(function(){

	var mainNav = document.querySelector("nav.nav-main"),
		header = document.querySelector("header"),
		contentWidth = document.body.clientWidth;

	window.onresize = resizeHandler;

	window.onscroll = function(event) {

		if (mainNav == null) { return console.log("ERROR: mainNav is not defined"); }

		var navRect = mainNav.getBoundingClientRect(),
			navTop = navRect.top,
			isFixed = hasClass(mainNav, "fixed"),
			headerVisible = isHeaderVisible();

		//Remove fixed class from nav if need be
		if (headerVisible && hasClass(mainNav, "fixed"))
		{
			if (mainNav.classList)
				mainNav.classList.remove("fixed");
			else
				mainNav.className = mainNav.className.replace(new RegExp('(^|\\b)' + "fixed".split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
		else if (navTop <= 1)
		{
			if (isFixed)
				return;

			if (mainNav.classList)
				mainNav.classList.add("fixed");
			else
				mainNav.className += ' ' + "fixed";
		}

	};

	var hasClass = function(el, className) {
		if (el.classList)
			return el.classList.contains(className);
		else
			return (new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className));
	};

	var isHeaderVisible = function() {
		var headerRect = header.getBoundingClientRect(),
			headerBottom = headerRect.bottom;

		return (headerBottom > 0);
	};

	var resizeHandler = function(event){
		//Update vars
		contentWidth = document.body.clientWidth;
	};

}());