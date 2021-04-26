
import { useHistory} from "react-router";
import { Form, Input, Button,} from 'antd';
import '../App.css';
import React from "react";
import AuthService from "../Services/auth.service";




const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 7,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 7,
    span: 10,
  },
};




function Login({setAuthorities, currentUser}) {
  let history = useHistory()
  

   const onFinish = async (values) => {
    console.log('Success:', values);
    AuthService.login(values,history,);
    setAuthorities(true);
    alert('Login Successfully!')
      
    
    }


    
    
    // return axios.post("https://localhost:5001/api/users/login", values)
    // .then((res) => {
    //     if(res.status === 200){
    //         setauthorized(true)
    //         history.push("/Book")
    //         alert('Login success!')
            
    //     }
    //     console.log(res);
    // })
    // .catch(error => {
    //     console.log('error',error)
    //     alert("Username, password are wrong")
    // });
    
    

   
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    

    <div className='App'>
    {currentUser == null ? (<div><h2 className='Name'>Please Login</h2>
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form></div>) : (
        <h2>You have already Logged in</h2>)
      }</div>
  );
}

export default Login;
