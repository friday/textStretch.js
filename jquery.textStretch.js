/**
 * textStretch.js v0.6 (2013.11.28)
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
		var _dotextStretch, _useElementWidth, _recalc, _fontSize, _width, _i, $this, $elements = $(this);

		// adding defaults
		options = $.extend({
			minFontSize : 0,
			maxFontSize : Number.POSITIVE_INFINITY
		}, options);

		// no width specified. use element width (doesn't work for for inline or inline-blocks)
		_useElementWidth = (options.width === undefined || options.width === null);

		(_dotextStretch = function () {
			for (_i = 0; _i < $elements.length; _i += 1) {
				$this = $($elements[_i]);

				// use element's width if no width specified
				if (_useElementWidth) {
					_width = $this.width();
				} else {
					if (typeof options.width !== "number") {
						throw "$.textStretch error: Width is not a number";
					}
					_width = options.width;
				}

				// temporarily apply class for measuring width
				$this.addClass("textStretch-calc");

				// font size is calculated to: width of element / width of text / font-size
				_fontSize = parseInt(_width / ($this.width() / (parseInt($this.css("fontSize"), 10) * 0.97)), 10);

				// overwritten unless within specified font-size span
				_fontSize = Math.min(Math.max(_fontSize, options.minFontSize), options.maxFontSize);

				// remove measuring-class
				$this.removeClass("textStretch-calc");

				// apply font-size
				$this.css("fontSize", _fontSize + "px");

				// determine if a vertical scrollbar has been added or removed, in which case we have to recalculate
				_recalc = (_useElementWidth && _width !== $this.width());
			}
		})();
		// recalculate if needed
		if (_recalc) {
			_dotextStretch();
		}
		/* bind to resize ands viewport-change */
		if (_useElementWidth) {
			$(window).on("orientationchange resize", _dotextStretch);
		}
		return $elements;
	};
}(jQuery));