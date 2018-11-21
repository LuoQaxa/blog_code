// 许多组件都需要进行相似或相同的处理

// import React from 'react';
// import ReactDom from 'react-dom';

const withMouse = (Component) => {
  return class extends React.Component {
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
          <Component {...this.props} mouse={this.state} />
        </div>
      )
    }
  }
}

const App = (props) => {
  const { x, y } = props.mouse
  return (
    <div style={{ height: '100%' }}>
      <h1>The mouse position is ({x}, {y})</h1>
    </div>
  )
}

const AppWithMouse = withMouse(App)

ReactDOM.render(<AppWithMouse />, document.getElementById('root'))