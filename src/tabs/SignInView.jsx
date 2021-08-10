import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
const initialValues = {
  username:'',
  password: '',
};
const onPress = (values) => {
  const username = values.username;
  const password = values.password;

  console.log(`username: ${username} and password ${password}`);
};
const SigninForm = ({onSubmit}) => {
  return(
    <View style={{display:'flex'}}>
      <FormikTextInput name='username' placeholder='username'/>
      <FormikTextInput name='password' placeholder='password' secureTextEntry={true}/>
      <Button handlePress={onSubmit} text='Sign in' />
    </View>
  );
};
const SignIn = () => {
  return (
  <Formik 
    initialValues={initialValues} 
    onSubmit={onPress} 
    >
    {({handleSubmit}) =><SigninForm onSubmit={handleSubmit}/>}
  </Formik>
  );
};

export default SignIn;
