import React from 'react';
import TextInput from './TextInput';
import {useField} from 'formik';


const FormikTextInput = ({name, style, ...props}) => {
  const [field, meta, helper] = useField({name});
  const showError = meta.touched && meta.error;
  return(
      <TextInput
        value={field.value}
        onChangeText={text => helper.setValue(text)}
        onBlur={() => helper.setTouched(true)}
        error={showError}
        style={style}
        {...props}
      />
  );
};

export default FormikTextInput;
