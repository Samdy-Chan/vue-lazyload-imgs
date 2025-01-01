import { deepCopy } from './utils';

console.log('------- 以下是 object 对象深拷贝使用示例 --------');
// object 对象深拷贝使用示例
const obj1 = {
  name: 'samdy',
  age: 38,
  hobbys: ['ball', 'sing'],
  sing: () => console.log('Call sing function'),
  // err: new Error('is err...'),
  dt: new Date(),
  reg: /abcd/gi,
  info: {
    height: 168,
    weight: 68,
  },
};

const obj2 = deepCopy(obj1, ['object', 'array', 'function', 'error', 'date', 'regexp']);
console.log('obj2:', obj2, obj1.sing === obj2.sing);
obj2.sing();

console.log('------- 以下是 Error 对象深拷贝使用示例 --------');
// Error 对象深拷贝使用示例
try {
  throw new Error('is error...');
} catch (error: any) {
  const copiedError = deepCopy(error);
  // console.log('copiedError:', copiedError);
  console.log(error === copiedError); // false
  console.log(error.stack === copiedError.stack); // false
}

console.log('========= 以下是 Set 集合对象深拷贝使用示例 =========');
// Set 集合对象深拷贝使用示例
/* const s = new Set([1, 2, 3, 4, 5, [51, 52, [511, 522]]]);
const ss = deepCopy(s);
console.log('s === ss:', s === ss);  // false
const arr1 = Array.from(s);
const arr2 = Array.from(ss);
console.log('arr1[5], arr2[5]:', arr1[5], arr2[5]);  // [ 51, 52, [ 511, 522 ] ]   [ 51, 52, [ 511, 522 ] ]
console.log('arr1[5] === arr2[5]:', arr1[5] === arr2[5]);  // false
 */
const s = new Set([
  { name: 'chq', age: 20 },
  { name: 'chen', age: 38 },
]);
const ss = deepCopy(s);
console.log('s === ss:', s === ss); // false
const arr1 = Array.from(s);
const arr2 = Array.from(ss);
console.log('arr1[0], arr2[0]:', arr1[0], arr2[0]);
console.log('arr1[0] === arr2[0]:', arr1[0] === arr2[0]); // false

console.log('========= 以下是 Map 键值映射对象深拷贝使用示例 =========');
// Map 键值映射对象深拷贝使用示例
const mp1 = new Map([
  ['user1', { name: 'chq', age: 18 }],
  ['user2', { name: 'samdy', age: 38 }],
]);
const mp2 = deepCopy(mp1, ['map', 'object']);
console.log('mp1:', mp1, 'mp2:', mp2, 'mp1 === mp2:', mp1 === mp2);
console.log('mp1.user2 === mp2.user2:', mp1.get('user2') === mp2.get('user2'));

console.log('========= 以下是 WeakSet 弱引用集合对象浅拷贝使用示例 =========');
// WeakSet 弱引用集合对象浅拷贝使用示例
const obj = { name: 'Samdy', age: 38 };
const ws1 = new WeakSet();
ws1.add(obj);
const ws2 = deepCopy(ws1);
console.log('ws1:', ws1, 'ws2:', ws2);
console.log('ws1 === ws2:', ws1 === ws2); // true

console.log('========= 以下是 WeakMap 弱引用键值映射对象浅拷贝使用示例 =========');
// WeakMap 弱引用键值映射对象浅拷贝使用示例
const user = { name: 'chq', age: 18 };
const wm1 = new WeakMap([[user, 'pass']]);
wm1.set({ name: 'Samdy', age: 38 }, 'noPass');
const wm2 = deepCopy(wm1);
console.log('wm1:', wm1, 'wm2:', wm2);
console.log('wm1 === wm2:', wm1.get(user) === wm2.get(user)); // true
