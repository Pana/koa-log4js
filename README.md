koa-log4js
==========

Log4js logger middleware for koa.


## Install
```
npm install koa-log4js
```


## Example
```
var koa = require('koa');
var logger = require('koa-log4js');


var app = koa();

app.use(logger());  // 使用默认console logger

app.use(function* (){
    this.body = "Hello koa-log4js";
});
app.listen(3000);


// or
app.use(logger({
    "filename": "relative/path/to/log_file.log"
}));



```