var bcrypt = require('bcryptjs');

const users = [
  {
    name: "Admin",
    email: "admin@cdazzdev.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "User",
    email: "user@cdazzdev.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

// export default users;
module.exports = users;
