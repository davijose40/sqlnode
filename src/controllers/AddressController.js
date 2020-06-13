const Address = require('../models/Address');
const User = require('../models/User');
const { findByPk } = require('../models/User');

module.exports = {
  index: async(req, res) => {
    const user_id  = req.params.id;
    const user = await User.findByPk(user_id, {
      include: { association: 'addresses' }
    });
   
    
    return res.json(user.addresses);
  },

  store: async(req, res) => {
    const  user_id  = req.params.id;
   
    const { zipcode, street, number } = req.body;
    
    const user = await User.findByPk(user_id);

    if (!user) {res.status(400).json({message: "User not found"})}

    const address = await Address.create({
      zipcode,
      street,
      number,
      user_id,
    });
    
    return res.json(address);
  },
  
};