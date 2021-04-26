import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function BookAdd({ handleBooks, categories }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleBooks(data);
    history.push('/adminbook');
  };

  //   if (!authorities) {
  //     return <Redirect to='/login' />;
  //   }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container-1'>
        <p>Name</p>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register('name', { required: true })} />
      </div>
      {errors.name && <span>Please input new name!!</span>}
      <div className='container-1'>
        <p>Author</p>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register('author', { required: true })} />
      </div>
      {errors.author && <span>Please input new author!!</span>}
      <br />
      <div className='container-1'>
        {categories &&
          categories.length > 0 &&
          <select {...register('categoryid')}>
          {categories.map((category) => (

            <option value={category.categoryId}>{category.name}</option>
          ))}
          </select>
        }
        {errors.categoryid && <span>Please input</span>}
      </div>
      <br />
      <input type='submit' />
    </form>
  );
}

export default BookAdd;
