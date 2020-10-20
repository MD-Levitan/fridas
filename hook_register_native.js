var RevealNativeMethods = function () {
    var ptr_size = Process.pointerSize;
    var env = Java.vm.getEnv();
    var RegisterNatives = 215, FindClassIndex = 6; // https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
    var jclassAddress2NameMap = {};

    // Find pointer to native Java method
    function getNativeAddress(idx) {
        return env.handle.readPointer().add(idx * ptr_size).readPointer();
    }

    // Intercepting FindClass to populate Map<address, jclass>
    Interceptor.attach(getNativeAddress(FindClassIndex), {
        onEnter: function (args) {
            jclassAddress2NameMap[args[0]] = args[1].readCString();
        }
    });

    /**
     * RegisterNative(jClass*, .., JNINativeMethod *methods[nMethods], uint nMethods)
     * https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#977
     */
    Interceptor.attach(getNativeAddress(RegisterNatives), {
        /**
         *  https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#129
         *  
         *  typedef struct {
         *      const char* name;
         *      const char* signature;
         *      void* fnPtr;
         *  } JNINativeMethod;
         */
        onEnter: function (args) {
            var struct_size = ptr_size * 3; // = sizeof(JNINativeMethod)
            var methods_ptr = ptr(args[2]);

            for (var i = 0, n_methods = parseInt(args[3]); i < n_methods; i++) {

                var method_name = methods_ptr.add(i * struct_size).readPointer();
                var method_signature = methods_ptr.add(i * struct_size + ptr_size).readPointer();
                var method_fnPtr = methods_ptr.add(i * struct_size + (ptr_size * 2)).readPointer(); // void* fnPtr

                var jClass = jclassAddress2NameMap[args[0]].split('/');
                var module_name = DebugSymbol.fromAddress(method_fnPtr)['moduleName']; // https://www.frida.re/docs/javascript-api/#debugsymbol
                var base_pointer =Module.findBaseAddress(module_name);

                console.log('\x1b[3' + '6;01' + 'm', JSON.stringify({
                    module: module_name,
                    base_pointer: base_pointer,
                    package: jClass.slice(0, -1).join('.'),
                    class: jClass[jClass.length - 1],
                    method: method_name.readCString(), // char* name
                    signature: method_signature.readCString(), // char* signature TODO Java bytecode signature parser { Z: 'boolean', B: 'byte', C: 'char', S: 'short', I: 'int', J: 'long', F: 'float', D: 'double', L: 'fully-qualified-class;', '[': 'array' } https://github.com/skylot/jadx/blob/master/jadx-core/src/main/java/jadx/core/dex/nodes/parser/SignatureParser.java
                    address: method_fnPtr,
                    clear_address: method_fnPtr.sub(base_pointer),
                }), '\x1b[39;49;00m');
            }
        }
    });
}

Java.perform(RevealNativeMethods);