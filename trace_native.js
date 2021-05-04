function processJniOnLoad(libraryName) {
    const funcSym = "JNI_OnLoad";
    const funcPtr = Module.findExportByName(libraryName, funcSym);

    console.log("[+] Hooking " + funcSym + "() @ " + funcPtr + "...");
    // jint JNI_OnLoad(JavaVM *vm, void *reserved);
    var funcHook = Interceptor.attach(funcPtr, {
        onEnter: function (args) {
            const vm = args[0];
            const reserved = args[1];
            console.log("[+] " + funcSym + "(" + vm + ", " + reserved + ") called");
        },
        onLeave: function (retval) {
            console.log("[+]\t= " + retval);
        }
    });
}

function waitForLibLoading(libraryName) {
    var isLibLoaded = false;

    Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
        onEnter: function (args) {
            var libraryPath = Memory.readCString(args[0]);
            if (libraryPath.includes(libraryName)) {
                console.log("[+] Loading library " + libraryPath + "...");
                isLibLoaded = true;
            }
        },
        onLeave: function (args) {
            if (isLibLoaded) {
                processJniOnLoad(libraryName);
                isLibLoaded = false;
            }
        }
    });
}

Java.perform(function() {
    const libraryName = "libwhatsapp.so";
    waitForLibLoading(libraryName);
});
