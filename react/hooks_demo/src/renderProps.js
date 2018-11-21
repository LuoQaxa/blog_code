// a render prop is a function prop that a component uses to kown what to render

// 通过一个函数将class组件的state作为props传递给纯函数组件
// https://segmentfault.com/a/1190000013102142

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Mouse extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }

  state = { x: 0, y: 0 }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}
// 在使用mouse这个组件的时候，设置它的render属性为一个函数
// 在mouse组件的内部的render方法里面，调用render方法并将组件的state传入，使得子组件也能使用到父组件的state
// 这样使得app也具有了监控mouse的能力

const App = () => (
  <div style={{ height: '100%' }}>
    <Mouse render={({ x, y }) => (
      <h1>The mouse position is ({x}, {y})</h1>
    )} />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))