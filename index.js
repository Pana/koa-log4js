var log4js = require('log4js');
var util = require('util');
var date = require('./lib/date_format.js');

// date, addr, method, url, HTTP/version, content-length, user-agent
var DEFAULT = "%s %s -- %s %s HTTP/%s, %s %s";
/*
* middleware
*/
module.exports = function(opts){
    var logger;
    if(!opts){
        logger = log4js.getLogger();  // 默认使用 console logger
    }else{
        var loggerName = 'normal';
        log4js.configure({
            appenders: [
                {
                    type: 'console'                
                },
                {
                    type: 'file', 
                    filename: opts.file, 
                    maxLogSize: opts.size || 10*1024*1024,
                    backups: opts.backups || 4,
                    category: loggerName
                }
            ],
            replaceConsole: true
        });
        logger = log4js.getLogger(loggerName);
    }

    return function* (next){
        var req = this.request, header = req.header, nodeReq = this.req;
        var str = util.format(DEFAULT, date.asString(new Date), req.ip, req.method, req.url, nodeReq.httpVersion, req.length || null, header['user-agent']);

        logger.debug(str);
        yield next;
    }
}


// where to get status, referer
// add more info
// 解析配置选项, 创建file logger, 支持log 内容配置
// 从其他middleware中可以获取到 logger  
// 日志格式可参看 log4js的 connetct-logger