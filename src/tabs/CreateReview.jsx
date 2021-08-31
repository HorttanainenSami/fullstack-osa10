import React from 'react';
import FormikTextInput from '../components/FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '../components/Button';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../gql/mutations';
import { useHistory} from 'react-router-dom';

const styles = StyleSheet.create({
  item: {
    margin: 5,
  }
});
const initialValues = {
  repositoryName:'',
  ownerName:'',
  rating:'',
  text:'',
};
const validationSchema = yup.object().shape({
  ownerName: yup
  .string()
  .required('Repository owner name is required')
  ,
  repositoryName: yup
  .string()
  .required('Repository name is required')
  ,
  rating: yup
  .number('numbers only')
  .min(0)
  .max(100)
  .required('Rating is required')
  ,

});
const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();
  const onSubmit = async (props) => {
    const rating = parseInt(props.rating);
    const input = {...props, rating};

    try{
      const {data} = await createReview({ variables: {input}}); 
      console.log(data.createReview.repositoryId);
      history.push(`/repository/${data.createReview.repositoryId}`);

    }catch(e){
      console.log(e);
    }
  };
 return(
   <Formik
     initialValues={initialValues}
     validationSchema={validationSchema}
     onSubmit={onSubmit}
   >
    {({handleSubmit}) => (

      <ReviewForm handleSubmit={handleSubmit}/>
    )}
   </Formik>

   

 );
};
const ReviewForm = ({handleSubmit}) => (
  <View style={styles.item}>
    <FormikTextInput name='ownerName' placeholder='Repository owner name' />
    <FormikTextInput name='repositoryName' placeholder='Repository name' />
    <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
    <FormikTextInput multiline={true} name='text' placeholder='Review' />
    <Button handlePress={handleSubmit} text='Create review' />
  </View>
);


export default CreateReview;
