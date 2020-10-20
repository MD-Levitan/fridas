var ReadNativeSource = function () {
    var lib_name = "libsmt.so";
    var raw_address = 0x5920c + 0x01;
    var function_size = 0x400;

    var base_pointer = Module.findBaseAddress(lib_name);

    var source = (new NativePointer(base_pointer.add(raw_address))).readByteArray(function_size);
    console.log(source);
}

Java.perform(ReadNativeSource);
