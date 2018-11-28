// stream 也是继承于事件系统 eventEmitter

const EventEmitter = require('events');
const fs = require('fs');


class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.highWaterMark = 3;
    // 读取的时候可以传入start end
    // 定义了如何读取这个文件
    this.start = options.start;
    this.end = options.end;
    // this.options = options || {};

    // 当开始添加事件的时候
    this.on('newListener', (event) => {
      if (event === 'data') {
        // 开始读取
        // 首先打开文件
        this.open();
        this.flowing = true;
      }
    })
    // 初始化为最开始的位置
    this.pos = this.start;
  }

  open() {
    fs.open(this.path, 'r', (err, fd) => {
      if (err) {
        this.emit('error', err);
      } else {
        // 触发已经打开成功事件
        this.emit('open', fd);
        // 可以在这里继续读取
        // 开始读取
        this.fd = fd;
        this.read(fd);
      }
    })
  }

  read(fd) {
  
    // 读取文件需要文件描述符，buffer为什么需要buffer， offset， length， pos;
    // buffer是用来装读取文件的容器
    // 创建buffer，分配allocate一些空间
    const buffer = Buffer.alloc(this.highWaterMark);

    // 读取的时候位置是不断变化的
    // 这个位置是根据end 和 highWaterMark的值来确定的
  
    // 每次读多少的量 
    let howMuchToRead = this.end ? Math.min((this.end - this.pos), this.highWaterMark): this.highWaterMark;
    // 0, 6
    // 0,2
    // 3,5,
    // 6
    // fs.read 
    fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead, buffer) => {
      this.pos += bytesRead;
      // 如何判断已经读完
      if (bytesRead > 0) {
        this.emit('data', buffer.slice(0, bytesRead));
        if (this.flowing) {
          this.read();
        }
      } else {
        this.emit('end');
        this.flowing = null;
        return this.close();
      }
    })
  }

  pause() {
    this.flowing = false;
  }

  resume() {
    this.flowing = true;
    this.read();
  }

  close() {
    
    fs.close(this.fd, () => {
      this.emit('close');
    })
  }

  
  
}

module.exports = ReadStream;
