var RevealNativeMethods = function () {
    var ptr_size = Process.pointerSize;
    var env = Java.vm.getEnv();
    var RegisterNatives = 215, FindClassIndex = 6; // https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
    var registered = false;

    var hooked_class = "com/smt/smt/smt";
    var lib_name = "libsmt.so";
    var raw_address = 0x5920c + 0x01;


    // Find pointer to native Java method
    function getNativeAddress(idx) {
        return env.handle.readPointer().add(idx * ptr_size).readPointer();
    }

    // Check every FindClass call
    Interceptor.attach(getNativeAddress(FindClassIndex), {
        onEnter: function (args) {
            // console.log(args[1].readCString());

            if (hooked_class == args[1].readCString() && !registered) {
                /* Attach to fucntion */
                var base_pointer = Module.findBaseAddress(lib_name);
                if (base_pointer == null) {
                    console.log("Faield to attach to lib");
                    return;
                }

                console.log(args[1].readCString());
                console.log(base_pointer);

                Interceptor.attach(new NativePointer(base_pointer.add(raw_address)),
                    {
                        onEnter: function (args) {
                          
                            console.log("Inside Native Function onEnter ...");

                            console.log('Context information:');
                            console.log('Context  : ' + JSON.stringify(this.context));
                            console.log('Return   : ' + this.returnAddress);
                            console.log('Return f : ' + this.returnAddress.sub(base_pointer));

                            console.log(args[0]);
                            console.log(args[1]);
                            console.log(args[2]);
                            console.log(args[3]);
                            console.log(args[4]);
                            

                        },
                        onLeave: function (retval) {
                            console.log("return: " + retval);
                        }

                    });

                registered = true;
            }
        }
    });


}

Java.perform(RevealNativeMethods);