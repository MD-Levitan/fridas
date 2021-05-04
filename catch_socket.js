const AF_INET = 2;
const AF_INET6 = 10;

var sockets = {};
var sockets_message = {};


var calculate_offset = (address) => {
    var modules = Process.enumerateModules();
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        console.log("Module [" + module.name + "], offset: " + module.base + " end: " + module.base.add(module.size));
        if (address >= module.base && address <= module.base.add(module.size)) {
            console.log(module.name);
            return address.sub(module.base);
        }
    }
    return undefined;
}

var find_library = (address) => {
    var modules = Process.enumerateModules();
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        // console.log("Module [" + module.name + "], offset: " + module.base + " end: " + module.base.add(module.size));
        if (address >= module.base && address <= module.base.add(module.size)) {
            return module.name;
        }
    }
    return undefined;
}

Interceptor.attach(Module.findExportByName("libc.so", "socket"), {

    // int socket(int domain, int type, int protocol);
    onEnter: function (args) {


        this.domain = args[0];
        this.type = args[1];
        this.protocol = args[2];
        this.inet = false;

        if (this.domain == AF_INET || this.domain == AF_INET6) {
            this.inet = true;
            console.log('socket(' + this.domain + ", " + this.type + ", " + this.protocol + ")");
            console.log(find_library(this.returnAddress));
            // console.log('Context  : ' + JSON.stringify(this.context));
            // console.log('Return   : ' + this.returnAddress);
            console.log();

        }
    },

    onLeave: function (retval) {
        if (this.inet) {
            sockets[retval] = [this.domain, this.type, this.protocol];
        }
        return retval;
    }
});

