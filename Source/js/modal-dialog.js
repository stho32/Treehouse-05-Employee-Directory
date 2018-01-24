/**
 * Separate object for modal dialog control
 */

window.my = {};

window.my.modal = (selector) => {
    let publicApi = {};

    publicApi.Selector = selector;
    publicApi.$DomElement = $(selector);

    publicApi.show = () => {
        publicApi.$DomElement.show();
    }

    publicApi.close = () => {
        publicApi.$DomElement.hide();
    }

    publicApi.$DomElement.on("click", (event) => {
        publicApi.close();
    });

    return publicApi;
}