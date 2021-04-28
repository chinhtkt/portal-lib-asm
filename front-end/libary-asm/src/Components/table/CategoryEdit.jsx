import React, { useEffect } from 'react';
import {  useHistory , useParams, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function CategoryEdit({handleCategoryEdit ,categories, setCategories, authorities}) {
    const {id} = useParams();
    const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleCategoryEdit(data);
    history.push('/admin');
  };

  useEffect(() => {
      loadUser()
  }, []);

  if(!authorities) {
    return <Redirect to ="/home" />
  } 

  const loadUser = async () => {
      const result = await axios.get(`https://localhost:5001/api/category/${id}`);
      reset({id:result.data.categoryId,name: result.data.name})
      setCategories(result.data)
      ///
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container-1'>
        <p>Name</p>
        {/* register your input into the hook by invoking the "register" function */}
        <input 
        {...register('id', { required: true })
        }
        hidden
        
          />
        <input 
        {...register('name', { required: true })}
          />
        
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

export default CategoryEdit;
