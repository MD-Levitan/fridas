Java.perform(function () {
  var Socket = Java.use("java.net.Socket");

  Socket.$init.overload().implementation = function () {
      console.log("socket constructor: Socket()");
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init();
  };

  Socket.$init.overload("java.net.InetAddress","int").implementation = function (p1,p2) {
      console.log("socket constructor: Socket(InetAddress host, int port)");
      console.log(p1.getHostAddress());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2);
  };

  Socket.$init.overload("java.net.InetAddress","int","boolean").implementation = function (p1,p2,p3) {
      console.log("socket constructor: Socket(InetAddress host, int port, boolean stream)");
      console.log(p1.getHostAddress());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2,p3);
  };

  Socket.$init.overload("java.net.InetAddress","int","java.net.InetAddress","int").implementation = function (p1,p2,p3,p4) {
      console.log("socket constructor: Socket(InetAddress host, int port, InetAddress localAddr, int localPort)");
      console.log(p1.getHostAddress());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2,p3,p4);
  };

  Socket.$init.overload("java.net.Proxy").implementation = function (p1) {
      console.log("socket constructor: Socket(Proxy proxy)");
      console.log(p1.address().toString());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1);
  };

  Socket.$init.overload("java.net.SocketImpl").implementation = function (p1) {
      console.log("socket constructor: Socket(SocketImpl impl)");
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1);
  };

  Socket.$init.overload("java.lang.String","int").implementation = function (p1,p2) {
      console.log("socket constructor: Socket(String host, int port)");
      console.log(p1);
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2);
  };

  Socket.$init.overload("java.lang.String","int","boolean").implementation = function (p1,p2,p3) {
      console.log("socket constructor: Socket(String host, int port, boolean stream)");
      console.log(p1);
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2,p3);
  };

  Socket.$init.overload("java.lang.String","int","java.net.InetAddress","int").implementation = function (p1,p2,p3,p4) {
      console.log("socket constructor: Socket(String host, int port, InetAddress localAddr, int localPort)");
      console.log(p1);
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2,p3,p4);
  };

  Socket.connect.overload("java.net.SocketAddress").implementation = function (endPoint) {
      console.log("socket connection establishing (1)");
      console.log(endPoint.toString());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.connect(endPoint);
  };

  Socket.connect.overload("java.net.SocketAddress","int").implementation = function (endPoint, timeout) {
      console.log("socket connection establishing (2)");
      console.log(endPoint.toString());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.connect(endPoint,timeout);
  };



  ///////////////////////////////////


  var DatagramSocket = Java.use("java.net.DatagramSocket");

  DatagramSocket.$init.overload().implementation = function () {
      console.log("socket constructor: DatagramSocket()");
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init();
  };

  DatagramSocket.$init.overload("java.net.DatagramSocketImpl").implementation = function (p1) {
      console.log("socket constructor: DatagramSocket(DatagramSocketImpl impl)");
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1);
  };

  DatagramSocket.$init.overload("int").implementation = function (p1) {
      console.log("socket constructor: DatagramSocket(int port)");
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1);
  };

  DatagramSocket.$init.overload("int","java.net.InetAddress").implementation = function (p1,p2) {
      console.log("socket constructor: DatagramSocket(int port, InetAddress laddr)");
      console.log(p2.getHostAddress());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1,p2);
  };

  DatagramSocket.$init.overload("java.net.SocketAddress").implementation = function (p1) {
      console.log("socket constructor: DatagramSocket(SocketAddress bindAddr)");
      console.log(p1.toString());
      Java.perform(function() {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
      });
      return this.$init(p1);
  };

  DatagramSocket.bind.implementation=function(p1){
    console.log("binding DatagramSocket");
    console.log(p1.toString());
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.bind(p1);
  };

  DatagramSocket.connect.overload("java.net.InetAddress","int").implementation=function(p1,p2){
    console.log("connecting DatagramSocket (1)");
    console.log(p1.getHostAddress());
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.connect(p1,p2);
  };

  DatagramSocket.connect.overload("java.net.SocketAddress").implementation=function(p1){
    console.log("connecting DatagramSocket (2)");
    console.log(p1.toString());
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.connect(p1);
  };



////////////////////////////


  var ServerSocket = Java.use("java.net.ServerSocket");

  ServerSocket.$init.overload().implementation = function () {
    console.log("socket constructor: ServerSocket()");
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.$init();
  };

  ServerSocket.$init.overload("int").implementation = function (p1) {
    console.log("socket constructor: ServerSocket(int port)");
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.$init(p1);
  };

  ServerSocket.$init.overload("int","int").implementation = function (p1,p2) {
    console.log("socket constructor: ServerSocket(int port,int backLog)");
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.$init(p1,p2);
  };

  ServerSocket.$init.overload("int","int","java.net.InetAddress").implementation = function (p1,p2,p3) {
    console.log("socket constructor: ServerSocket(int port,int backLog, InetAddress bindAddr)");
    console.log(p3.getHostAddress());
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.$init(p1,p2,p3);
  };

  ServerSocket.bind.overload("java.net.SocketAddress").implementation = function (p1) {
    console.log("binding ServerSocket (1)");
    console.log(p1.toString());
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.bind(p1);
  };

  ServerSocket.bind.overload("java.net.SocketAddress","int").implementation = function (p1, p2) {
    console.log("binding ServerSocket (2)");
    console.log(p1.toString());
    Java.perform(function() {
      console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    });
    return this.bind(p1,p2);
  };
});
