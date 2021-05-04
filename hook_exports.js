var lib_name = "libname.so";
var module = Process.findModuleByName(lib_name);
var exports = Module.enumerateExports(lib_name);

for (let index = 0; index < exports.length; index++) {
    const element = exports[index];
    console.log(JSON.stringify(element));

    if (element.type == "function") {
        try {
            Interceptor.attach(new NativePointer(element.address),
                {
                    onEnter: function (args) {
                        console.log("Inside " + element.name);

                        console.log('Context information:');
                        console.log('Context  : ' + JSON.stringify(this.context));
                        console.log('Return   : ' + this.returnAddress);

                        // console.log("----------------");
                        // console.log(args[0].readCString());
                        // console.log("----------------");

                        // console.log("----------------");
                        // console.log(args[1].readCString());
                        // console.log("----------------");

                        console.log();

                    },

                });
        } catch (err) {

        }
    }
}
