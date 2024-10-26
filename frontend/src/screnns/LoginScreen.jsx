import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/userApiSlice';
import Loader from '../components/Loader'

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ login, { isLoading }] = useLoginMutation()
  const {userInfo} = useSelector((state)=> state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  },[userInfo,navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center my-4">Sign In</h1>
      <Form onSubmit={submitHandler} className="p-4 shadow rounded bg-light">
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
          {isLoading && <Loader/>}
        <Button type="submit" variant="primary" className="mt-3 w-100">Sign In</Button>
        
        <Row className="py-3">
          <Col className="text-center">
            New Customer? <Link to='/register'>Register here</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
