<!--
## To do
1. New event binding method. Current one binds a new event every time textStretch is run. Better to bind one event, which goes through some list of methods or elements.
2. Document every aspect
3. Test with web fonts again
4. Test browsers & mobile browsers (pinch-zoom)
5. Put up forkable codepen-link
6. Set up grunt-script for minification
7. More cases? Width auto for calc-class?
8. Go back to cloning instead?
-->

# textStretch.js

A jQuery extension for stretching a text to the width of the element (or a fixed width) by changing it's font-size.

There are at least five other scripts with the same purpose. But I didn't like them, because they weren't roubust enough, required wrappers, or didn't work intuitive, or with dynamic texts. So I wrote my own.


## Requirements
textStretch requires jQuery 1.7 or later.

## How it works (techy)
textStretch temporarily applies a class to your element(s), making them inline-blocks. This is done to find out how wide the content (text) is. Then that information is used along with the font-size and the elements natural width to calculate a new font-size.

When the window is resized or when the device is rotated textStretch is run again. To speed up the process part of the calculation is saved from the first time.

## How to use
Load jQuery and the script.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="jquery.textStretch.js"></script>
```
Apply textStretch to a set of elements

```javascript
$(".stretch").textStretch();
```

### Options for with, min/maxFontSize and force-refreshing.
Using the json-format

1. width - for a fixed width. If unspecified the elements width is used (which is probably what you want).
2. maxFontSize - Maximum font size (optional)
3. minFontSize - Minimum font size (optional)
4. refresh - Set to true if you changed the text or font-size. textStretch caches part of the calculation, which needs to be recalculated in these cases.


```javascript
$(".stretch").textStretch({width: 300}); // force width to 300
$(".stretch").textStretch({minFontSize: 12}); // minimum font size
$(".stretch").textStretch({minFontSize: 12, minFontSize: 64}); // min & max font-size
```

You can also permanently change these settings

```javascript
$.fn.textStretch.defaults.minFontSize = 12; // minimum font size for all calls
$(".stretch").textStretch(); // minFontSize is now 12
$(".stretch").textStretch({minFontSize: 0}); // minFontSize disabled again
```

## Note
1. Doesn't work for inline or inline-block elements. It really wouldn't make sense if it did.
2. Will break if font has been declared with "!important". Just don't do it.
3. If using web fonts, call from window.load, not document.ready. Else it will be calculated for the fallback font.