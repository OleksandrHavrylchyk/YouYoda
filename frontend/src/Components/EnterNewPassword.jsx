import React from 'react';

import {Container} from 'reactstrap';
import {Redirect} from 'react-router-dom';

import {newPassword} from '../api/resetPassword';
import {FormErrors} from '../api/FormError';


const UIDPOS = 4;
const TOKENPOS = 5;

export default class EnterNewPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={new_password:'',
                    re_new_password:'',
                    formErrors: {re_new_password: '', new_password: ''},
                    rePasswordValid: false,
                    passwordValid: false,
                    formValid: false
                };
	}

    handlChangePassword = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value},
                        () => { this.validateField(name, value) }
                    );
        console.log(this.state);
    }

    validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let {passwordValid, rePasswordValid, new_password, re_new_password} = this.state;
          let passregex = RegExp(/^(\w+){6,24}$/g);

          passwordValid = passregex.test(value);
          fieldValidationErrors.fieldName = passwordValid ? '': 'Password must to contain 6-24 characters';
          (new_password !== re_new_password) ?
              fieldValidationErrors.fieldName= "Passwords don't match" :
              rePasswordValid = true;

          this.setState({formErrors: fieldValidationErrors,
                        passwordValid: passwordValid,
                        rePasswordValid: rePasswordValid,
                        }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.rePasswordValid &&
                                this.state.passwordValid});
    }

    extractToken (idx) {
        return window.location.pathname.split("/")[idx]
    }

    handleSubmitNewPassword = async (event) => {
        console.log(this.props)
        const URLPATH = 'auth/users/reset_password_confirm/';
        const USERDATA={
            "uid": this.extractToken(UIDPOS),
            "token": this.extractToken(TOKENPOS),
            "new_password":this.state.new_password
            }
        await newPassword(URLPATH, USERDATA)
            .then(() => this.setState({ redirect: true }));
    }

  render () {
      const { redirect } = this.state;
      if (redirect) {
         return <Redirect to='/'/>;
      }
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}}>
        <h1>Forgot your password?</h1>
        <p>Enter your new password: </p>

        <div className="form-error">
             <FormErrors formErrors={this.state.formErrors} />
        </div>

        <form method="POST" className="form-group">
					<input type="password"
                            name="new_password"
                            className="form-control reset-pass-form"
							placeholder="Enter New Password"
                            value={this.state.new_password}
							onChange = {this.handlChangePassword}
							required/>
                    <input type="password"
                            name="re_new_password"
							className="form-control reset-pass-form"
							placeholder="Retype New Password"
                            value={this.state.re_new_password}
							onChange = {this.handlChangePassword}
							required/>
					<button type="button"
							className="btn btn-warning reset-pass-form"
							onClick={this.handleSubmitNewPassword}
                            disabled={!this.state.formValid}>Change password</button>
        </form>
        </Container>
      </div>
      )
  }
}
