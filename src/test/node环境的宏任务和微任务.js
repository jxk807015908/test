// 此文件测试node的宏任务与微任务的执行顺序

Promise.resolve().then(() => {
  console.log('1');
});
setImmediate(()=>{
  console.log('3');
});
setTimeout(()=>{
  console.log('2');
  process.nextTick(() => {
    console.log('5');
  });
});
setTimeout(()=>{
  console.log('4');
  process.nextTick(() => {
    console.log('6');
  });
});

// 结果为 1 2 3 5 6 3