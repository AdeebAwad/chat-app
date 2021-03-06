const users = [];

// Join user to chat
function userJoin(id, username) {
  const user = { id, username };
  users.push(user);
  return user;
}

// Check user name
function checkUser(username) {
  const index = users.findIndex((user) => user.username === username);
  //User Exists
  if (index !== -1) {
    return true;
  }
  //User Does Not Exists
  return false;
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  userJoin,
  checkUser,
  userLeave,
};
