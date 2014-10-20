var mobileMS = kendo.observable({
                                    is_device: true,
                                    latest_lat: 0,
                                    latest_lng: 0,
                                    fn_mobileMS_update: function(e) {

                                        alert(mobileMS.is_device);
                                        
                                        if (mobileMS.is_device === false) {

                                            alert("t");
                                            
                                            // for testing
                                        //    var device = { uuid: "00002", name: "TestMode_name2", phonegap: "TestMode_phonegap2", platform: "TestMode_platform2", version: "2.0" };

                                        }

                                        $.ajax({
                                            type : "POST",
                                            url: _str_url + 'mobileMS.ashx',
                                            data: {

                                                device_uuid: device.uuid,
                                                device_name: device.name,
                                                device_phonegap: device.phonegap,
                                                device_platform: device.platform,
                                                device_version: device.version,
                                                latest_lat: mobileMS.latest_lat,
                                                latest_lng: mobileMS.latest_lng,
                                                process_type: 'ADD_DEVICE'
                                            },
                                                   beforeSend : function() {
                                                       //_fn_log("start mobilems");
                                                   },
                                                   success: function(val) {       

                                                       //if have error
                                                       if (val.indexOf("Error") > -1) {
                                                           var json = jQuery.parseJSON(val);
                                                           _fn_error(json.Messages[0].Msg, "mobileMS.js");
                                                       }
                                                   },
                                                   error: function (xhr, status, error) {
                                                       _fn_error('fn_mobileMS_update ' + error, "mobileMS.js");
                                                   },         
                                                   async: false,         
                                                   cache: false     
                                              
                                               });
                                    }
                                      
                                });