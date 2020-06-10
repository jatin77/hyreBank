import { createSelector } from "reselect";

const selectAllUser = (state) => state.user;

export const selectAllUserData = createSelector(
  [selectAllUser],
  (user) => user
);
