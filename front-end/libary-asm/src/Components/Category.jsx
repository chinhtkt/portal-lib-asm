import React from 'react';
import AuthService from '../Services/auth.service';
import { Redirect } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/Button.css';
import axios from 'axios';
const Category = ({ authorities, categories, error, setCategories }) => {
  if (!authorities) {
    return <Redirect to='/login' />;
  }

  const User = AuthService.getCurrentUser();

  const deleteCategory = async (id) => {
    if (window.confirm('do you want to delete')) {
      await axios.delete(`https://localhost:5001/api/category/${id}`);
      const res = await axios.get('https://localhost:5001/api/category');
      const data = res.data;
      setCategories(data);
    }
  };
  

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h2>Welcome {User.username} to manage category!</h2>
      </header>
      <div className='container-2'>
        <Link to={'/addcategory'}>
          <Button variant='success'>Add new</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.name}</td>
                <td>
                  <Link to={`/categorydetails/${category.categoryId}`}>
                    <Button variant='primary'>Details</Button>
                  </Link>
                  &nbsp;
                  <Link to={`/editcategory/${category.categoryId}`}>
                    <Button variant='success'>Edit</Button>
                  </Link>
                  &nbsp;
                  <Button
                    variant='danger'
                    onClick={() => deleteCategory(category.categoryId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          {error && <p>Something went wrong!</p>}
        </tbody>
      </Table>
    </div>
  );
};

export default Category;
