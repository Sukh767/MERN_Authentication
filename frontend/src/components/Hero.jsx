import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { setCredentials } from '../slices/authSlice';
import { useSelector } from "react-redux";


const Hero = () => {

  const {userInfo} = useSelector((state)=> state.auth);
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication Boilerplate</h1>
          <h3 className="text-center mb-4">
            A Robust Foundation for Secure User Authentication
          </h3>
          <p className="text-center mb-4">
            This MERN (MongoDB, Express, React, Node.js) authentication
            boilerplate provides a solid starting point for building secure and
            efficient web applications. It leverages the power of Redux Toolkit
            and React Bootstrap to streamline state management and enhance the
            user interface.
          </p>
          <ul>
            <li>
              <strong>Secure JWT-Based Authentication:</strong> Employs JSON Web Tokens (JWTs)
              for secure user authentication, storing them in HTTP-Only cookies
              to protect against client-side attacks.
            </li>
            <li>
              <strong>Robust Backend:</strong> A robust Node.js backend built with Express.js,
              MongoDB, and Mongoose for efficient data management and user
              authentication.
            </li>
            <li>
              <strong>Efficient Frontend:</strong> A React frontend powered by Redux Toolkit for
              efficient state management and React Bootstrap for a visually
              appealing and responsive user interface.
            </li>
            <li>
              <strong>User-Friendly Experience:</strong> A well-structured user interface with
              intuitive forms for user registration and login.User-Friendly
              Experience: A well-structured user interface with intuitive forms
              for user registration and login.
            </li>
            <li>
              <strong>Best Practices:</strong> Adheres to industry best practices for security,
              performance, and maintainability.
            </li>
          </ul>
          <div className="d-flex">
            { userInfo ? '' : <><LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Sign Up</Button>
            </LinkContainer></>
            }
            
          </div>
        </Card>
      </Container>
    </div>
  );
};
export default Hero;
