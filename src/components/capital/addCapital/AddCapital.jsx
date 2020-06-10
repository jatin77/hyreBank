import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputField from "../../common/inputField/InputField";
import SubmitButton from "../../common/submitButton/SubmitButton";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../../redux/user/user.selector";
import { addCapital } from "../../../redux/user/user.action";

export class AddCapital extends Component {
  state = {
    amount: "",
    paymentType: "card",
    document: null,
  };

  handleChangePaymentType = (e) => {
    this.setState({
      paymentType: e.target.value,
    });
  };

  // Form Submit Handle for Update and Create Message
  handleSubmit = (e) => {
    e.preventDefault();

    let invalidAmount = this.validateInput("amount");
    let invalidDocument = this.state.document === null;
    if (!invalidAmount && !invalidDocument) {
      const sendData = {
        capital: {
          amount: this.state.amount,
          document: { name: this.state.document.name },
          created_at: new Date().toDateString(),
        },
        user: {
          email: this.props.userData.currentUser.email,
        },
      };
      this.props.addCapital(sendData);
      this.setState({
        amount: "",
        document: null,
      });
    } else if (!invalidAmount && invalidDocument) {
      alert("Attach document");
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
  handleFileUpload = (e) => {
    this.setState({
      document: e.target.files[0],
    });
  };
  render() {
    return (
      <Paper elevation={3} className="py-4 px-5">
        <Typography className="text-center" variant="h6" gutterBottom>
          Upload Document
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          ref={(el) => (this.myFormRef = el)}
        >
          <div className="my-5">
            <Button
              variant="contained"
              component="label"
              className="w-full"
              size="small"
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={this.handleFileUpload}
              />
            </Button>
          </div>
          {this.state.document ? (
            <div className="my-5">
              <Chip label={this.state.document.name} />
            </div>
          ) : null}

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
  addCapital: (data) => dispatch(addCapital(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCapital);
