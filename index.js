var cpuLoad = 0, cpuT = 0;
var message = "";
var sysInfo = require("systeminformation");
var net = require("net");

var server = net.createServer(function (socket) {
    console.log("服务器创建完成");
    // 当客户端发送数据时触发
    socket.on("data", function (data) {
        // 更新message字符串
        if (data == "get") {
            console.log("请求获取数据");
            socket.write(message);//  向客户端发送最新数据
        }

    });

});
server.listen(558, (socket) => {
    console.log(`服务器启动成功,端口号:${server.address().port}`);
})
function getInfo() {
    sysInfo.networkInterfaces().then(data => console.log(data[1].ip4))
    // 获取cpu主要温度
    sysInfo.cpuTemperature().then(data => cpuT = Math.round(data.main));
    // 获取系统所有负载信息
    sysInfo.currentLoad().then(data => cpuLoad = Math.round(data.currentload));
    message = `?${cpuT}-${cpuLoad}!`;
}
setInterval(function () {
    getInfo();
}, 2000);