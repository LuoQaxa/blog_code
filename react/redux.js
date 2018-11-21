function Store(initValue, reducer) {
  this.state = initValue;
  this.reducer = reducer;
}

Store.prototype.getState = function () {
  return this.state;
}

// 传入一个action对象  
// {
//   type: 'add',
//   number: number
// }
Store.prototype.dispatch = function (action) {
  // 执行这个reducer函数返回的是新的state的对象
  this.state = this.reducer(this.state, action);
}

function createStore(reducer, initValue) {
  // 可以做一些参数的验证和判断
  return new Store(initValue, reducer);
}

module.exports = {
  createStore
}




// combineReducers是如何实现将所有的reducer都合并成一个reducer，并且要将state与其对应

/**
 * @param {Function} reducer: you can combine several reducers into a single reducer function by using 'combineReducers'
 * @param {any} [preloadedState]: the initial state
 * @param {Function} [enhancer]: middleware time travel 
 * @returns {Store}
 */
function createStore(reducer, preloadedState, enhancer) {
  // 直接返回一个对象为store，这个对象有一些方法：包括

  let currentReducer = reducer;
  let currentState = preloadedState;
  // let currentListeners = [];
  

  

  return {
    dispatch,
    getState,
    subscribe
  }
}