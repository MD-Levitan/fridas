Interceptor.attach(Module.getExportByName('libname.so', 'function'), {
    onEnter: function(args) {
        log('Context information:');
        log('Context  : ' + JSON.stringify(this.context));
        log('Return   : ' + this.returnAddress);
    },
    onLeave: function(retval) {
        console.log("Inside alow_write now...");
    }
});