var mobileMS = kendo.observable({
    

                                        fn_deviceMS_update: function(e) {
                                            
                                            $.ajax({
                                                       type : "POST",
                                                       url : _str_url + 'mobileMS_device_update.ashx',
                                                       data : {
                                                           
                                                    process_type: "ADD"
                                                },
                                                       beforeSend : function() {
                                                           _fn_log("start uploading");
                                                       }
                                                   });
                                        }
                                      

    
                                    });