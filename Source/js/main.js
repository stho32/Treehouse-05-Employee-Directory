/**
 * Source Code for the employee directory
 */
(() => {
    const $employeeDirectory = $(".employee-directory");
    /**
     * Requests 12 random users from the api. On success the 
     * callback function is called with an array parameter that 
     * contains all the data as retrieved from randomuser.me.
     * 
     * @param {function} callbackFunction function to be called back
     */
    function getRandomUsers(callbackFunction) {
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

    function showUsersInDom(users) {
        let resultHtml = "";

        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let userHtml = template;

            userHtml = userHtml.replace("$image$", user.picture.large);
            userHtml = userHtml.replace("$firstname$", user.name.first);
            userHtml = userHtml.replace("$surname$", user.name.last);
            userHtml = userHtml.replace("$email$", user.email);
            userHtml = userHtml.replace("$city$", user.location.city);

            resultHtml += userHtml;
        }

        $employeeDirectory.html(resultHtml);
    }

    getRandomUsers(showUsersInDom);
})();