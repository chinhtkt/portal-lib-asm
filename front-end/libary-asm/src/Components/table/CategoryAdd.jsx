import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CategoryAdd({ handleCategory }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleCategory(data);
    history.push('/admin');
  };
  

//   if (!authorities) {
//     return <Redirect to='/login' />;
//   }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container-1'>
      <p>Name</p>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register('name', { required: true }) } />
      </div>
      {/* errors will return when field validation fails  */}
      {errors.name && <span>Please input new name!!</span>}
      <div className='container-1'>
      <br></br>
        <input type='submit' />
      </div>
    </form>
  );
}

export default CategoryAdd;
