function Middleware(){
   this.cache = [];
   this.options = null;//缓存options
}

Middleware.prototype.use = function(fn){
  if(typeof fn !== 'function'){
    throw 'middleware must be a function';
  }
  this.cache.push(fn);
  return this;
}

Middleware.prototype.next = function(fn){
  if(this.middlewares && this.middlewares.length > 0 ){
    var ware = this.middlewares.shift();

    ware.call(this, this.options, this.next.bind(this));//传入options与next
  }
}
Middleware.prototype.handleRequest = function(options){
	//执行请求
  this.middlewares = this.cache.map(function(fn){//复制
    return fn;
  });
  this.options = options;//缓存数据
  this.next();
}


//用法
function validate(options, next){
  // console.log('validate', options.data);
  console.log('validate');
  if(true) {
  	return false;
  }
  next();//通过验证
}
function send(options, next){
	//模拟异步
   setTimeout(function(){
   	 console.log('tomeout');
     // console.log('send', options.data);
     // options.url = 'www.baidu.com';//设置跳转的url
     next();
    }, 1000);
}
function goBack(options){
   console.log('goTo');
   // console.log(options.url)
}

var submitForm = new Middleware();
submitForm
	.use(validate)
	.use(send)
	.use(goBack);

submitForm.handleRequest();

