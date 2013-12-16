/* global jQuery */
(function ($, defaults) {
	"use strict";
	var _eventIsBound = false, _i, _j, _recalc, _settings = {}, _watch = {elements: [], settings: []};
	// add class for calculating width, the ugly browser safe way
	$("<style>/* @include _cssText.css */</style>").appendTo("head");

	$.fn.textStretch = function (options) {
		// @include _validateArgs.js
		// @include _textStretch.js
		// @include _textStretchEach.js

		// run
		_textStretchEach(this, _settings);

		// add new elements to event-handler list.
		for (_i = 0; _i < this.length; _i += 1) {
			_j = $.inArray(this[_i], _watch.elements);
			if(_j === -1) {
				_watch.elements.push(this[_i]);
				_watch.settings.push(_settings);
			} else {
				_watch.settings[_j] = _settings;
			}
		}

		// bind events
		if(!_eventIsBound){
			$(window).on("orientationchange.textStretch resize.textStretch", function(){
				_textStretchEach(_watch.elements, _watch.settings);
			});
			_eventIsBound = true;
		}

		// make jquery method chainable
		return this;
	};

	// @include _defaults.js
}(jQuery, jQuery.textStretch = {}));