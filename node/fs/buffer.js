// let buf1 = Buffer.alloc(6);

// let buf2 = Buffer.allocUnsafe(6);

// // 没有new的方式创建，采用以上两种方式创建。alloc的方式是被初始化

// let buf = Buffer.from("hello", "utf8");

// console.log(buf);

// node 不支持gb

// utf8 一个中文字符占三个字节


let buf1 = Buffer.from("hello", "utf8");

let buf2 = Buffer.from(buf1);

console.log(buf1); // <Buffer 68 65 6c 6c 6f>
console.log(buf2); // <Buffer 68 65 6c 6c 6f>
// 复制了的buffer是创建了一个新的buffer，并复制上面的每一个成员
console.log(buf1 === buf2); // false
console.log(buf1[0] === buf2[0]); // true



let arr1 = [1, 2, [3]];
let arr2 = arr1.slice();
console.log(arr2 === arr1);
arr2[2][0] = 5;
console.log(arr1); // [1, 2, [5]]





