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

/* Capitalize the first letter of each word in the string . */
window.my.capitalize = (text) => {
    let words = text.split(" ");

    for(let i = 0; i < words.length; i++) {
        if ( words[i].length > 0 ) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
    }

    return words.join(" ");
}