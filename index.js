var sysInfo = require("systeminformation");
var net = require("net");
var cpuLoad = 0, cpuT = 0, memUsed = 0, memFree = 0;
var message = "";
var infoKey = {
    cpuCurrentspeed: 'avg',  // cpu当前平均速度 单位GHZ
    cpuTemperature: 'main',  // cpu当前平均温度 单位摄氏度
    mem: 'used,free',  // 已用内存和剩余内存 单位字节
    fsSize: '*'

}
var infoValue;
var server = net.createServer(function (socket) {
    console.log("检测到TCP链接");
    // 当客户端发送数据时触发
    socket.on("data", function (data) {
        // 更新message字符串
        if (data == "get") {
            //console.log("请求获取数据");
            socket.write(message);//  向客户端发送最新数据
        }

    });

});
server.listen(553, (socket) => {
    console.log(`服务器启动成功${server.address().address},端口号:${server.address().port}`);
})

setInterval(function () {
    getInfo();
}, 2000);

// 获取服务器的系统信息
function getInfo() {

    try {
        sysInfo.get(infoKey).then(data => infoValue = data);
        message =
            `Cpu:${infoValue.cpuCurrentspeed.avg}GHz
            -CpuT:${infoValue.cpuTemperature.main}℃
            -MEMU:${Math.round(infoValue.mem.used / 100000000) / 10}GB
            -MEMF:${Math.round(infoValue.mem.free / 100000000) / 10}GB`;
    } catch (error) {
        message = "Err:Err-Err:Err-Err:Err-Err:Err"
    }

}


