textStretch.js
==============

A jQuery extension for stretching a text to the width of the element.
There's at least three other scripts for the same cause. But I didn't like them, because they weren't roubust enough, required wrappers, or didn't work intuitive, or with dynamic texts. So I wrote my own, and shelfed it until now.

# How it works
Include jQuery, if you haven't. Then the script itself.

```html
<script src="jquery.textStretch.js"></script>
```
Apply textStretch to a set of elements

```javascript
$(".stretch").textStretch();
```
Options can be added, using the json-format
The options available are width, max- and minFontSize.
If width is not specified it defaults to the element width (what you usually want).

```javascript
$(".stretch").textStretch({width: 300});
```

## To do
1. Proper documentation
2. Find out min-jQuery-version
3. Test with web fonts again
4. Test responsiveness 
5. Put up forkable codepen-link

## Note
1. Doesn't work for inline or inline-block elements. It really wouldn't make sense if it did.
2. Will break if font has been declared with "!important". Just don't do it.
3. If using web fonts, call from window.load, not document.ready. Else it will be calculated for the fallback font.