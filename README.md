# textStretch.js

# Under development

A jQuery extension for stretching a text to the width of the element (or a fixed width) by changing it's font-size.

There are at least five other scripts with the same purpose. But I didn't like them, because they weren't roubust enough, required wrappers, or didn't work intuitive, or with dynamic texts. So I wrote my own.

### Requirements
textStretch requires jQuery 1.7 or later.

### How it works (techy)
textStretch temporarily applies a class to your element(s), making them inline-blocks. This is done to find out how wide the content (text) is. Then that information is used along with the font-size and the elements natural width to calculate a new font-size.

When the window is resized or when the device is rotated textStretch is run again. To speed up the process part of the calculation is saved from the first time and the class doesn't need to be applied again.

### How to use
Load jQuery and the script.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="jquery.textStretch.js"></script>
```

Apply textStretch to a set of elements

```javascript
$(window).load(function () {
  $(".stretch").textStretch();
});
```

### Options
You can add some parameters to how Using the json-format

* width - for a fixed width. If unspecified the elements width is used (which is probably what you want).
* maxFontSize - Maximum font size (optional)
* minFontSize - Minimum font size (optional)
* refresh - Set to true if you changed the text. textStretch caches part of the calculation, which needs to be recalculated if the text is changed.

```javascript
$(".stretch").textStretch({width: 300}); // force width to 300
$(".stretch").textStretch({minFontSize: 12}); // minimum font size
$(".stretch").textStretch({minFontSize: 12, minFontSize: 64}); // min & max font-size

$(".stretch").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit."); //changing content
$(".stretch").textStretch({refresh: true}); // must refresh because of 
```

You can also change the defaults

```javascript
$.textStretch.defaults.minFontSize = 12; // minimum font size for future calls
$(".stretch").textStretch(); // minFontSize is now 12
$(".stretch").textStretch({minFontSize: 0}); // minFontSize disabled again
```

### Quirks
* If using web fonts: Call from window.load (not document.ready) to be sure the font loads first.
* Doesn't work on elements with `display:inline` or `display:inline-block` (unless a width is specified with inline-block). It really wouldn't make sense if it did.
* Will break in some cases if you use the `!important` css rule.