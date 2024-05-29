/* eslint-disable react/prop-types */
const FormInput = ({ label, name, type, defaultValue }) => {
    return (
      <div className="form-group ">
        <label htmlFor={name} className='label'>
          <span className='text-Capitalize mb-5 input-title' style={{fontFamily:'Montserrat', fontWeight:'550', color:'#5a5a5a'}}>
            {label}
          </span>
        </label>
        <input 
          type={type}
          name={name}
          defaultValue={defaultValue}
          className="form-control "
          style={{paddingLeft:'70px'}}
        />
      </div>
    );
  };
  export default FormInput;