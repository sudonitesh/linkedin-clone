import React, { Component } from "react";
import axios from 'axios'
import classnames from 'classnames'
// import { Redirect } from 'react-router-dom'

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
			password2: "",
			// redirectTo: null,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
			[e.target.name]: e.target.value 
		});
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // console.log(newUser);
		axios
			.post('/api/users/register', newUser)
			.then(res => {
				console.log('[+] ' , res.data)
			})
			.catch(err => {
        console.log(err.response.data)
        this.setState({
          errors: err.response.data
        })
      })
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control, form-control-lg', {
                      'is-invalid': errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {
                    errors.name && (
                      <span className="alert alert-danger"> {errors.name} </span>
                    )
                  }
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control, form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {
                    errors.email && (
                      <span className="alert alert-danger"> {errors.email} </span>
                    )
                  }
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control, form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {
                    errors.password && (
                      <span className="alert alert-danger"> {errors.password} </span>
                    )
                  }
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control, form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {
                    errors.password2 && (
                      <span className="alert alert-danger"> {errors.password2} </span>
                    )
                  }
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
