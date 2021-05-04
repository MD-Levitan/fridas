// Interceptor.attach(Module.findExportByName('/usr/lib/libobjc.A.dylib', 'objc_msgSend'), {
//     onEnter: function(args) {
//      var m = Memory.readCString(args[1]);
//      if (m != 'length' && !m.startsWith('_fastC'))
//         send(m);
//     }
//   });

console.log(Module.findExportByName('/usr/lib/libobjc.A.dylib', 'objc_msgSend'));

Interceptor.attach(Module.findExportByName('/usr/lib/libobjc.A.dylib', 'objc_msgSend'), {
    onEnter: function (args) {
        var m = Memory.readCString(args[1]);
        if (m != 'length' && !m.startsWith('_fastC'))
            console.log(m);
    }
});