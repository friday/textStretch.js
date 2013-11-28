/**
 * textStretch.js v0.7 (2013.11.28)
 *
 * Copyright (c) 2012, 2013 Albin Larsson (mail@albinlarsson.com)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 **/

(function ($) {
	"use strict";
	//  add class for calculating width. let me know if you see this and know a better way
	$("<style>").text(".textStretch-calc{ *display: inline; display: inline-block; white-space: nowrap; text-align: left; }").appendTo("head");

	$.fn.textStretch = function (options) {
		var _settings, _dotextStretch, _useElementWidth, _recalc, _letterAverage, _fontSize, _width, _i, $this, $elements = $(this);

		// adding defaults
		_settings = $.extend($.fn.textStretch.defaults, options);

		// no width specified. use element width (doesn't work for for inline or inline-blocks)
		_useElementWidth = (_settings.width === null);

		_dotextStretch = function () {
			for (_i = 0; _i < $elements.length; _i += 1) {
				$this = $($elements[_i]);

				// use element's width if no width specified
				if (_useElementWidth) {
					_width = $this.width();
				} else {
					if (typeof _settings.width !== "number") {
						throw "$.textStretch error: Width is not a number";
					}
					_width = _settings.width;
				}

				// checking if we already have pre-stored _letterAverage
				if(_settings.refresh || !(_letterAverage = $this.data("letterAverage"))){
					// temporarily apply class for measuring width
					$this.addClass("textStretch-calc");

					// width of text / 97% of font-size (to be safe)
					_letterAverage = ($this.width() / (parseInt($this.css("fontSize"), 10) * 0.97));

					// remove measuring-class
					$this.removeClass("textStretch-calc");

					// store in element for faster regeneration
					$this.data("letterAverage", _letterAverage);
				}

				// overwritten unless within specified font-size span
				_fontSize = Math.min(Math.max(parseInt(_width / _letterAverage, 10), _settings.minFontSize), _settings.maxFontSize);

				// apply font-size
				$this.css("fontSize", _fontSize + "px");

				// determine if a vertical scrollbar has been added or removed, in which case we have to recalculate
				_recalc = (_useElementWidth && _width !== $this.width());
			}
		};

		// run
		_dotextStretch();

		// recalculate if needed
		if (_recalc) {
			_dotextStretch();
		}
		// bind to resize ands viewport-change. not needed for fixed width.
		if (_useElementWidth) {
			$(window).on("orientationchange resize", _dotextStretch);
		}
		return $elements;
	};
	$.fn.textStretch.defaults = {
		width: null,
		minFontSize: 0,
		maxFontSize: Number.POSITIVE_INFINITY,
		refresh: false
	};
}(jQuery));