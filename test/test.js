var koa = require('koa');
var app = koa();
var logger = require('../index.js');


var file = __dirname + '/normal.log'
app.use(logger({
    file: file
}));

app.use(function* (){
    this.body = 'Hello world';
});

app.listen(3000);
console.log("Koa app listen at 3000");