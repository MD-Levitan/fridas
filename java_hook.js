Java.perform(function () {
    var Activity = Java.use('com.somt.android.alog.Alog');
    console.log(Activity);
    Activity.nativeWrite.implementation = function () {
      console.log("Inside Jniint now...");
      return 0
    };
});