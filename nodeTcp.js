var net = require("net");
var server = net.createServer(function (socket) {
    console.log("someone connects");
})
server.listen(553,function(){
    var address = server.address();
    console.log(`服务器地址是${address.address},端口是${server.address().port}.`)
})