/**
 * Source Code for the employee directory
 */
(() => {
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

    getRandomUsers(console.log);
})();