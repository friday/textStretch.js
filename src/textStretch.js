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
	}("/* @include _cssText.css */"));

	window.textStretch = function (elements, options) {
		// @include _validateArgs.js
		// @include _textStretch.js
		// @include _textStretchEach.js

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
	// @include _defaults.js
}(window.textStretchDefaults = {}));