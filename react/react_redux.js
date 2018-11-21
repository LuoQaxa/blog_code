// store 放在context中，所有子组件可以直接拿到store数据，这是为什么呢？

// connect的函数 mapStateToProps mapDispatchToProps

// state 上的属性 添加到组件的props属性上

// 当state改变的时候，state和这个组件上的props共享一样引用，所以props变化了组件也要变化

import React from 'react'
import PropTypes from 'prop-types'

export function connect() {
}

class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}


