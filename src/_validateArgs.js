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
