/**
 * Separate object for modal dialog control
 * 
 * I put this into "my" also. I do not want to pollute the global namespace
 * more than neccessary.
 */

window.my = window.my || {};

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
        if ($(event.target).hasClass("modal-overlay") || 
            $(event.target).hasClass("modal-content__closebutton")) {
            publicApi.close();
        } 
    });

    return publicApi;
}