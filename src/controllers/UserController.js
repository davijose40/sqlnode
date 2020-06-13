const User = require('../models/User');

module.exports = {
  index: async(req, res) => {
    const users = await User.findAll();
    return res.json(users);
  },

  store: async(req, res) => {
    const { name, email, age } = req.body;
    
    const user = await User.create({
      name,
      email,
      age
    });
    
    return res.json(user);
  },
  
};