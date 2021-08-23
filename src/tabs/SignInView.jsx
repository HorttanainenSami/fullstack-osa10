import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
import * as yup from 'yup';
import useSignin from '../hooks/useSignin';
import AuthStorage from '../utils/authStorage';

const initialValues = {
  username:'',
  password: '',
};
const validationSchema = yup.object().shape({
  username: yup
  .string()
  .min(3, 'too short')
  .max(50, 'username must be <50 characters')
  .required('Username is required')
  , 
  password: yup
  .string()
  .min(6, 'password too short')
  .required('password is required')

});
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
  const [signIn] = useSignin();
  const auth = new AuthStorage('person');
  const onPress =  async (values) => {
    const username = values.username;
    const password = values.password;
    try{
     const { data } =  await signIn({username, password});
      auth.setAccessToken(data.authorize.accessToken); 
      const person = await auth.getAccessToken();
      console.log(person);
    }catch(e){
      console.log(e);
    }
  };
  return (
  <Formik 
    initialValues={initialValues} 
    onSubmit={onPress} 
    validationSchema={validationSchema}
    >
    {({handleSubmit}) =><SigninForm onSubmit={handleSubmit}/>}
  </Formik>
  );
};

export default SignIn;
