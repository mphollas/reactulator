import React, { ReactNode } from "react";
import styled from "styled-components";

interface IButton {
  secondary: boolean;
}

const BUTTON = styled.button<IButton>`
  height: 4rem;
  width: 4rem;
  text-align: center;
  border: 0px;
  border-radius: 50%;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  background: ${(props) => (!props.secondary ? "#888888" : "#ffdd00")};
  &:hover {
    opacity: 0.9;
  }
  &:active {
    background: #fff;
    border: 1px solid #0075fa;
    color: #0075fa;
  }
`;

const NumbersContainer = styled.section`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 18.5rem;
`;

const MathsContainer = styled.section`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 4rem;
`;

const FuctionsContainer = styled.section`
  display: inline-flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const IOContainer = styled.section`
  display: block;
  background: rgba(240, 253, 255, 1);
  margin: 0 0 10px 0;
  padding: 0.5rem;
`;

const IOMainDisplay = styled.div`
  height: 3rem;
  font-size: 2.5rem;
  text-align: right;
`;

const IOSubDisplay = styled.div`
  font-size: 1.5rem;
  text-align: right;
`;

const CalculatorContainer = styled.section`
  display: block;
  max-width: 300px;
  background: rgba(240, 241, 242, 1);
  padding-bottom: 1.5rem;
  border-radius: 0.5rem;
`;

interface ICalcProps {
  inputValue: number;
  currentValue: number;
  outputValue: number;
}

interface IButtonProps {
  calcProps: ICalcProps;
  label?: string;
  value?: number;
  symbol?: string;
  isSecondary?: boolean | false;
}

function Button({
  calcProps,
  label,
  value,
  symbol,
  isSecondary,
}: IButtonProps) {
  const [state, stateSet] = React.useState({
    label,
    value,
    symbol,
    isSecondary,
  });
  const [calcPropsState, calcPropsSet] = React.useState(calcProps);
  function handleButtonClicked() {
    let calc = (calcPropsState.currentValue =
      calcPropsState.currentValue + (state.value || 0));
    let result: ICalcProps = {
      currentValue: calc,
      inputValue: calcPropsState.inputValue || 0,
      outputValue: calcPropsState.outputValue || 0,
    };
    calcPropsSet(result);
    console.log("NEW STATE Coming Up", calcPropsState.currentValue);
  }
  return (
    <BUTTON secondary={isSecondary || false} onClick={handleButtonClicked}>
      {label}
    </BUTTON>
  );
}

function IODisplay({
  inputValue,
  currentValue,
  outputValue,
  children,
}: {
  inputValue?: number;
  currentValue?: number;
  outputValue?: number;
  children: ReactNode;
}) {
  const [currentState, currentSet] = React.useState<number>(currentValue || 0);
  //todo: handle calculation chaining
  const parseInput = (input: number | string): number => {
    return 0;
  };

  return (
    <IOContainer>
      <section>
        <IOMainDisplay>{inputValue}</IOMainDisplay>
        <IOSubDisplay>{inputValue}</IOSubDisplay>
      </section>
      <section>{children}</section>
    </IOContainer>
  );
}

function NumbersPannel({ currentValue, inputValue, outputValue }: ICalcProps) {
  const [state, stateSet] = React.useState<ICalcProps>({
    currentValue,
    inputValue,
    outputValue,
  });
  console.log("CURRENT VALUE", currentValue);
  return (
    <section>
      <NumbersContainer>
        <Button label="C" symbol="C" calcProps={state} isSecondary></Button>
        <Button label="CA" symbol="CA" calcProps={state} isSecondary></Button>
        <Button label="+/-" symbol="+/-" calcProps={state} isSecondary></Button>
        <Button label="÷" symbol="÷" calcProps={state} isSecondary></Button>
        <Button label="7" value={7} calcProps={state}></Button>
        <Button label="8" value={8} calcProps={state}></Button>
        <Button label="9" value={9} calcProps={state}></Button>
        <Button label="x" symbol="x" calcProps={state} isSecondary></Button>
        <Button label="4" value={4} calcProps={state}></Button>
        <Button label="5" value={5} calcProps={state}></Button>
        <Button label="6" value={6} calcProps={state}></Button>
        <Button label="-" symbol="-" calcProps={state} isSecondary></Button>
        <Button label="1" value={1} calcProps={state}></Button>
        <Button label="2" value={2} calcProps={state}></Button>
        <Button label="3" value={3} calcProps={state}></Button>
        <Button label="+" symbol="+" calcProps={state} isSecondary></Button>
        <Button label="%" symbol={"%"} calcProps={state}></Button>
        <Button label="0" value={0} calcProps={state}></Button>
        <Button label="." symbol={"."} calcProps={state}></Button>
        <Button label="=" symbol="=" calcProps={state} isSecondary></Button>
      </NumbersContainer>
    </section>
  );
}

// function MathsPannel() {
//   const [state, stateSet] = React.useState();

//   return (
//     <MathsContainer>
//       <Button label="÷" symbol="÷" isSecondary></Button>
//       <Button label="x" symbol="x" isSecondary></Button>
//       <Button label="-" symbol="-" isSecondary></Button>
//       <Button label="+" symbol="+" isSecondary></Button>
//       <Button label="=" symbol="=" isSecondary></Button>
//     </MathsContainer>
//   );
// }

// function FunctionPannel() {
//   const [state, stateSet] = React.useState();

//   return (
//     <FuctionsContainer>
//       <Button label="C" symbol="C" isSecondary></Button>
//       <Button label="CA" symbol="CA" isSecondary></Button>
//       <Button label="+/-" symbol="+/-" isSecondary></Button>
//     </FuctionsContainer>
//   );
// }

function Calculator({ currentValue, inputValue, outputValue }: ICalcProps) {
  const [state, stateSet] = React.useState({
    currentValue,
    inputValue,
    outputValue,
  });

  return (
    <CalculatorContainer>
      <IODisplay inputValue={currentValue}>
        <NumbersPannel
          currentValue={state.currentValue}
          inputValue={state.inputValue}
          outputValue={state.outputValue}
        ></NumbersPannel>
      </IODisplay>
    </CalculatorContainer>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
`;

function App() {
  return (
    <Wrapper>
      <Calculator currentValue={10} inputValue={0} outputValue={0}></Calculator>
    </Wrapper>
  );
}

export default App;
