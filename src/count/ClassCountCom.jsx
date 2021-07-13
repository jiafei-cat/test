import React from 'react'
import { connect } from '../store/react-redux'

const mapStateToProps = (state) => ({ home: state.home, foo: state.foo })
// function
// const mapDispatchToProps = dispatch => ({ 
//   increment: () => dispatch({ type: 'add', payload: 1 }),
//   decrease: () => dispatch({ type: '--', payload: 1 })
// })

// object
const mapDispatchToProps = {
  increment: () => ({ type: 'add', payload: 1 }),
  decrease: () => ({ type: '--', payload: 1 })
}

@connect(mapStateToProps, mapDispatchToProps)
class ClassCountCom extends React.Component {
  render() {
    return (
      <>
        <section>
          <h4>Parent Class Component - React-redux: (mapStateToProps, mapDispatchToProps)</h4>
          <p>home: {this.props.home} foo: {this.props.foo}</p>
        </section>
        <button onClick={this.props.increment}>Parent Handler Home Increment</button>
        <button onClick={this.props.decrease}>Parent Handler Foo Decrease</button>
      </>
    )
  }
}

export default ClassCountCom