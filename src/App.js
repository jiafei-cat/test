import react from 'react'
import Count from './count'
import FnCountCom from './count/FnCountCom'
import ClassCountCom from './count/ClassCountCom'

class App extends react.Component{
  render () {
    console.log(this.props)
    return (
      <div className="App">
        <Count />
        <hr/>
        <ClassCountCom />
        <hr/>
        <FnCountCom />
        <hr/>
      </div>
    );
  }
}
export default App;
