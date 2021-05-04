// var modules = Process.enumerateModules();
// for (let index = 0; index < modules.length; index++) {
//     const module = modules[index];
//     console.log("Module [" + module.name + "], offset: " + module.base);
// }


var lib_name = "BannerExample";
var baseAddress = Module.findBaseAddress(lib_name);

Interceptor.attach(Module.getExportByName(lib_name, 'GADCanonicalURL'), {
    onEnter: function (args) {
        console.log('Context information:');
        console.log('Context            : ' + JSON.stringify(this.context));
        console.log('Return             : ' + this.returnAddress);
        console.log('Return(Offset)     : ' + this.returnAddress.sub(baseAddress));
        console.log(ObjC.Object(args[0]));
        
        // var m = Memory.readCString(args[1]);
        // if (m != 'length' && !m.startsWith('_fastC'))
        //     send(m);
    }
});