/*
@todo: New event binding method to avoid binding multiple events for the same element.
85% :(
Fix IE7
https://github.com/davatron5000/FitText.js/commit/57ce345437f9b1871ece163a15954595a6e02b1e
Put up forkable codepen-link
Set up grunt-script for minification
*/

/**
 * textStretch.js pre-version alpha (2013.11.29)
 *
 * Copyright (c) 2012, 2013 Albin Larsson (mail@albinlarsson.com)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 **/

(function ($) {
	"use strict";
	//  add class for calculating width. let me know if you see this and know a better way
	$("<style>.textStretch-calc{ display: inline-block !important; *display: inline !important; white-space: nowrap !important; width: auto !important; text-align: left !important; }</style>").appendTo("head");

	$.fn.textStretch = function (options) {
		var _settings, _dotextStretch, _useElementWidth, _recalc, _letterAverage, _fontSize, _width, _i, $this, $elements = $(this);

		// import user settings
		_settings = $.extend($.textStretch.defaults, options);

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
					else {
						_width = _settings.width;
					}
				}

				// checking if we already have pre-stored _letterAverage
				if(_settings.refresh || !(_letterAverage = $this.data("textStretchLetterAverage"))){
					// temporarily apply class for measuring width
					$this.addClass("textStretch-calc");

					// width of text / 90% of font-size (to be safe)
					_letterAverage = ($this.width() / (parseInt($this.css("fontSize"), 10) * 0.90));

					// remove measuring-class
					$this.removeClass("textStretch-calc");

					// store in element for faster regeneration
					$this.data("textStretchLetterAverage", _letterAverage);
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
		// bind to resize ands viewport-change. not needed for fixed width
		if (_useElementWidth) {
			$(window).on("orientationchange resize", _dotextStretch);
		}
		return $elements;
	};
	$.textStretch = {
		defaults: {
			width: null,
			minFontSize: 0,
			maxFontSize: Number.POSITIVE_INFINITY,
			refresh: false
		}
	};
}(jQuery));