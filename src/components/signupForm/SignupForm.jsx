import React, { Component } from "react";
import InputField from "../common/inputField/InputField";
import SubmitButton from "../common/submitButton/SubmitButton";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../redux/user/user.selector";
import { connect } from "react-redux";
import { signupUser } from "../../redux/user/user.action";

export class SignupForm extends Component {
  state = {
    email: "",
    name: "",
    nameError: false,
    password: "",
    passwordError: false,
    emailError: false,
  };
  // Form Submit Handle for Update and Create Message
  handleSubmit = (e) => {
    e.preventDefault();

    let invalidEmail = this.validateInput("email");
    let invalidName = this.validateInput("name");
    let invalidPassword = this.validateInput("password");
    if (!invalidEmail && !invalidPassword && !invalidName) {
      const userFound = this.props.userData.usersList.filter(
        (user) => user.email === this.state.email
      )[0];
      if (userFound) {
        alert("User Exists!");
      } else {
        this.props.signupUser({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          created_at: new Date(),
          capitals: [],
          transactions: [],
        });
      }
    } else {
      console.log("fail");
    }
  };
  // Validate Input Text Fields
  validateInput = (field) => {
    let error = false;

    let stateName = field + "Error";

    if (!this.state[field]) {
      error = true;
      this.setState({
        [stateName]: true,
      });
    } else {
      error = false;
      this.setState({
        [stateName]: false,
      });
    }

    return error;
  };
  // Store Input Text Values On Change to Local State
  handleChange = (e) => {
    let name = e.target.name;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.validateInput([name])
    );
  };
  render() {
    return (
      <div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          ref={(el) => (this.myFormRef = el)}
        >
          <div className="mb-5">
            <InputField
              value={this.state.email}
              handleChange={this.handleChange}
              error={this.state.emailError}
              label="Email"
              name="email"
              type="text"
            />
          </div>
          <div className="mb-5">
            <InputField
              value={this.state.name}
              handleChange={this.handleChange}
              error={this.state.nameError}
              label="Name"
              name="name"
              type="text"
            />
          </div>
          <InputField
            value={this.state.password}
            handleChange={this.handleChange}
            error={this.state.passwordError}
            label="Password"
            name="password"
            type="password"
          />
          <div className="mt-8">
            <SubmitButton text="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  userData: selectAllUserData,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  signupUser: (user) => dispatch(signupUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
