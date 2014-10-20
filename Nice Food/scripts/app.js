////START - config
var _str_url = "";

_str_url = "http://develop.alchemedia-01.ximnet.my/XTOPIA/dev/xtopia_platform_d02/API/";
//_str_url = "http://Lab_TelerikAppBuilder_NiceFood.ximnet.com.my/services/"

var _int_update_location_internal = 5000; //miliseconds to update location to database
var _int_check_update_internal = 5000; //miliseconds to check if need to update (used in report_crime.js)
var _int_distance_KM_update_device = 5; // how many KM to update device on a new reported crime
var _int_to_update_device = 0; // to update device crime display or not

var _user_email = "huisheng@ximnet.com.my"; //store user email, temporary use my email, later change to FB email
var _user_ID = "123456"; //store user ID, temporary use 123456, later change to FB ID
var _food_photo_width = 1024; //resize food photo to this width
var _food_photo_height = 1024; //resize food photo to this height
var _food_photo_quality = 80; //compress food photo to this quality

//END - config

function _fn_error(str_error, str_page) {
    alert(str_error + " @ " + str_page);
}
function _fn_log(str_log) {
    $("#log").html($("#log").html + "<br />" + str_log);
}

(function () {
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    // create an object to store the models for each view
    window.APP = {
        models: {
            home: {
                    title: 'Home'
                },
            settings: {
                    title: 'Settings'
                }
        }
    };

    //check if page is in device or web
    is_device_check = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    
    is_device_check=true;
    
    //in device
    if (is_device_check) {
    
        mobileMS.is_device = true;

        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function () {
            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            navigator.splashscreen.hide();

            app = new kendo.mobile.Application(document.body, {

                // comment out the following line to get a UI which matches the look
                // and feel of the operating system
                skin: 'flat',

                // the application needs to know which view to load first
                initial: 'views/home.html'
            });

            //on load, we update the device information
            mobileMS.fn_mobileMS_update();

        }, false);

    } else {
        //in web browser

        mobileMS.is_device = false;

        app = new kendo.mobile.Application(document.body, {

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'flat',

            // the application needs to know which view to load first
            initial: 'views/home.html'
        });

        //on load, we update the device information
        mobileMS.fn_mobileMS_update();

    }

    

}());