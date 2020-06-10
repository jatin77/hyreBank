import React, { Component } from "react";
import InputField from "../common/inputField/InputField";
import SubmitButton from "../common/submitButton/SubmitButton";
import { connect } from "react-redux";
import { loginUser } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../redux/user/user.selector";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    passwordError: false,
    emailError: false,
  };
  // Form Submit Handle for Update and Create Message
  handleSubmit = (e) => {
    e.preventDefault();
    const { usersList } = this.props.userData;
    let invalidEmail = this.validateInput("email");
    let invalidPassword = this.validateInput("password");
    if (!invalidEmail && !invalidPassword) {
      const userFound = usersList.filter(
        (user) =>
          user.email === this.state.email &&
          user.password === this.state.password
      )[0];
      if (userFound) {
        console.log(userFound);
        this.props.loginUser({
          email: userFound.email,
          name: userFound.name,
          created_at: userFound.created_at,
          password: userFound.password,
        });
      } else {
        alert("Unauthorized");
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
          <InputField
            value={this.state.password}
            handleChange={this.handleChange}
            error={this.state.passwordError}
            label="Password"
            name="password"
            type="password"
          />
          <div className="mt-8">
            <SubmitButton text="Login" />
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
  loginUser: (user) => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
