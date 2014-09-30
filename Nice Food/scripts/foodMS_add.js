
//Google Map variables
var map;
var marker;
var markers = [];
var infoWindow;
var infoWindow_Food;
var _curr_lat;
var _curr_lng;

//Autocomplete variables
var input
var searchform
var place;
var autocomplete;

var foodMS_add = kendo.observable({
                                      description: "Description",
                                      isDescriptionShown: false,
                                      showDescription: function (e) {
                                          // show the span by setting isDescriptionShown to true
                                          this.set("isDescriptionShown", true);
                                      },
                                      showMessage: function (e) {
                                          alert(this.get("isDescriptionShown"));
                                      },
                                      fn_take_picture: function (e) {
                                          alert('take');
                                      },
                                      fn_cancel_food_add: function (e) {
                                          $("#ul-food-add").hide();
                                          $("#map-canvas").show();
                                          $("#ul-google-place").show();
                                      },
                                      fn_find_place_on_map: function (e) {
                                          var newlatlong = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                                          // fn_search_nearby(1, place.geometry.location.lat(), place.geometry.location.lng());

                                          map.setCenter(newlatlong);
                                          marker.setPosition(newlatlong);
                                          map.setZoom(19);

                                          var html = "Your selected area.";

                                          google.maps.event.addListener(marker, 'click', function () {
                                              infoWindow_Food.setContent(html);
                                              infoWindow_Food.open(map, marker);
                                          });

                                          // resolve location name by coordinates
                                          var geocoder;
       
                                          geocoder = new google.maps.Geocoder();
                                          geocoder.geocode({ 'latLng': newlatlong }, function (results, status) {
                                              if (status == google.maps.GeocoderStatus.OK) {
                                                  if (results[1]) {
                                                      $("#report-location").html(results[1].formatted_address);
                                                  } else {
                                                      // alert('No results found');
                                                      $("#report-location").html("Address not found.");
                                                  }
                                              } else {
                                                  alert('Geocoder failed due to: ' + status);
                                              }
                                          });
                                      }
                                  });
//kendo.bind($("#foodMS_add"), viewModel);

