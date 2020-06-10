export const addCapitalToUser = (usersList, data) => {
  const user = usersList.find((user) => user.email === data.user.email);
  user.capitals.push(data.capital);
  return usersList;
};

export const addTransactionToUser = (usersList, data) => {
  const user = usersList.find((user) => user.email === data.user.email);
  user.transactions.push(data.transaction);
  return usersList;
};
