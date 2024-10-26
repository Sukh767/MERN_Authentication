import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/userApiSlice';
// import { setCredentials } from '../slices/authSlice';

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state)=> state.auth);

  const [ register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if(userInfo){
      navigate('/login')
    }
  },[userInfo,navigate])


  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Password do not match')
    }else{
      try {
        const res = await register({name, email, password}).unwrap()
        toast.success('user register successfully')
        // dispatch(setCredentials({...res}))
        navigate('/login')
        // navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
    
  };

  return (
    <FormContainer>
      <h1 className="text-center my-4">Sign Up</h1>
      <Form onSubmit={submitHandler} className="p-4 shadow rounded bg-light">
      <Form.Group className="my-2" controlId="name">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
          {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3 w-100">Sign Up</Button>
        
        <Row className="py-3">
          <Col className="text-center">
            Already have an account? <Link to='/login'>login here</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default RegisterScreen;
