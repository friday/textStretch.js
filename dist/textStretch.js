/*!
 * textStretch.js v0.9.2 (2013-12-16)
 * https://github.com/friday/textStretch.js
 *
 * Copyright (c) 2012 - 2013 Albin Larsson
 * Released under the MIT licence: http://www.opensource.org/licenses/mit-license.php
 */

(function (defaults) {
	"use strict";
	var _eventIsBound = false, _i, _j, _recalc, _settings = {}, _watch = {elements: [], settings: []};

	// add indexOf to watch elements array if not present (ie8)
	if(!_watch.elements.indexOf){
		_watch.elements.indexOf = function(obj){
			for (i = 0; i < _watch.elements.length; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}

	function _bind(element, events, handler){
		for (_i = 0; _i < events.length; _i += 1){
			if(element.addEventListener !== undefined){
				// w3c
				element.addEventListener(events[_i], handler, false);
			} else if(element.attachEvent !== undefined){
				// old ie
				element.attachEvent("on" + events[_i], handler);
			}
			else {
				// fallback for jurassic browsers
				element["on" + events[_i]] = handler;
			}
		}
	}

	// add class for calculating width, the ugly browser safe way
	(function(css){
		var style = document.createElement("style");
		style.type = "text/css";
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		document.getElementsByTagName("head")[0].appendChild(style);
	}(".textStretch-calc{display:inline-block !important;*display:inline !important;white-space:nowrap !important;width:auto !important;padding:0 !important;text-align:left !important}"));

	window.textStretch = function (elements, options) {
		// validate and import user arguments
		(function(args){
			for (_i = 0; _i < args.length; _i += 1) {
				// import arguments if defined, else defaults
				_settings[args[_i]] = options && options[args[_i]] ? options[args[_i]] : defaults[args[_i]];
				// validate data types
				if(typeof _settings[args[_i]] !== "number") {
					throw "textStretch error. Argument \"" + args[_i] + "\" must be a number. Argument given was \"" + _settings[args[_i]] + "\".";
				}
			}
		}(["minFontSize", "maxFontSize"]));
		
		_settings.maxFontSize = _settings.maxFontSize || Number.POSITIVE_INFINITY;
		
		function _textStretch(element, settings) {
			var _boxWidth, _fontSize;
			// hasLayout fails (ie7)
			if(element.currentStyle && !element.currentStyle.hasLayout){
				element.style.zoom = "1";
			}
			// get box width
			_boxWidth = element.clientWidth;
		
			// for safe calculation the font-size needs to be big.
			element.style.fontSize = "100px";
		
			// temporarily apply classes for measuring width
			element.className += " textStretch-calc";
		
			// calculate new font size. 100 is the font-size
			_fontSize = parseInt(_boxWidth / (element.clientWidth / 100), 10);
		
			// overdefine if not within specified font-size span
			_fontSize = Math.min(Math.max(_fontSize, settings.minFontSize), settings.maxFontSize);
		
			// apply font-size
			element.style.fontSize = _fontSize + "px";
		
			// sometimes new text will be too wide due to browsers (webkit only?) rounding letter-spacing to even pixels
			if(element.clientWidth > _boxWidth) {
				element.style.fontSize = _fontSize - 1 + "px";
			}
		
			// remove inline-block measuring-class
			element.className = element.className.substr(0, element.className.length - 17);
		
			// true if vertical scrollbar has not been added or removed
			return _boxWidth === element.clientWidth;
		}
		
		function _textStretchEach(elements, settings, noRecalc) {
			for (_i = 0, _recalc = false; _i < elements.length && !_recalc; _i += 1) {
				// settings can be an array for each element or json-object for all of them
				_recalc = !_textStretch(elements[_i], settings[_i] || settings);
			}
			// recalculate if vertical scrollbar has been added or removed due to first run
			if (_recalc && !noRecalc) {
				_textStretchEach(elements, settings, true);
			}
		}
		

		// convert to array if not
		elements = elements.nodeName ? [elements] : elements;

		// run
		_textStretchEach(elements, _settings);

		// add new elements to event-handler list.
		for (_i = 0; _i < elements.length; _i += 1) {
			_j = _watch.elements.indexOf(elements[_i]);
			if(_j === -1) {
				_watch.elements.push(elements[_i]);
				_watch.settings.push(_settings);
			} else {
				_watch.settings[_j] = _settings;
			}
		}

		// bind events
		if(!_eventIsBound){
			_bind(window, ["orientationchange", "resize"], function(){
				_textStretchEach(_watch.elements, _watch.settings);
			});
			_eventIsBound = true;
		}
	};
	// defaults
	defaults.minFontSize = 0;
	defaults.maxFontSize = 0;
}(window.textStretchDefaults = {}));