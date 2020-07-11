const { model } = require('mongoose');
const User = model('User');

class UserService {
  async getUser({ email }) {
    const user = await User.findOne({ email });
    return user;
  }

  async createUser({ user }) {
    const { username, email, password } = user;
    const newUser = new User({ username, email });

    await newUser.setPassword(password);
    const userCreated = await newUser.save();

    return userCreated;
  }
}

module.exports = UserService;
