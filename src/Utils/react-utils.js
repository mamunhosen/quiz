import { useState } from "react";

export const useForm = (initialState = {}, callback, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const errorObj = validate(obj);
    if (Object.keys(errorObj).length === 0) {
      return null;
    } else {
      return errorObj[name];
    }
  };

  const onChange = ({ target: input }) => {
    const tempErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) tempErrors[input.name] = errorMessage;
    else delete tempErrors[input.name];

    setValues({
      ...values,
      [input.name]: input.value,
    });
    setErrors(tempErrors);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errorsObj = validate(values);
    if (Object.keys(errorsObj).length === 0) {
      callback(values);
    } else {
      setErrors(errorsObj);
    }
  };

  return {
    onChange,
    onSubmit,
    values,
    errors,
  };
};