var fn_foodMS_add_after_show = function (e) {
    //if (kendo.ui.DropDownList) {
    //    $("#dropdown").kendoDropDownList({
    //        // The options are needed only for the desktop demo, remove them for mobile.
    //        popup: { appendTo: body },
    //        animation: { open: { effects: body.hasClass("km-android") ? "fadeIn" : body.hasClass("km-ios") || body.hasClass("km-wp") ? "slideIn:up" : "slideIn:down" } }
    //    });
    //}
    //if (kendo.ui.Slider) {
    //    $("#slider").kendoSlider({ tooltip: { enabled: false } });
    //}
    input = document.getElementById('location');
    //searchform = document.getElementById('ul-google-place');
    autocomplete = new google.maps.places.Autocomplete(input);

    //Add listener to detect autocomplete selection
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        place = autocomplete.getPlace();
    });

    //Reset the input box on click
    input.addEventListener('click', function () {
        input.value = "";
    });

    //START to get user location by geolocation
    if (navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            //console.log('Your current position is:');
            //console.log('Latitude : ' + crd.latitude);
            //console.log('Longitude: ' + crd.longitude);
            //console.log('More or less ' + crd.accuracy + ' meters.');

            var pos = new google.maps.LatLng(crd.latitude, crd.longitude);

            var mapOptions = {
                zoom: 18,
                center: pos
            }

            _curr_lat = crd.latitude;
            _curr_lng = crd.longitude;

            $('#report-lat').html(_curr_lat);
            $('#report-lng').html(_curr_lng);

            //   fn_search_nearby(5, _curr_lat, _curr_lng);

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            marker = new google.maps.Marker({
                                                position: pos,
                                                map: map,
                                                title: 'Main map'
                                            });

            infowindow = new google.maps.InfoWindow({
                                                        map: map,
                                                        position: pos,
                                                        content: 'Your are here!'
                                                    });

            infoWindow_Food = new google.maps.InfoWindow();

            map.setCenter(pos);

            google.maps.event.addListener(map, 'click', function (event) {
                //call function to create marker
                if (marker) {
                    marker.setMap(null);
                    marker = null;
                }
                // marker = createMarker(event.latLng, "name", "<b>Location</b><br>" + event.latLng);
                $("#ul-food-add").show();
                $("#map-canvas").hide();
                $("#ul-google-place").hide();

                var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

                $("#report-lat").html(event.latLng.lat());
                $("#report-lng").html(event.latLng.lng());

                var geocoder;
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //map.setZoom(11);
                            //marker = new google.maps.Marker({
                            //    position: latlng,
                            //    map: map
                            //});
                            $("#report-location").html(results[1].formatted_address);
                        } else {
                            // alert('No results found');
                            $("#report-location").html("Address not found.");
                        }
                    } else {
                        //  alert('Geocoder failed due to: ' + status);
                    }
                });

                var currentTime = new Date();
                var month = currentTime.getMonth() + 1;
                var day = currentTime.getDate();
                var year = currentTime.getFullYear();
                var hours = currentTime.getHours();
                var minutes = currentTime.getMinutes();
                var seconds = currentTime.getSeconds();
                var AMPM = '';
                if (hours > 11) {
                    AMPM = 'PM'
                } else {
                    AMPM = 'AM'
                }

                $("#report-date").html(year + '/' + month + '/' + day + ' ' + formatAMPM(currentTime));
            });

            // resolve location name by coordinates
            var geocoder;
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': pos }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $("#report-location").html(results[1].formatted_address);
                    } else {
                        // alert('No results found');
                        $("#report-location").html("Address not found.");
                    }
                } else {
                    alert('Geocoder failed due to: ' + status);
                }
            });
        };

        function error(err) {
            //console.warn('ERROR(' + err.code + '): ' + err.message);
            alert('Location Service failed. Please try again later.');
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        alert('Please enable your Location.');
    }
    //END to get user location by geolocation

    //camera init
    cameraApp = new cameraApp();
    cameraApp.run();
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//camera
function cameraApp() {
}

cameraApp.prototype = {
    _pictureSource: null,

    _destinationType: null,

    run: function () {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
        id("capturePhotoButton").addEventListener("click", function () {
            that._capturePhoto.apply(that, arguments);
        });
        id("capturePhotoEditButton").addEventListener("click", function () {
            that._capturePhotoEdit.apply(that, arguments)
        });
        id("getPhotoFromLibraryButton").addEventListener("click", function () {
            that._getPhotoFromLibrary.apply(that, arguments)
        });
        id("getPhotoFromAlbumButton").addEventListener("click", function () {
            that._getPhotoFromAlbum.apply(that, arguments);
        });
    },

    _capturePhoto: function () {
        var that = this;

        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function () {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
                                        quality: 50,
                                        destinationType: that._destinationType.DATA_URL
                                    });
    },

    _capturePhotoEdit: function () {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function () {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
                                        quality: 20, allowEdit: true,
                                        destinationType: cameraApp._destinationType.DATA_URL
                                    });
    },

    _getPhotoFromLibrary: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);
    },

    _getPhotoFromAlbum: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    },

    _getPhoto: function (source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function () {
            that._onPhotoURISuccess.apply(that, arguments);
        }, function () {
            cameraApp._onFail.apply(that, arguments);
        }, {
                                        quality: 50,
                                        destinationType: cameraApp._destinationType.FILE_URI,
                                        sourceType: source
                                    });
    },

    _onPhotoDataSuccess: function (imageData) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';

        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },

    _onPhotoURISuccess: function (imageURI) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';

        // Show the captured photo.
        smallImage.src = imageURI;
    },

    _onFail: function (message) {
        alert(message);
    }
}