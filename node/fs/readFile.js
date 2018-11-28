// readFile是有内存限制的，因为它会把内存全部先放到内存中

let fs = require('fs');

fs.open('a.md', 'r', (err, fd) => {
  let buffer = Buffer.alloc(3) //分配内存

  

})