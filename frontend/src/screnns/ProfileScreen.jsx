import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/userApiSlice';

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state)=> state.auth);

  const [updateProfile, {isLoading}] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  },[userInfo.setName, userInfo.setEmail])


  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Password do not match')
    }else{
      try {
        const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password
        }).unwrap();
        dispatch(setCredentials({...res}))
        toast.success('Profile updated')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
    
  };

  return (
    <FormContainer>
      <h1 className="text-center my-4">Update Profile</h1>
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
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader/> }
        <Button type="submit" variant="primary" className="mt-3 w-100">Update</Button>
        
      </Form>
    </FormContainer>
  );
}

export default ProfileScreen;
