var lib_name = "some.so";
var _module = Module.findBaseAddress(lib_name);
var base = Module.findBaseAddress(lib_name);
var startTraceOffset = 0x000543d0, numInstructionsToTrace = 0x300;
var startTrace = base.add(startTraceOffset), endTrace = startTrace.add(4 * (numInstructionsToTrace - 1));

var started = false;


Interceptor.attach(base.add(startTraceOffset), {
    onEnter: function (args) {

        if (started == true) return;
        started = true;

        var tid = Process.getCurrentThreadId();
        this.tid = tid;
        console.warn(`onEnter [ ${tid} ]`);


        Stalker.follow(tid, {
            transform: function (iterator) {
                var instruction;
                while ((instruction = iterator.next()) !== null) {
                    if (instruction.address <= endTrace && instruction.address >= startTrace) {

                        iterator.putCallout(function (context) {

                            var offset = ptr(context.pc).sub(base);
                            var inst = Instruction.parse(context.pc).toString();
                            console.log('Context  : ' + JSON.stringify(context));
                            console.log();

                            if (inst.split(' ')[0].startsWith('b')) {
                                var add = "";
                                var param = inst.split(' ')[1];
                                if (param in context) {
                                    add = context[param].sub(base);
                                }
                                else {
                                    add = (new NativePointer(param.substr(1))).sub(base);
                                }
                                console.log(`${context.pc.sub(base)} ${inst} => ${add}`);
                            }
                            else {
                                console.log(`${context.pc.sub(base)} ${inst}`);
                            }
                            console.log();

                        });
                    }
                    iterator.keep();
                }
            }
        })
    },
    onLeave: function (retval) {
        console.log(`onLeave [ ${this.tid} ]`);
        // cleanup
        Stalker.unfollow(this.tid);
        Stalker.garbageCollect();
    }
})