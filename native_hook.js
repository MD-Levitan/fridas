Interceptor.attach(Module.getExportByName('libname.so', 'function'), {
    onEnter: function(args) {
    },
    onLeave: function(retval) {
        console.log("Inside alow_write now...");
    }
});