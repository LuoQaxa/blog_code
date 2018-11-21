// v16.3 全新的context
// 生产者消费者模式

//1.  创建context实例
const ThemeContext = React.createContext({
  background: 'red',
  color: 'white'
})


// 2. app组件
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={{ background: 'green', color: 'white' }}>
        <header></header>
      </ThemeContext.Provider>
    )
  }
}


<ThemeContext.consume>
  {
    (context) => {
      <div></div>
    }
  }
</ThemeContext.consume>
