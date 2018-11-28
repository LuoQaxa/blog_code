const fs = require('fs');
const ReadStream = require('./readStream');

// const rs = fs.createReadStream('../a.md', {
//   highWaterMark: 3
// });

// 如何让这个rs可读流开始读取

// 只要监听了data事件，就会变成一个可读流
// data 是读取的内容，类型是buffer
// rs.on('data', (data) => {
//   console.log(data);
// })
// rs.on('end', () => {
//   console.log('end and data is');
// })


const rs = new ReadStream('./a.md');
rs.on('data', (data) => {
  console.log(data);
})
rs.on('open',  () => {
  console.log('文件被打开了')
})
rs.on('end', () => {
  console.log('end and data is');
})

rs.on('error', (err) => {
  console.log('error is happen, and err is', err); 
})

