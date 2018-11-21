import React, { Component } from 'react';

// 实现一个响应鼠标的例子：意味着只要将组件放到这个组件内部，子组件内部就能够实现拿到鼠标位置的功能

const withMouse = (Component) => {
  return class extends React.Component {
    state = { x: 0, y: 0}
    handleMouseMove = (event) => {
      console.log('handleMouseMove run');
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          {/* 在高阶组件中将mouse属性赋值，然后在子组件中获取这个属性*/}
          <Component {...this.props} mouse={this.state}></Component>
        </div>
      )
    }
  }
}

// 将app赋予有监控鼠标位置的能力
const App = (props) => {
  const { x, y } = props.mouse;
  return (
    <div>
      <h1>the mouse position is ({x}, {y})</h1>
    </div>
  )
}

const AppWithMouse = withMouse(App);
export default AppWithMouse;


// hoc使用静态构建，即当AppWithMouse被创建时，调用一次withMouse的静态构建。而在render中调用构建方法才是
// react倡导的动态构建，在render中构建可以更好的利用react的生命周期。
