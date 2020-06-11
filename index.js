var sysInfo = require("systeminformation");
var net = require("net");
var infoKey, infoValue;
var message = "0@Err:Err-0@Err:Err-0@Err:Err-0@Err:Err";
// 获取指定系统信息;具体配置可以参考 https://systeminformation.io/
infoKey = {
    cpuCurrentspeed: 'avg',  // cpu当前平均速度 单位GHZ
    cpuTemperature: 'main',  // cpu当前平均温度 单位摄氏度
    mem: 'used,free',  // 已用内存和剩余内存 单位字节
    fsSize: '*'
}

var server = net.createServer(function (socket) {
    console.log("检测到TCP链接");
    // 当客户端发送数据时触发
    socket.on("data", function (data) {
        if (data == "get") {
            console.log(message);
            socket.write(message);//  向客户端发送最新数据
        }
    });
});
server.listen(553, (socket) => console.log(`服务器启动成功,端口号:${server.address().port}`))
// 2s更新一次数据
setInterval(function () {
    getInfo();
}, 2000);

// 获取服务器的系统信息
function getInfo() {
    try {
        sysInfo.get(infoKey).then(data => infoValue = data);
        message =
        // 视图@icon@key@value@unit@all
            `?1@1@Cpu@${infoValue.cpuCurrentspeed.avg}@GHz@1.9-1@8@CpuT@${infoValue.cpuTemperature.main}@C@100-1@3@MEM@${Math.round(infoValue.mem.used / 100000000) / 10}/${Math.round(infoValue.mem.free / 100000000) / 10}@GB@0!`;
    } catch (error) {
        console.log(error);
    }
}