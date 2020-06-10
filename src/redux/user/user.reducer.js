import { UserActionTypes } from "./user.actionTypes";
import { addCapitalToUser, addTransactionToUser } from "./user.utility";

const INITIAL_STATE = {
  usersList: [
    {
      email: "may@may.com",
      name: "may",
      transactions: [
        {
          from: "may",
          to: "june",
          amount: 23,
          payment_type: "cash",
          created_at: new Date().toDateString(),
        },
      ],
      capitals: [
        {
          created_at: new Date().toDateString(),
          document: { name: "may.png" },
          amount: 32,
        },
      ],
      created_at: new Date(),
      password: "may",
    },
    {
      email: "june@june.com",
      name: "june",
      transactions: [
        {
          from: "june",
          to: "april",
          amount: 32,
          payment_type: "card",
          created_at: new Date().toDateString(),
        },
      ],
      capitals: [
        {
          created_at: new Date().toDateString(),
          document: { name: "june.png" },
          amount: 32,
        },
      ],
      created_at: new Date(),
      password: "june",
    },
  ],
  isAuthenticated: null,
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.ADD_TRANSACTION:
      return {
        ...state,
        usersList: addTransactionToUser(state.usersList, action.payload),
      };
    case UserActionTypes.ADD_CAPITAL:
      return {
        ...state,
        usersList: addCapitalToUser(state.usersList, action.payload),
      };
    case UserActionTypes.LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: null,
        currentUser: null,
      };
    case UserActionTypes.SIGNUP_USER:
      return {
        ...state,
        usersList: [...state.usersList, action.payload],
        isAuthenticated: true,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
