/**
 * Source Code for the employee directory
 */
(() => {
    const $employeeDirectory = $(".employee-directory");
    const $employeeDirectoryLoading = $(".employee-directory-loading");
    const modal = window.my.modal(".modal-overlay");
    modal.close();

    const template = `
    <div class="employee-card">
        <div class="employee-card_image" style="background-image: url('$image$');"></div>
        <div class="employee-card_details">
            <div class="employee-card_details_name">$firstname$ $surname$</div>
            <div class="employee-card_details_email">$email$</div>
            <div class="employee-card_details_city">$city$</div>
        </div>
    </div>
    `;

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
            success: function(data) {
              callbackFunction(data.results);
            }
        });
    }

    function showLoadingAnimation() {
        $employeeDirectoryLoading.show();
        $employeeDirectory.html("");
    }

    function hideLoadingAnimation() {
        $employeeDirectoryLoading.hide();
    }

    /* Convert simple text to html, so that the API can't mess
       up our directory in case values contain < or something. */
    function htmlEncode(text) {
        return $('<div />').text(text).html();
    }

    /* Show the mentioned users in the DOM */
    function showUsersInDom(users) {
        $employeeDirectory.off("click");
        let resultHtml = "";

        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let userHtml = template;

            userHtml = userHtml.replace("$image$", htmlEncode(user.picture.large));
            userHtml = userHtml.replace("$firstname$", htmlEncode(user.name.first));
            userHtml = userHtml.replace("$surname$", htmlEncode(user.name.last));
            userHtml = userHtml.replace("$email$", htmlEncode(user.email));
            userHtml = userHtml.replace("$city$", htmlEncode(user.location.city));

            resultHtml += userHtml;
        }

        $employeeDirectory.html(resultHtml);
        hideLoadingAnimation();
        $employeeDirectory.on("click", modal.show);
    }

    

    getRandomUsers(showUsersInDom);
})();