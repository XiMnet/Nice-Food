//START - config
var _str_url = "";
_str_url = "http://develop.alchemedia-01.ximnet.my/ximnet_lab/TelerikAppBuilder/NiceFood/web/services/";
//_str_url = "http://lab_telerikappbuilder_mobileproto1.ximnet.com.my/services/"

var _int_update_location_internal = 5000; //miliseconds to update location to database
var _int_check_update_internal = 5000; //miliseconds to check if need to update (used in report_crime.js)
var _int_distance_KM_update_device = 5; // how many KM to update device on a new reported crime
var _int_to_update_device = 0; // to update device crime display or not

var _user_email = "huisheng@ximnet.com.my"; //store user email, temporary use my email, later change to FB email
var _user_ID = "123456"; //store user ID, temporary use 123456, later change to FB ID

//END - config


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
                },
            contacts: {
                    title: 'Contacts',
                    ds: new kendo.data.DataSource({
                                                      data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
                                                  }),
                    alert: function(e) {
                        alert(e.data.name);
                    }
                }
        }
    };

    // this function is called by Cordova when the application is loaded by the device
    //   document.addEventListener('deviceready', function () {  
    // hide the splash screen as soon as the app is ready. otherwise
    // Cordova will wait 5 very long seconds to do it for you.
    //   navigator.splashscreen.hide();

    app = new kendo.mobile.Application(document.body, {
        
                                           // comment out the following line to get a UI which matches the look
                                           // and feel of the operating system
                                           skin: 'flat',

                                           // the application needs to know which view to load first
                                           initial: 'views/home.html'
                                       });
    // }, false);
}());