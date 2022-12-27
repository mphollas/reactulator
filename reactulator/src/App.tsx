import React, { ReactNode } from 'react';
import './App.css';

function Button({
  children,
  label
}:{
  children: (num: number)=>ReactNode,
  label: string
}){
  const [state, stateSet] = React.useState<number>(0);
  console.log("State", state);
  return <div>
    <h3>{children(state)}</h3>
    <button 
      className="btn btn-primary"
      onClick={()=> {stateSet(state + 1)}}
    >{label}
    </button>
  </div>
  
}

function Case(){
  return <div className="case"></div>
}

function Display(){
  const [state] = React.useState<number>();
  console.log("Display State", state);
  return <div><h2>- {state} -</h2></div>
}

function App() {
  return (
    <div>
      <Case></Case>
      <Display></Display>
      <Button label="Add1">{(num: number) => <div>Counter for 1 {num}</div> }</Button>
      <Button label="Add2">{(num: number) => <div>Counter for 2 {num}</div> }</Button>
    </div>
  );
}

export default App;
