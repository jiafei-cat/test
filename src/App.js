import react from 'react'
import Count from './count'
import { connect } from './store/react-redux'

@connect
function App() {
  return (
    <div className="App">
      <Count />
    </div>
  );
}

export default App;
