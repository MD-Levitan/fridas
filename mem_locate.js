
var baseAddress = Module.findBaseAddress("libname.so");
var libname = "libname";
var container = {};

Interceptor.attach(Module.findExportByName("libc.so", "malloc"), {

    onEnter: function (args) {
        if (Process.findModuleByAddress(this.returnAddress).name.startsWith(libname)) {

            this.info = { "size": this.context.x0, "ret_addr": this.returnAddress.sub(baseAddress) };

        }
        else {
            this.info = null;
        }
    },
    onLeave: function (retval) {
        if (this.info) {
            container[retval] = this.info;
            // console.log(`${JSON.stringify(container[retval])}`);
        }
    }
});


Interceptor.attach(Module.findExportByName("libc.so", "realloc"), {

    onEnter: function (args) {
        if (Process.findModuleByAddress(this.returnAddress).name.startsWith(libname)) {
            if (container[this.context.x0] != null) {
                var info = container[this.context.x0];
                //console.log(`${info.ret_addr}  => ${args[0].readByteArray(parseInt(info.size, 16))}`);
                console.log(`${JSON.stringify(info)}`);
                console.log(args[0].readByteArray(parseInt(info.size, 16)));
                console.log(args[0].readCString());
                console.log();
            }

            this.info = { "size": this.context.x1, "ret_addr": this.returnAddress.sub(baseAddress) };

        }
        else {
            this.info = null;
        }
    },
    onLeave: function (retval) {
        if (this.info) {
            container[retval] = this.info;
            // console.log(`${JSON.stringify(container[retval])}`);
        }
    }
});

Interceptor.attach(Module.findExportByName("libc.so", "free"), {

    onEnter: function (args) {
        if (Process.findModuleByAddress(this.returnAddress).name.startsWith(libname)) {
            if (container[this.context.x0] != null) {
                var info = container[this.context.x0];
                //console.log(`${info.ret_addr}  => ${args[0].readByteArray(parseInt(info.size, 16))}`);
                console.log(`${JSON.stringify(info)}`);
                console.log(args[0].readByteArray(parseInt(info.size, 16)));
                console.log(args[0].readCString());
                console.log();
            }

        }
    },
});
