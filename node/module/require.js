// 在commonjs 规范中一个文件就是一个模块，这个与脚步不同的在于，模块有自己的作用域。在一个文件里面定义的变量，函数，类，都是私有的，对其他文件不可见。
// 那么如何实现的呢，就是利用闭包，将读取到的代码，放入到一个闭包中去执行。

// const user = require('./user');
// console.log(user);

// 根据传入的模块路径先转换为绝对路径，拿到这个绝对路径去缓存中查看这个文件是否存在，如何存在返回缓存，如果没有则创建一个模块。将读取出文件的内容，加一个闭包执行
// 缓存的作用解决循环依赖的问题，写完我的require实现，测试一下是否可以解决循环引用的问题

const fs = require('fs');
const path = require('path');
const vm = require('vm');

//引入一个文件就会创建一个module实例
function Module(p) {
  this.id = p;
  this.exports = {}; //exports 属性，用来存储模块的内容
  this.loaded = false; 
}

// 静态变量

Module.wrapper = [
  "(function (exports, require, module, __dirname, __filename) {", "\n})"
];

Module._cacheModule = {};

// 不同的后缀对应的处理函数
Module._extensions = {
  ".js": function () {
    let script = fs.readFileSync(module.id, 'utf8');

    let fn = Module.wrap(script);

    // 传入的执行对象是module.exports这个属性是一个空对象，所以在node中执行的js文件中打印this就是一个空对象
    vm.runInThisContext(fn).call(module.exports, module.exports, req, module);
    //执行了这个函数之后就在模块的实例上的exports属性上添加了模块的内容 

    return module.exports
  },
  ".json": function (module) {
    // 将读出的字符串转换成对象
    return JSON.parse(fs.readFileSync(module.id, 'utf8'));
  }
}

Module.prototype.wrap = function (content) {
    return Module.wrapper[0] + content + Module.wrapper[1];
}

Module.prototype.load = function (filePath) {
  let ext = path.extname(filePath);

  // 为什么要将module传进去
  let content = Module._extensions[ext](this);

  return content;
}

// 可能没有后缀也可能有后缀，先去加js后缀去查找文件，如何加了能够找到就返回，如果找不到就找json的文件，如何都找不到就报错

Module._resolveFileName = function (moduleId) {

  const absolutePath = path.resolve(moduleId);
  
  if (!(/\.\w+$/.test(absolutePath))) {
    // 没有后缀名

    const extendArr = Object.keys(Module._extensions);

    for (let i = 0; i < extendArr.length; i++) {
      let filePath = absolutePath + extendArr[i];
      try {
        fs.accessSync(file);
        return file
      } catch (e) {
        if (i >= extendArr.length) throw new Error("not found module");
      }
    }
  } else {
    // 有后缀名
    return absolutePath;
  }
}


function req(moduleId) {
  // 先将这个id转换为绝对路径
  let p = Module._resolveFileName(moduleId);
  console.log('Module._resolveFileName p is', p);

  // 然后通过这个绝对路径创建一个模块
  if (Module._cacheModule[p]) {
    // 直接将exports属性返回
    return Module._cacheModule[p].exports;
  }
  let module = new Module(p);

  let content = module.load(p);

  Module._cacheModule[p] = module;
  module.loaded = true;

  module.exports = content;

  return module.exports;

}


const a = req('./user');
console.log(a);
// console.log(Module._resolveFileName('./user'));