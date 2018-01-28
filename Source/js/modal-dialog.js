/**
 * Separate object for modal dialog control
 * 
 * I put this into "my" also. I do not want to pollute the global namespace
 * more than neccessary.
 */

window.my = window.my || {};

window.my.modal = (selector) => {
    let publicApi = {};

    publicApi.Selector    = selector;
    publicApi.$DomElement = $(selector);
    publicApi.$LeftArrow  = publicApi.$DomElement.find(".arrow-left");
    publicApi.$RightArrow = publicApi.$DomElement.find(".arrow-right");

    publicApi.show = () => {
        publicApi.$DomElement.show();
    }

    publicApi.close = () => {
        publicApi.$DomElement.hide();
    }

    publicApi.setLeftArrowActive = (booleanValue) => {
        publicApi.$LeftArrow.toggleClass("active", booleanValue);
    }

    publicApi.setRightArrowActive = (booleanValue) => {
        publicApi.$RightArrow.toggleClass("active", booleanValue);
    }

    /* A custom event handler that we can overwrite from
       our "client" application. */
    publicApi.leftArrowClickedCustomEventHandler = () => {
        alert("left arrow clicked!");
    }

    /* Our own handler that calls the custom event handler */
    function leftArrowClicked() {
        if (publicApi.$LeftArrow.hasClass("active")) {
            publicApi.leftArrowClickedCustomEventHandler();
        }
    }
    publicApi.$LeftArrow.on("click", leftArrowClicked);
    
    /* And a custom event handler for the right arrow, too. */
    publicApi.rightArrowClickedCustomEventHandler = () => {
        alert("right arrow clicked!");
    }

    /* Our own handler that calls the custom event handler */
    function rightArrowClicked() {
        if ( publicApi.$RightArrow.hasClass("active")) {
            publicApi.rightArrowClickedCustomEventHandler();
        }
    }
    publicApi.$RightArrow.on("click", rightArrowClicked);

    publicApi.$DomElement.on("click", (event) => {
        if ($(event.target).hasClass("modal-overlay") || 
            $(event.target).hasClass("modal-content__closebutton")) {
            publicApi.close();
        } 
    });

    return publicApi;
}