var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var CloudPush = require("ti.cloudpush");

CloudPush.debug = true;

CloudPush.focusAppOnPush = false;

CloudPush.showTrayNotification = true;

CloudPush.showTrayNotificationsWhenFocused = true;

CloudPush.showAppOnTrayClick = true;

CloudPush.retrieveDeviceToken({
    success: function(e) {
        CloudPush.enabled = true;
        Ti.API.info("retrieved device token: " + e.deviceToken);
        Ti.App.Properties.setString("pushNotification.deviceToken", e.deviceToken);
    },
    error: function(e) {
        Ti.API.error("Can't retrieve DeviceToken! " + e.error);
    }
});

CloudPush.addEventListener("callback", function(evt) {
    Ti.API.info("New push message: " + JSON.stringify(evt));
    alert(JSON.stringify(evt));
    Ti.App.fireEvent("app:CloudPush.callback", evt);
});

CloudPush.addEventListener("trayClickLaunchedApp", function(evt) {
    alert("Triggered when the push notifications is in the tray when the app is not running");
    Ti.App.fireEvent("app:CloudPush.trayClickLaunchedApp", evt);
});

CloudPush.addEventListener("trayClickFocusedApp", function(evt) {
    alert("Triggered when the push notifications is in the tray when the app is running");
    Ti.App.fireEvent("app:CloudPush.trayClickFocusedApp", evt);
});

Alloy.createController("index");