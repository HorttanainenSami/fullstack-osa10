import React from 'react';
import TextInput from './TextInput';
import Text from './Text';
import {useField} from 'formik';


const FormikTextInput = (props) => {
  const [field, meta, helper] = useField(props.name);
  const showError = meta.touched && meta.error;
  return(
    <>
      <TextInput
        value={field.value}
        onChangeText={text => helper.setValue(text)}
        onBlur={() => helper.setTouched(true)}
        error={showError}
        {...props}
      />
      {showError && <Text color='textError'> {showError} </Text>}
    </>
  );
};

export default FormikTextInput;
