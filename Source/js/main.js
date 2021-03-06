/**
 * Source Code for the employee directory
 */
(() => {
    "use strict";

    const $employeeDirectory = $(".employee-directory");
    const $employeeDirectoryLoading = $(".employee-directory-loading");
    const $searchboxQuery = $("#searchbox-query");
    $searchboxQuery.val("");
    const modal = window.my.modal(".modal-overlay");
    let modalDialogUserIndex = -1;
    let currentUserData = [];
    let filteredUserData = [];

    const template = `
    <div class="employee-card" data-index="$index$">
        <div class="employee-card_image" style="background-image: url('$image$');"></div>
        <div class="employee-card_details">
            <div class="employee-card_details_name">$firstname$ $surname$</div>
            <div class="employee-card_details_email">$email$</div>
            <div class="employee-card_details_city">$city$</div>
        </div>
    </div>
    `;

    /**
     * Converts the names of the users, the city and state to first-letter-upper-case
     * 
     * @param {*} users 
     */
    function captializeNames(users) {
        $.each(users, function(index, value) {
            users[index].name.first      = my.capitalize(users[index].name.first);
            users[index].name.last       = my.capitalize(users[index].name.last);
            users[index].location.state  = my.capitalize(users[index].location.state);
            users[index].location.city   = my.capitalize(users[index].location.city);
            users[index].location.street = my.capitalize(users[index].location.street);
        });
    }

    /**
     * Requests 12 random users from the api. On success the 
     * callback function is called with an array parameter that 
     * contains all the data as retrieved from randomuser.me.
     * 
     * @param {function} callbackFunction function to be called back
     */
    function getRandomUsers(callbackFunction) {
        showLoadingAnimation();

        $.ajax({
            url: 'https://randomuser.me/api/?nat=us,dk,fr,gb',
            dataType: 'json',
            data: {
                results: 12
            },
            success: function (data) {
                /* Do some optimization on data before it gets processed */
                captializeNames(data.results);
                currentUserData = data.results;
                filteredUserData = data.results;
                callbackFunction(data.results);
            }
        });
    }

    /**
     * This function takes the information for one user and does all 
     * the neccessary things to display the information within the 
     * modal dialog. 
     * 
     * @param {number} index Index of the user in the current filtered data
     * @param {*} user 
     */
    function updateEmployeeModalFromUserData(index, user) {
        /* When index is > 0 then there are more employees
         * "left" of it.
         */
        modal.setLeftArrowActive(index > 0);
        /* When the index is less then the entries in the filtered data, 
         * then there are more employees "right" of it.
         */
        modal.setRightArrowActive(index < (filteredUserData.length-1));
            
        /* */
        $(".modal-content__image img").attr("src", user.picture.large);
        $(".modal-content__name").html(my.htmlEncode(user.name.first + " " + user.name.last));
        $(".modal-content__email").html(
            '<a href="mailto:' + my.htmlEncode(user.email) + '">' + 
            my.htmlEncode(user.email) + '</a>');
        $(".modal-content__state").html(my.htmlEncode(user.location.state));
        $(".modal-content__phoneNr").html(my.htmlEncode(user.cell));
        $(".modal-content__location").html(my.htmlEncode(user.location.street + ", " + user.location.city + ", " + user.location.state + " " + user.location.postcode));
        $(".modal-content__birthday").html("Birthday: " + user.dob.substring(0, 10));
    }

    /**
     * Event handler for the click event on the employee card. 
     * It opens the modal dialog with the correct data. 
     * One event handler to handle them all. Thats why I store 
     * the index in the cards dom data attribute.
     * 
     * @param {*} event 
     */
    function showEmployeeModal(event) {
        var card = $(event.target).closest(".employee-card");
        var index = $(card).data("index");

        var user = filteredUserData[index];
        modalDialogUserIndex = index;

        if (user !== undefined) {
            updateEmployeeModalFromUserData(index, user);
            modal.show();
        }
    }

    /**
     * Three dots animated in a row, to be looked 
     * at while ajax is calling out to the world...
     */
    function showLoadingAnimation() {
        $employeeDirectoryLoading.show();
        $employeeDirectory.html("");
    }

    /**
     * World came around, gave us information, 
     * No loading anymore...
     */
    function hideLoadingAnimation() {
        $employeeDirectoryLoading.hide();
    }

    function filterUsersBySearchquery() {
        let searchQuery = $searchboxQuery.val();

        /* In case we have no search data
           just show everything. */
        if ( searchQuery === undefined ||
             searchQuery === "" ) {
            filteredUserData = currentUserData;
            showUsersInDom(currentUserData);
            return; 
        }

        let users = [];
        searchQuery = searchQuery.toLowerCase();

        currentUserData.forEach(user => {
            let username = (user.name.first + " " + user.name.last).toLowerCase();

            if ( username.indexOf(searchQuery) > -1 ) {
                users.push(user);
            }
        });
        
        filteredUserData = users;
        showUsersInDom(filteredUserData);
    }

    /* Show the mentioned users in the DOM */
    function showUsersInDom(users) {
        $employeeDirectory.off("click");
        $searchboxQuery.off("keyup");
        let resultHtml = "";

        for (let i = 0; i < users.length; i++) {
            let user = users[i];

            let userHtml = template;

            userHtml = userHtml.replace("$index$", i.toString());
            userHtml = userHtml.replace("$image$", my.htmlEncode(user.picture.large));
            userHtml = userHtml.replace("$firstname$", my.htmlEncode(user.name.first));
            userHtml = userHtml.replace("$surname$", my.htmlEncode(user.name.last));
            userHtml = userHtml.replace("$email$", my.htmlEncode(user.email));
            userHtml = userHtml.replace("$city$", my.htmlEncode(user.location.city));

            resultHtml += userHtml;
        }

        $employeeDirectory.html(resultHtml);
        hideLoadingAnimation();

        $employeeDirectory.on("click", showEmployeeModal);
        $searchboxQuery.on("keyup", filterUsersBySearchquery);
    }

    modal.leftArrowClickedCustomEventHandler = () => {
        if ( modalDialogUserIndex > 0 ) {
            modalDialogUserIndex -= 1;
            updateEmployeeModalFromUserData(modalDialogUserIndex, filteredUserData[modalDialogUserIndex]);
        }
    }

    modal.rightArrowClickedCustomEventHandler = () => {
        if ( modalDialogUserIndex < (filteredUserData.length-1) ) {
            modalDialogUserIndex += 1;
            updateEmployeeModalFromUserData(modalDialogUserIndex, filteredUserData[modalDialogUserIndex]);
        }
    }

    getRandomUsers(showUsersInDom);
})();