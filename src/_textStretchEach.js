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
