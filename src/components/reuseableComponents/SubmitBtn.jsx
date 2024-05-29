/* eslint-disable react/prop-types */
import { useNavigation } from 'react-router-dom';
const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type='submit'
      className='btn fs-5'
      // disabled={isSubmitting}
      style={{fontFamily:'Montserrat', fontWeight:'550', backgroundColor:'#5B5FC7', color:'white', width:'430px', height:'70px', borderStartEndRadius:'45px'}}
    >
      {isSubmitting ? (
        <>
          <span className='loading loading-spinner'></span>
          sendi...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};
export default SubmitBtn;