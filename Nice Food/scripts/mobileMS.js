var mobileMS = kendo.observable({
                                    latest_lat: 0,
                                    latest_lng: 0,
                                    fn_mobileMS_update: function(e) {
                                        
                                        $.ajax({
                                                   type : "POST",
                                                   url : _str_url + 'mobileMS_API.ashx',
                                                   data : {
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
                                                       console.log(val);
                                                       if (val.indexOf("Error") > -1) {
                                                      //     var json = jQuery.parseJSON(val);
                                                      //     _fn_error(json.Messages[0].Msg);
                                                       }
                                                   },
                                                   error: function (xhr, status, error) {
                                                       _fn_error('fn_mobileMS_update' + error);
                                                   },         
                                                   async: false,         
                                                   cache: false     
                                              
                                               });
                                    }
                                      

    
                                });