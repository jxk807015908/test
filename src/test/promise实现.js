function Promise(fn) {
  var state = 'pending';
  var value = undefined;
  var callbacks = [];
  this.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject)=>{
        handle({
          onFulfilled,
          onRejected,
          resolve,
          // reject
        });
    });
  };
  this.catch = function (onRejected) {
    return this.then(res=>res, onRejected);
    // return new Promise((resolve, reject)=>{
    //   handle({
    //     onFulfilled: res=>res,
    //     onRejected,
    //     resolve,
    //     reject: resolve
    //   });
    // });
  };
  this.finally = function (onResult) {
    return this.then(onResult, onResult);
    // return new Promise((resolve, reject)=>{
    //   handle({
    //     onFulfilled: onResult,
    //     onRejected: onResult,
    //     resolve,
    //     reject: resolve
    //   });
    // });
  };
  function handle(cb) {
    if (state === 'pending') {
      callbacks.push(cb);
      return
    } else if (state === 'fulfilled') {
      let res = cb.onFulfilled && cb.onFulfilled(value) || value;
      cb.resolve(res);
    } else {
      let res = cb.onRejected && cb.onRejected(value) || value;
      // cb.reject(res);
      cb.resolve(res);
    }
  }
  function resolve(val) {
    if (state !== 'pending') return;
    if (val instanceof Promise) {
      val.then(resolve, reject);
      return
    }
    setTimeout(()=>{
      if (state !== 'pending') return;
      value = val;
      state = 'fulfilled';
      callbacks.forEach(cb=>{
        handle(cb);
      });
    })
  }
  function reject(val) {
    if (state !== 'pending') return;
    if (val instanceof Promise) {
      val.then(resolve, reject);
      return
    }
    setTimeout(()=>{
      if (state !== 'pending') return;
      value = val;
      state = 'rejected';
      callbacks.forEach(cb=>{
        handle(cb);
      });
    })
  }
  fn(resolve, reject);
}
Promise.reject = function(val) {
  return new Promise((resolve, reject)=>reject(val));
};
Promise.resolve = function(val) {
  return new Promise(resolve=>resolve(val));
};
Promise.all = function(arr) {
  let result = [];
  let num = 0;
  return new Promise((resolve, reject)=>{
    for (let i = 0; i < arr.length; i++) {
      arr[i].then(res => {
        result[i] = res;
        num++;
        if (num === arr.length) return resolve(result);
      }, err=>{
        return reject(err);
      })
    }
  })
};
Promise.race = function(arr) {
  return new Promise((resolve, reject)=>{
    for (let i = 0; i < arr.length; i++) {
      arr[i].then(resolve, reject)
    }
  })
};




// Promise.all([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(res=>{
//   console.log(res);
// },(err)=>{
//   console.log('err', err);
//   return 3
// }).catch((err)=>{
//   console.log('err2', err);
//   return 3
// }).then(res=>{
//   console.log('res', res)
// }).catch((err)=>{
//   console.log('err3', err)
// });

// Promise.race([((()=>{
//   return new Promise(resolve=>{
//     setTimeout(()=>{
//       resolve(1);
//     }, 1000);
//   })
// }))(), Promise.reject(2), Promise.resolve(3)]).then(res=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log('err', err);
//   return 3
// }).then(res=>{
//   console.log('res', res)
// }).catch((err)=>{
//   console.log('err2', err)
// });


let p = new Promise(resolve => {
  console.log(1);
  resolve();
});
p.then(()=>{
  console.log(2);
  return Promise.reject(7)
}).catch(res=>{
  console.log(res)
}).then(()=>{
  console.log(4);
}).then(()=>{
  console.log(5)
})
let p2 = p.then(()=>{
  console.log(3);
}).finally(()=>{
  console.log(6)
})
console.log(p === p2);