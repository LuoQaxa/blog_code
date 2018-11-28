function EventEmitter(){
  // this.events = Object.create(null);
}

  /**
   * 注册
   */
EventEmitter.prototype.on = function(eventName, callback) {
    // 由于调用这个实例的时候实例对象上没有events属性，所以需要加上这个属性
    if (!this.events) this.events = Object.create(null);
    if(this.events.eventName) {
      this.events.eventName.push(callback);
    } else {
      this.events.eventName = [callback];
    }
  }


EventEmitter.prototype.off = function(eventName, callback) {
  if (this.events.eventName) {
    // 将这个callback从数组中去除
    // 在数组中找到这个callback
    // 删除数组中的某一个指定项
    // filter 将这个指定项过滤
    this.events.eventName = this.events.eventName.filter(cb => cb != callback );
  }
    
}

EventEmitter.prototype.emit = function(eventName) {
  this.events.eventName.forEach(cb => {
      cb();
    });
  }

/**
 * 只能触发一次
 */
EventEmitter.prototype.once = function(eventName, callback) {
  // 如何只能触发一次呢
  // 可以改造一个这个callback，等这个callback执行完成之后就将这个callback去掉
  // 这样的数组只是传了一个函数，而调用这个函数的时候并没有传入参数，所以就会出现问题
  function one(eventName, callback) {
    callback(eventName, callback);
    this.off(eventName, callback);
  }
  
  this.on(eventName, one);

}
module.exports = EventEmitter;