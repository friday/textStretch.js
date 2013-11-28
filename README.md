# textStretch.js

A jQuery extension for stretching a text to the width of the element (or a fixed width) by changing it's font-size.

There are at least five other scripts with the same purpose. But I didn't like them, because they weren't roubust enough, required wrappers, or didn't work intuitive, or with dynamic texts. So I wrote my own.

## How it works
Include jQuery, if you haven't. Then the script itself.

```html
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
4. refresh - Set to true if you changed the text.


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

## To do
1. New event binding method. Current one binds a new event every time textStretch is run. Better to bind one event, which goes through some list of methods or elements.
2. Proper documentation
3. Find out min-jQuery-version
4. Test with web fonts again
5. Test browsers & mobile browsers (pinch-zoom)
6. Put up forkable codepen-link
7. Set up grunt-script for minification

## Note
1. Doesn't work for inline or inline-block elements. It really wouldn't make sense if it did.
2. Will break if font has been declared with "!important". Just don't do it.
3. If using web fonts, call from window.load, not document.ready. Else it will be calculated for the fallback font.