import React, { useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function BookEdit({ handleBookEdit, setBooks, categories, authorities }) {

  
  const { id } = useParams();
  const history = useHistory();

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleBookEdit(data);
    history.push('/adminbook');
  };

  //   if (!authorities) {
  //     return <Redirect to='/login' />;
  //   }

  useEffect(() => {
    loadBook();
  }, []);

  if(!authorities) {
    return <Redirect to ="/login" />
  }

  const loadBook = async () => {
    const result = await axios.get(`https://localhost:5001/api/books/${id}`);
    reset({
      id: result.data.bookId,
      name: result.data.name,
      author: result.data.author,
      categoryId: result.data.categoryId
    });
    setBooks(result.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container-1'>
        <p>Name</p>
        <input {...register('id', { required: true })} hidden />
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
        {categories && categories.length > 0 && (
          <select {...register('categoryId')}>
            {categories.map((category) => (
              <option value={category.categoryId}>{category.name}</option>
            ))}
          </select>
        )}
        {errors.categoryId && <span>Please input</span>}
      </div>
      <br />
      <input type='submit' />
    </form>
  );
}

export default BookEdit;
