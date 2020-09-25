import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Modal from '../UIelements/Modal/Modal';
import { Form, Button } from 'react-bootstrap';
import classes from './Forms.css';

class SignupForm extends Component {
   
    constructor(){
        super();
        this.state={ input:{email:"", password:"", confirmPassword:"", collegeName:""},
                     errors: {}, 
                     redirect: null,                
      }
        }

        handleChange = (event) =>{
          let input = this.state.input;
          input[event.target.name] = event.target.value;
        
          this.setState({
            input
          });
        }
        
        handleSubmit = (event) =>{
           event.preventDefault();  
             if (this.validate()) {
                event.preventDefault();
                const url = "http://localhost:8080/auth/signup"
                const data = { email:this.state.input.email, password:this.state.input.password, collegeName:this.state.input.collegeName }
                fetch(url, { method: 'POST',
                body: JSON.stringify(data), 
                headers:{ 'Content-Type': 'application/json' } })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {console.log('Success:', response);
                if(response.message==="otp sent")
                {
                  localStorage.setItem('token', response.token)
                  this.setState({ redirect: "/signup/verifyotp" });
                }
                else
                {alert("Registration Failed!")}
                })
                .catch(error => console.log(error)); }}

        validate= () => {
          let input = this.state.input;
          let errors = {};
          let isValid = true;

          if (typeof input["email"] !== undefined) {

           

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          
            if (!pattern.test(input["email"])) {
          
              isValid = false;
          
              errors["msg"] = "Please enter a valid email address.";
          
            }
            
          this.setState({
            errors: errors
          });

          return isValid;
          
          }

          else if (typeof(input["password"]) !== undefined && typeof(input["confirmPpassword"]) !== undefined) {
          
            if (input["password"] !== input["confirmPassword"]) {
              isValid = false;
              errors["msg"] = "Passwords don't match!";
            }
            else if (input["password"].length<6) {
              isValid = false;
              errors["msg"] = "Password must be of minimum 6 characters!";
            }
          
          
          
      
          this.setState({
            errors: errors
          });

          return isValid;
        }}

    render () {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
        return(
            
        <Modal show={true}>
        <div className={classes.gridContainer}>
        <div className={classes.item1}><h2>Looks like you're new here!</h2><p>Signup Now to find Your dream internships!</p></div>
        <div className={classes.item2}></div>
        <div className={classes.item3}>
        <Form onSubmit={this.handleSubmit} style={{marginTop: '20%'}} >
        <div className="text-danger">{this.state.errors.msg}</div> 
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" required onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label> 
          <Form.Control type="password" placeholder="Enter Password  (minimum 6 characters)" name="password" required onChange={this.handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Re-Enter Password" name="confirmPassword" required onChange={this.handleChange} />
        </Form.Group>
        

        <Form.Group>
          <Form.Label>Organization/Institute</Form.Label>
          <Form.Control type="text" placeholder="Enter Organization/Institute" name="collegeName" onChange={this.handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit" className={classes.Button}>
        Signup
        </Button>
        <p>Already have an account? <a href="/login">Login!</a></p>
      </Form>
        </div>
        </div>

    </Modal>

        );
    }
}
    


export default SignupForm;