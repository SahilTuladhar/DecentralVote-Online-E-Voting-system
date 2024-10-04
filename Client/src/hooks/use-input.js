import { useReducer } from "react";

const intialState = {
  enteredValue: "",
  isTouched: false,
  valueIsValid: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      enteredValue: action.value,
      isTouched: state.isTouched,
      valueIsValid: action.valueIsValid,
    };
  }
  if (action.type === "BLUR") {
    return {
      ...state,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return { enteredValue: "", isTouched: false, valueIsValid: false };
  }

  return state;
};

const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, intialState);

  const valueIsValid = validate(inputState.enteredValue);
  const valueIsInvalid = !valueIsValid && inputState.isTouched;

  const valueInputHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value, valueIsValid });
  };

  const valueBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.enteredValue,
    valueBlurHandler,
    valueInputHandler,
    valueIsInvalid,
    valueIsValid,
    reset,
  };
};

export default useInput;
