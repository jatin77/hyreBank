import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputField from "../../common/inputField/InputField";
import SubmitButton from "../../common/submitButton/SubmitButton";
import { connect } from "react-redux";
import { addTransaction } from "../../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../../redux/user/user.selector";

export class AddTransaction extends Component {
  state = {
    from: "",
    to: "",
    amount: "",
    paymentType: "card",
  };

  handleChangePaymentType = (e) => {
    this.setState({
      paymentType: e.target.value,
    });
  };

  // Form Submit Handle for Update and Create Message
  handleSubmit = (e) => {
    e.preventDefault();

    let invalidFrom = this.validateInput("from");
    let invalidTo = this.validateInput("to");
    let invalidAmount = this.validateInput("amount");
    if (!invalidFrom && !invalidTo && !invalidAmount) {
      const sendData = {
        transaction: {
          from: this.state.from,
          to: this.state.to,
          amount: this.state.amount,
          payment_type: this.state.paymentType,
          created_at: new Date().toDateString(),
        },
        user: {
          email: this.props.userData.currentUser.email,
        },
      };
      this.props.addTransaction(sendData);
      this.setState({
        from: "",
        to: "",
        amount: "",
        document: null,
      });
      console.log("pass");
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
      <Paper elevation={3} className="py-4 px-5">
        <Typography variant="h6" gutterBottom className="text-center">
          New Transaction
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          ref={(el) => (this.myFormRef = el)}
        >
          <div className="mb-5">
            <InputField
              value={this.state.from}
              handleChange={this.handleChange}
              error={this.state.fromError}
              label="From"
              name="from"
              type="text"
            />
          </div>
          <div className="mb-5">
            <InputField
              value={this.state.to}
              handleChange={this.handleChange}
              error={this.state.toError}
              label="To"
              name="to"
              type="text"
            />
          </div>
          <div className="mb-5">
            <InputField
              value={this.state.amount}
              handleChange={this.handleChange}
              error={this.state.amountError}
              label="Amount"
              name="amount"
              type="number"
            />
          </div>
          <div className="mt-8">
            <FormControl component="fieldset" className="w-full">
              <FormLabel component="legend">Payment Type</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                value={this.state.paymentType}
                className="justify-center"
                onChange={this.handleChangePaymentType}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio color="primary" />}
                  label="Card"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio color="primary" />}
                  label="Cash"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mt-8">
            <SubmitButton text="ADD" />
          </div>
        </form>
      </Paper>
    );
  }
}

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  userData: selectAllUserData,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  addTransaction: (data) => dispatch(addTransaction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
