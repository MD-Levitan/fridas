Java.perform(function () {

    var SystemDef = Java.use('java.lang.System');

    var RuntimeDef = Java.use('java.lang.Runtime');

    var exceptionClass = Java.use('java.lang.Exception');

    var SystemLoad_1 = SystemDef.load.overload('java.lang.String');

    var SystemLoad_2 = SystemDef.loadLibrary.overload('java.lang.String');

    var RuntimeLoad_1 = RuntimeDef.load.overload('java.lang.String');

    var RuntimeLoad_2 = RuntimeDef.loadLibrary.overload('java.lang.String');

    var ThreadDef = Java.use('java.lang.Thread');

    var ThreadObj = ThreadDef.$new();

    // SystemLoad_1.implementation = function(library) {
    //     send("Loading dynamic library => " + library);
    //     stackTrace();
    //     return SystemLoad_1.call(this, library);
    // }

    SystemLoad_2.implementation = function (library) {
        send("Loading dynamic library(System loadLibrary) => " + library);
        stackTrace();
        SystemLoad_2.call(this, library);
        return;
    }

    // RuntimeLoad_1.implementation = function(library) {
    //     send("Loading dynamic library => " + library);
    //     stackTrace();
    //     RuntimeLoad_1.call(this, library);
    //     return;
    // }

    RuntimeLoad_2.implementation = function (library) {
        send("Loading dynamic library(Runtime loadLibrary) => " + library);
        stackTrace();
        RuntimeLoad_2.call(this, library);
        return;
    }

    function stackTrace() {
        // var stack = ThreadObj.currentThread().getStackTrace();
        // for (var i = 0; i < stack.length; i++) {
        //     send(i + " => " + stack[i].toString());
        // }
        // send("--------------------------------------------------------------------------");
    }

});


Interceptor.attach(Module.findExportByName("libc.so", "dlopen"), {

    onEnter: function (args) {
        send("Loading dynamic library(dlopen) => " + args[0].readCString());
    },
});


Interceptor.attach(Module.findExportByName("libc.so", "dlsym"), {

    onEnter: function (args) {
        this.on_load = false;
        if (args[1].readCString() == "JNI_OnLoad") {
            //console.log(Process.findModuleByAddress(args[0]));
            this.on_load = true;
            send("Loading function(dlsym) => (" + args[0] + ", " + args[1].readCString() + ")");
        }
    },
    onLeave: function (ret) {
        var module = Process.findModuleByAddress(ret);
        if (module && this.on_load) {
            console.log(module.name);
        }
    }
});
