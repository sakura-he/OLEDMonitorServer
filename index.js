var sysInfo = require('systeminformation')
var net = require('net')
var infoKey, infoValue
var message = '0@Err:Err-0@Err:Err-0@Err:Err-0@Err:Err'
    // 获取指定系统信息;具体配置可以参考 https://systeminformation.io/
infoKey = {
    cpuCurrentspeed: 'avg', // cpu当前平均速度 单位GHZ
    cpuTemperature: 'main', // cpu当前平均温度 单位摄氏度
    mem: '*', //'active,free,total', // 已用内存和剩余内存 单位字节
    currentLoad: 'currentload',
    fsSize: '*',
    dockerInfo: '*',
    versions: '*',
    osInfo: '*',
    system: '*',
    processes: '*',
    cpu: '*',
}

var server = net.createServer(function(socket) {
    console.log('检测到TCP链接')
        // 当客户端发送数据时触发
    socket.on('data', function(data) {
        if (data == 'get') {
            console.log(message)
            socket.write(message) //  向客户端发送最新数据
        }
    })
})
server.listen(34453, (socket) => console.log(`服务器启动成功,端口号:${server.address().port}`))
    // 2s更新一次数据
setInterval(function() {
    getInfo()
}, 3000)

// 获取服务器的系统信息
function getInfo() {
    sysInfo
        .get(infoKey)
        .then((data) => {
            infoValue = data
            message = `?1@Cpu@${infoValue.cpuCurrentspeed.avg}@GHz@1.99@1\\1@CPUtemperature@${infoValue.cpuTemperature.main}@*C@100@0\\2@MEM@${Math.round(infoValue.mem.active / 100000000) / 10}@GB@${Math.round(infoValue.mem.total / 100000000) / 10}@CPULoaded#${Math.round(infoValue.currentLoad.currentload)}#%#100\\3@Docker:${infoValue.dockerInfo.containers}@value@unit@max@运行中#${infoValue.dockerInfo.containersRunning}#个#已暂停#${infoValue.dockerInfo.containersPaused}#个#已停止#${infoValue.dockerInfo.containersStopped}#个\\3@软件版本@value@unit@max@Nodejs#${infoValue.versions.node}# #Docker#${infoValue.versions.docker}# #python#${infoValue.versions.python}# !`
            console.log(message)
            console.log(infoValue)
        })
        .catch((_error) => console.log(_error))
}