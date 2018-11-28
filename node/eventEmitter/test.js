const EventEmitter = require('./index.js');
const { inherits } = require('util');

class Girl {
   
}

// 使用node的继承工具方法
inherits(Girl, EventEmitter);

const girl = new Girl('嘻嘻');

console.log(girl);

function eat() {
  console.log('girl eat is run.');
}
function cry() {
  console.log('girl cry is run.');
}

function marry() {
  console.log('我结婚了'); 
}

// on的时候调用这个方法的是这个girl实例，所以实例上没有这些属性
girl.on('饿了', eat);
girl.on('饿了', cry);

girl.emit('饿了');

// 取消掉某个事件的某个事件回调
girl.off('饿了', cry);
girl.emit('饿了');


girl.once('结婚', marry);
girl.emit('结婚');
girl.emit('结婚');
girl.emit('结婚');


