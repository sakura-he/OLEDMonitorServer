var os = require('os-utils');  // 请求os包
os.cpuUsage(function(v){
		console.log( 'CPU Usage (%): ' + v );
});

os.cpuFree(function(v){
		console.log( 'CPU Free:' + v );
});
