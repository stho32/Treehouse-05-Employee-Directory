/**
 * Common Tool Functions
 * 
 * Some functions are of universal value. I combine them all 
 * into a global "my", like that $ for jquery.
 */

window.my = window.my || {};

/* Convert simple text to html, so that the API can't mess
up our directory in case values contain < or something. */
window.my.htmlEncode = (text) => {
    return $('<div />').text(text).html();
}