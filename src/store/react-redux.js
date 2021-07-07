import React from 'react'

const Context = React.createContext()

export function Provider ({
  children,
  ...props
}) {
  return <Context.Provider value={{...props}}>{children}</Context.Provider>
}


export function connect (wrapperComponent) {
  return ({ mapStateToProps, mapDispatchToProps}) => {
    
  }
}