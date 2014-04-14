/* CSS Helper Class */
var CSSHelper = function() {

};

CSSHelper.prototype.addClass = function(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
};

CSSHelper.prototype.removeClass = function(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

CSSHelper.prototype.hasClass = function(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
};

CSSHelper.prototype.toggleClass = function(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
}

/* UI Class */
var GS_UI = function() {

  this.sidebar = document.getElementById("sidebar");
  this.header = document.getElementById("main-header");
  this.container = document.getElementById("main-container");
  this.helper = new CSSHelper();

};

GS_UI.prototype.toggleSidebar = function() {
  this.helper.toggleClass(this.sidebar, 'visible');
  this.helper.toggleClass(this.header, 'showingSidebar');
  this.helper.toggleClass(this.container, 'showingSidebar');
};

var UI = new GS_UI();
