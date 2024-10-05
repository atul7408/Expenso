import { useEffect, useReducer, useRef } from "react";

const initialInputState = {
  value: "",
  dialCode: "",
  rawPhone: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "PHONE") {
    return {
      value: action.value,
      dialCode: action?.data?.dialCode || "",
      rawPhone:
        action?.data &&
        action.value.slice(action.data.dialCode.length + 1, 13).trim(),
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      dialCode: state.dialCode,
      rawPhone: state.rawPhone,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return { value: "", dialCode: "", rawPhone: "", isTouched: false };
  }
  return initialInputState;
};

export default function useInput(
  validateValue,
  defaultValue = { type: "", value: "" }
) {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const ref = useRef();
  useEffect(() => {
    if (defaultValue?.type == "text") {
      dispatch({ type: "INPUT", value: defaultValue.value });
    }
    if (defaultValue?.type == "number") {
      dispatch({
        type: "PHONE",
        value: defaultValue.value,
        data: null,
      });
    }
  }, []);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const phoneValueIsValid = validateValue(inputState.value);
  const phoneHasError = !phoneValueIsValid && inputState.isTouched;
  // console.log(inputState.value, 'validity:' + phoneValueIsValid, 'touched:' + inputState.isTouched, 'error:' + phoneHasError);

  const valueChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const reactPhoneChangeHandler = (value, data, e, formattedValue) => {
    dispatch({
      type: "PHONE",
      value: e?.target?.defaultValue || value,
      data: data,
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    dialCode: inputState?.dialCode ? "+" + inputState.dialCode : "",
    rawPhone: inputState.rawPhone,
    isValid: valueIsValid,
    hasError,
    phoneIsValid: phoneValueIsValid,
    phoneHasError,
    valueChangeHandler,
    reactPhoneChangeHandler,
    inputBlurHandler,
    reset,
    ref,
  };
}
