
if(Ti.Platform.osname == "android"){
    var CloudPush = require('ti.cloudpush');  
        
    CloudPush.debug= true;
    CloudPush.focusAppOnPush = false;
    CloudPush.showTrayNotification = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.showAppOnTrayClick = true;         
    
    CloudPush.retrieveDeviceToken({
        success: function(e) {            
            
            CloudPush.enabled=true;            
            
            Ti.API.info('retrieved device token: '+e.deviceToken);
            Ti.App.Properties.setString('pushNotification.deviceToken', e.deviceToken);                                         
        },
        error: function(e) {                
            Ti.API.error('Can\'t retrieve DeviceToken! '+e.error);
        }
    });
    
    // Process incoming push notifications
    CloudPush.addEventListener('callback', function (evt) {
        // alert('Process incoming push notifications');
        Ti.API.info('New push message: '+JSON.stringify(evt));
        alert(JSON.stringify(evt));
        Ti.App.fireEvent('app:CloudPush.callback',evt);    
    });
    // Triggered when the push notifications is in the tray when the app is not running
    CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
        alert('Triggered when the push notifications is in the tray when the app is not running');
        Ti.App.fireEvent('app:CloudPush.trayClickLaunchedApp',evt);    
    });
    // Triggered when the push notifications is in the tray when the app is running
    CloudPush.addEventListener('trayClickFocusedApp', function (evt) {   
        alert('Triggered when the push notifications is in the tray when the app is running');
        Ti.App.fireEvent('app:CloudPush.trayClickFocusedApp',evt);    
    });    
}