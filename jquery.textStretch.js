/**
 * textStretch.js 0.9 (2013.12.10)
 *
 * Copyright (c) 2012, 2013 Albin Larsson (mail@albinlarsson.com)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 **/

(function ($) {
	"use strict";
	// add class for calculating width. let me know if you see this and know a better way (excluding insert/addRule)
	$("<style>.textStretch-calc { display: inline-block !important; *display: inline !important; white-space: nowrap !important; width: auto !important; padding:0 !important; text-align: left !important; font-size:100px !important }</style>").appendTo("head");

	$.fn.textStretch = function (options) {
		var _settings, _fontSize, _boxWidth, _i, _recalc, element;

		// import user settings/arguments
		_settings = $.extend($.textStretch.defaults, options);

		// check user arguments
		(function(args){
			for (_i = 0; _i < args.length; _i += 1) {
				if(typeof _settings[args[_i]] !== "number") {
					throw "textStretch error. Argument \"" + args[_i] + "\" must be a number. Argument given was \"" + _settings[args[_i]] + "\".";
				}
			}
		}(["minFontSize", "maxFontSize"]));

		function _textStretch(elements) {
			for (_i = 0; _i < elements.length; _i += 1) {
				element = elements[_i];

				// get box width
				_boxWidth = element.clientWidth;

				// temporarily apply class for measuring width
				element.className += " textStretch-calc";

				// calculate new font size. 100 is the font-size
				_fontSize = parseInt(_boxWidth / (element.clientWidth / 100), 10);

				// overdefine if not within specified font-size span
				_fontSize = Math.min(Math.max(_fontSize, _settings.minFontSize), _settings.maxFontSize);

				// apply font-size
				element.style.fontSize = _fontSize + "px";

				// sometimes new text will be too wide due to browsers rounding letter-spacing to even pixels
				if(element.clientWidth > _boxWidth) {
					element.style.fontSize = _fontSize - 1 + "px";
				}
				// remove measuring-class
				element.className = element.className.substr(0, element.className.length - 17);

				// determine if a vertical scrollbar has been added or removed, in which case we have to recalculate
				_recalc = _boxWidth !== element.clientWidth;
			}
		}

		// run
		_textStretch(this);

		// recalculate if vertical scrollbar has been added or removed due to first run
		if (_recalc) {
			_textStretch(this);
		}

		// add new elements to event-handler list.
		$.textStretch.elements = $.textStretch.elements.add(this);

		// bind to events
		if(!$.textStretch.eventIsBound){
			$(window).on("orientationchange.textStretch resize.textStretch", function(){
				_textStretch($.textStretch.elements);
			});
			$.textStretch.eventIsBound = true;
		}
		return this;
	};
	$.textStretch = {
		defaults: {
			minFontSize: 0,
			maxFontSize: Number.POSITIVE_INFINITY
		},
		elements: $([]),
		eventIsBound : false
	};
}(jQuery));