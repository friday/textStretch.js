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
