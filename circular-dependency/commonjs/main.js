console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done=%j, b.done=%j', a.done, b.done);


// 1. main starting
// 2. require a，立即执行a.js 输出 a starting，并导出 done = false；
// 3. a.js 加载 b.js 执行 b.js 并输出 b starting，导出 done = false;
// 4. b.js 加载 a.js，由于之前 a.js 已在main.js中加载过一次因此不会重复加载，缓存中 a.js 导出的 done = false，因此，b.js 输出 in b, a.done = false
// 5. b.js 导出 done = true，并输出 b done
// 6. b.js 执行完毕，执行权交回给 a.js，执行 a.js，并输出 in a, b.done = true
// 7. a.js 导出 done = true，并输出 a done
// 8. a.js 执行完毕，执行权交回给 main.js，main.js 加载 b.js，由于之前 b.js 已加载过一次，不会重复执行
// 9. 输出 in main, a.done = true, b.done = true

// 所以没有循环执行的原因是require时，会执行require模块的代码，并缓存执行的结果，当下次再次加载时不会重复执行，而直接取缓存的结果。

