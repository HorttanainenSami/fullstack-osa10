import React from 'react';
import { Formik } from 'formik';
import { View} from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { CREATE_USER } from '../gql/mutations';
import { useMutation } from '@apollo/client';


const initialValues = {
  username:'',
  password: '',
  passwordConfirmation: '',
};
const validationSchema = yup.object().shape({
  username: yup
  .string()
  .min(1, 'too short')
  .max(30, 'username must be <30 characters')
  .required('Username is required')
  , 
  password: yup
  .string()
  .min(6, 'password too short')
  .max(50, 'password is too long')
  .required('password is required')
  ,
  passwordConfirmation: yup
  .string()
  .oneOf([yup.ref('password'), null], 'passwords must be same')
  .required('password confirmation is required')

});
const SignupForm = ({onSubmit}) => {
  const handleSubmit = () => {
    onSubmit(initialValues);
  };
  return(
    <View style={{display:'flex'}}>
      <FormikTextInput testID='usernameInput' name='username' placeholder='username'/>
      <FormikTextInput testID='passwordInput' name='password' placeholder='password' secureTextEntry={true}/>
      <FormikTextInput testID='passwordCondirmationInput' name='passwordConfirmation' placeholder='password confirmation' secureTextEntry={true}/>
      <Button testID='submit' handlePress={handleSubmit} text='Sign up' />
    </View>
  );
};
export const SigninContainer = ({ onPress }) => (
  <Formik 
    initialValues={initialValues} 
    onSubmit={onPress} 
    validationSchema={validationSchema}
    >
    {({handleSubmit}) =><SignupForm onSubmit={handleSubmit}/>}
  </Formik>
);
const SignUp = () => {
  const [createUser, ] = useMutation(CREATE_USER);
  const history = useHistory();
  const onPress =  async (values) => {
    const username = values.username;
    const password = values.password;
    try{
      await createUser({variables: {user: {username, password}}});
      history.push('/signin');
    }catch(e){
      console.log(e);
    }
  };
  return (
    <SigninContainer onPress={onPress} />
  );
};
export default SignUp;
