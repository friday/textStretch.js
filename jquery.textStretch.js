/**
 * textStretch.js pre-version alpha (2013.12.09)
 *
 * Copyright (c) 2012, 2013 Albin Larsson (mail@albinlarsson.com)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 **/

(function ($) {
	"use strict";
	// add class for calculating width. let me know if you see this and know a better way (excluding insert/addRule)
	$("<style>.textStretch-calc { display: inline-block !important; *display: inline !important; white-space: nowrap !important; width: auto !important; padding:0 !important; text-align: left !important; }</style>").appendTo("head");

	$.fn.textStretch = function (options) {
		var _settings, _useElementWidth, _letterAverage, _fontSize, _width, _i, _recalc, element;

		// import user settings/arguments
		_settings = $.extend($.textStretch.defaults, options);

		// check user arguments
		(function(){
			for (_i = 0; _i < arguments.length; _i += 1) {
				if (typeof _settings[arguments[_i].name] !== arguments[_i].type) {
					throw "textStretch error. Argument \"" + arguments[_i].name + "\" (" + _settings[arguments[_i].name] + ") is not a number";
				}
			}
		}({name: "width", type: "number"}, {name: "minFontSize", type: "number"}, {name: "maxFontSize", type: "number"}));

		// no width specified. use element width (doesn't work for for inline or inline-blocks)
		_useElementWidth = (_settings.width === 0);

		function _getStyle(elem, prop, camelProp) {
			return elem.currentStyle ? elem.currentStyle[camelProp] : window.getComputedStyle(elem, null).getPropertyValue(prop);
		}

		function _textStretch(elements) {
			for (_i = 0; _i < elements.length; _i += 1) {
				element = elements[_i];

				// use element's width if no width specified
				_width = _useElementWidth ? element.clientWidth : _settings.width;

				// temporarily apply class for measuring width
				element.className += " textStretch-calc";

				// width of text / 100%
				_letterAverage = element.clientWidth / (parseInt(_getStyle(element,"font-size", "fontSize"), 10));

				// overwritten unless within specified font-size span
				_fontSize = Math.min(Math.max(parseInt(_width / _letterAverage, 10), _settings.minFontSize), _settings.maxFontSize);

				// apply font-size
				element.style.fontSize = _fontSize + "px";

				// sometimes new text will be too wide due to browsers rounding letter-spacing to even pixels
				if(element.clientWidth > _width) {
					element.style.fontSize = _fontSize - 1 + "px";
				}
				// remove measuring-class
				element.className = element.className.substr(0, element.className.length - 17);

				// determine if a vertical scrollbar has been added or removed, in which case we have to recalculate
				_recalc = (_useElementWidth && _width !== element.clientWidth);
			}
		}

		// run
		_textStretch(this);

		// recalculate if needed
		if (_recalc) {
			_textStretch(this);
		}

		// handle resize ands viewport-change. not needed for fixed width
		if (_useElementWidth) {
			// add new elements to list.
			$.textStretch.elements = $.textStretch.elements.add(this);

			// bind to events
			if(!$.textStretch.eventIsBound){
				$(window).on("orientationchange.textStretch resize.textStretch", function(){
					_textStretch($.textStretch.elements);
				});
				$.textStretch.eventIsBound = true;
			}
		}
		return this;
	};
	$.textStretch = {
		defaults: {
			width: 0,
			minFontSize: 0,
			maxFontSize: Number.POSITIVE_INFINITY
		},
		elements: $([]),
		eventIsBound : false
	};
}(jQuery));