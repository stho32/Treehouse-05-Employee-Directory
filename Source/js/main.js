/**
 * Source Code for the employee directory
 */
(() => {
    "use strict";

    const $employeeDirectory = $(".employee-directory");
    const $employeeDirectoryLoading = $(".employee-directory-loading");
    const modal = window.my.modal(".modal-overlay");
    let currentUserData = [];

    const template = `
    <div class="employee-card" data-index="$index$">
        <div class="employee-card_image" style="background-image: url('$image$');"></div>
        <div class="employee-card_details">
            <div class="employee-card_details_name">$firstname$ $surname$</div>
            <div class="employee-card_details_email">$email$</div>
            <div class="employee-card_details_state">$state$</div>
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
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            data: {
                results: 12
            },
            success: function (data) {
                /* Do some optimization on data before it gets processed */
                captializeNames(data.results);

                callbackFunction(data.results);
            }
        });
    }

    function showEmployeeModal(event) {
        var card = $(event.target).closest(".employee-card");
        var index = $(card).data("index");

        var user = currentUserData[index];

        if (user !== undefined) {

            $(".modal-content__image img").attr("src", user.picture.large);
            $(".modal-content__name").html(my.htmlEncode(user.name.first + " " + user.name.last));
            $(".modal-content__email").html(
                '<a href="mailto:' + my.htmlEncode(user.email) + '">' + 
                my.htmlEncode(user.email) + '</a>');
            $(".modal-content__state").html(my.htmlEncode(user.location.state));
            $(".modal-content__phoneNr").html(my.htmlEncode(user.cell));
            $(".modal-content__location").html(my.htmlEncode(user.location.street + ", " + user.nat + " " + user.location.postcode));
            $(".modal-content__birthday").html("Birthday: " + user.dob.substring(0, 10));

            modal.show();
        }

    }

    function showLoadingAnimation() {
        $employeeDirectoryLoading.show();
        $employeeDirectory.html("");
    }

    function hideLoadingAnimation() {
        $employeeDirectoryLoading.hide();
    }

    /* Show the mentioned users in the DOM */
    function showUsersInDom(users) {
        $employeeDirectory.off("click");
        let resultHtml = "";

        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let userHtml = template;

            userHtml = userHtml.replace("$index$", i.toString());
            userHtml = userHtml.replace("$image$", my.htmlEncode(user.picture.large));
            userHtml = userHtml.replace("$firstname$", my.htmlEncode(user.name.first));
            userHtml = userHtml.replace("$surname$", my.htmlEncode(user.name.last));
            userHtml = userHtml.replace("$email$", my.htmlEncode(user.email));
            userHtml = userHtml.replace("$state$", my.htmlEncode(user.location.state));

            resultHtml += userHtml;
        }

        $employeeDirectory.html(resultHtml);
        hideLoadingAnimation();
        currentUserData = users;
        $employeeDirectory.on("click", showEmployeeModal);
    }

    getRandomUsers(showUsersInDom);
})();