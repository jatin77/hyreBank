import { UserActionTypes } from "./user.actionTypes";

export const addTransaction = (data) => ({
  type: UserActionTypes.ADD_TRANSACTION,
  payload: data,
});

export const addCapital = (data) => ({
  type: UserActionTypes.ADD_CAPITAL,
  payload: data,
});

export const addLoan = (data) => ({
  type: UserActionTypes.ADD_LOAN,
  payload: data,
});

export const loginUser = (user) => ({
  type: UserActionTypes.LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const signupUser = (user) => ({
  type: UserActionTypes.SIGNUP_USER,
  payload: user,
});
