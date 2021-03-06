import React from 'react';
import { ListGroup,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {  useParams, Redirect } from 'react-router-dom';
function CategoryDetails({ categories, setCategories, error, authorities }) {
     const {id} = useParams();
     if(!authorities) {
      return <Redirect to ="/home" />
    }

    // useEffect(() => {
    //     loadCategorydetails()
    // }, []);

    // const loadCategorydetails = async () => {
    //     const result = await axios.get(`https://localhost:5001/api/category/${id}`);
    //     console.log(result);
    //     setCategories(result.data)
    // }
    // console.log(categories)
  return (
    <div>
      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
            <div key={category.categoryId}>
            {category.categoryId == id &&<ListGroup >
            <ListGroup.Item ><h4><strong>ID:</strong>  {category.categoryId}</h4></ListGroup.Item>
            <ListGroup.Item><h4><strong>Name:</strong> {category.name}</h4></ListGroup.Item>
            <ListGroup.Item><h4><strong>Book:</strong> {category.books.length <= 0 ? <h4>No book found!</h4> : <h3>{category.books.map(x=>x.name).join(', ')}</h3>}</h4></ListGroup.Item>
            <Link to={'/admin'}>
            <br></br>
          <Button>
          Go Back
          </Button>
          </Link>
          </ListGroup>}
            
            </div>
          

        ))}
    </div>
  );
}

export default CategoryDetails;
