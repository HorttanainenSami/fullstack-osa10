import React from 'react';
import {Formik, useField} from 'formik';
import { TextInput, View } from 'react-native';
const initialValues = {
  username:'',
  password: '',

}
const SigninForm = () => {
  const [usernameField, usernameMeta, usernameHelper] = useField('username');
  const showusernameError = usernameMeta.touched && usernameMeta.error;
  const [passwordField, passwordMeta, passwordHelper] = useField('password');
  const showpasswordError = passwordMeta.touched && passwordMeta.error;
  return(
    <View>
      <TextInput
        value={usernameField.value}
        placeholder ='username'
        onChangeText={text => usernameHelper.setValue(text)}
        onBlur={() => usernameHelper.setTouched(true)}
        error={showusernameError}
      />
      <TextInput
        value={passwordField.value}
        secureTextEntry={true}
        placeholder ='password'
        onChangeText={text => passwordHelper.setValue(text)}
        onBlur={() => passwordHelper.setTouched(true)}
        error={showpasswordError}
      />
    </View>
  )
}
const SignIn = () => {
  return (
  <Formik initialValues={initialValues} >
    {({onSubmit}) =><SigninForm onSubmit={onSubmit}/>}
  </Formik>
  );
};

export default SignIn;