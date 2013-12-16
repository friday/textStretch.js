# textStretch.js - jQuery version

A jQuery extension for maximizing font sizes to fill out the element's width.

textStretch.js is minimal, fast and robust. It doesn't require or add any wrappers or child-elements, and it adapts to when you resize the window or flip your device.

textStretch is build with older browsers in mind. It's tested and works with Chrome, Safari, Firefox and Internet Explorer (I haven't tested any version older than 6 though). If you can find a browser it doesn't work with, please contact me.

## Download
[minified](http://albinlarsson.com/textStretch.js/dist/jquery.textStretch.min.js)<br/>
[uncompressed](http://albinlarsson.com/textStretch.js/dist/jquery.textStretch.js)

## How to use

#### Load jQuery (1.7 or later) and the script
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="jquery.textStretch.min.js"></script>
```

#### ...and apply textStretch to your element(s)
```javascript
$(".stretch").textStretch();
```
#### It's that easy!

### Arguments
There are two optional argumets: `maxFontSize` and `minFontSize`. They're both disabled (`0`) by default.

#### This is how they're used

```javascript
// minimum font size
$(".stretch").textStretch({minFontSize: 12});
```

```javascript
// min & max font-size
$(".stretch").textStretch({minFontSize: 12, maxFontSize: 60});
```

### Changing the defaults
The default min & max font-sizes can be changed this way

```javascript
// setting default max font size
$.textStretch.defaults.maxFontSize = 100;
```
Future calls will use the new default
```javascript
// max font size will be 100 pixels, as defined above
$(".stretch").textStretch();
```
Unless...
```javascript
// disable maxFontSize for this call
$(".stretch-no-max").textStretch({maxFontSize: 0});
```
## Good to know
* If using web fonts: Call from window.load (not document.ready) to be sure the font loads first.
* Elements with `display: inline` (or `display: inline-block` without a specified width) will not stretch, because they have no width.
* Calculations will break in some rare cases if you use the `!important` css rule.
* Apply `white-space: nowrap` to the element if you want to avoid it from temporarily line-breaking while the window is scaled down.
* Fonts are sometimes drawn outside of their specified width. It's a font feature, and not a bug in textStretch. If can be avoided using using a `margin` specified with the `em` unit (see index.html).

## How it actually works
textStretch temporarily applied some css to make your elements inline-blocks. Then it can get the text-width. That width is then used in relation to the box width to calculate and set a new font-size.
