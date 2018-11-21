// redux 解决的是react中跨组件通信的问题。定义了一个唯一的store，改变store的方法是规定的是唯一的。
// 那么如何让store将组件绑定起来呢

// action 是一个普通的对象，但是必须要有type的属性，这个add是一个action创建方法
const add = (number) => {
  return {
    type: 'add',
    number: number
  }
}

// reducer 必须是一个纯函数，他的灵感来自于函数式编程中的reducer，prev 和 next值，这个的prev就类似于这里的state  
const reducer = (state, action) => {
  const { number, type } = action;
  switch (type) {
    case 'add':
      // return Object.assign({}, state, { num: state.num + number})
      return {
        ...state,
        num: state.num + number
      }
      break;
  
    default:
      return state;
      break;
  }
}

const redux = require('./redux');
const initValue = {
  num: 0
}


const store = redux.createStore(reducer, initValue);

// 使用
console.log('初始化的状态树：', store.getState()); // 0
/*1.分发一个 add 事件*/
store.dispatch(add(10));
console.log('+10后的状态树：', store.getState()); //10

store.dispatch(add(10));
console.log('+10后的状态树：', store.getState()); //10



