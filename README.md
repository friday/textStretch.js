# textStretch.js

A jQuery extension for stretching a text to the width of the element.

textStretch.js is minimal, fast, roubust, doesn't require or add any wrappers or children`, and it just works!

### Requirements
textStretch requires jQuery 1.7 or later for events (browser window rescale).

### How it works
textStretch temporarily alter your elements to get their text widths, and uses that width in relation to the box width to set a new font-size.

When the window is resized or when the device is rotated textStretch will run again, in case the elements box width is changed.

### How to use
Load jQuery and the script.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="jquery.textStretch.js"></script>
```

Apply textStretch to a set of elements

```javascript
$(function () {
  $(".stretch").textStretch();
});
```

It's that easy!

### Optional arguments
* maxFontSize - Maximum font size
* minFontSize - Minimum font size

```javascript
$(".stretch").textStretch({ minFontSize: 12 }); // minimum font size
$(".stretch").textStretch({ minFontSize: 12, minFontSize: 64 }); // min & max font-size
```

You can also change the defaults

```javascript
$.textStretch.defaults.minFontSize = 12; // minimum font size for future calls, unless called with an overspecifying argument
$(".stretch").textStretch(); // minFontSize is now 12, as defined above
$(".stretch").textStretch({ minFontSize: 0 }); // minFontSize is disabled for this call
```

### Good to know
* If using web fonts: Call from window.load (not document.ready) to be sure the font loads first.
* Elements with `display:inline` or `display:inline-block` without a specified width will not stretch. It really wouldn't make sense if they did.
* Will break in some cases if you use the `!important` css rule.
* `line-height`, `letter-spacing` and `word-spacing won't scale if specified using `px` unit. See [#8](https://github.com/friday/textStretch.js/issues/8)