const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
  index: async(req, res) => {
    const user_id = req.params.id;

    const user = await User.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['name'],
        through: {
          attributes: ['user_id']
        }
      }
    });

    return res.json(user.techs);

  },

  store: async(req, res) => {
    const user_id = req.params.id;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if(!user) res.status(400).json({message: 'User not found'})

    const [ tech, created ] = await Tech.findOrCreate({
      where: { name }
    });

    message = (created) ? "tech criado com sucesso" : "tech já existe";
    console.log(message);

    await user.addTech(tech);

    return res.json(tech);

  },

  delete: async(req, res) => {
    const user_id = req.params.id;
    const { name } = req.body;

    const user = await User.findByPk(user_id);
    if(!user) res.status(400).json({message: 'User not found'});
    
    const tech = await Tech.findOne({
      where: {
        name,
      }
    });

    await user.removeTech(tech);

    return res.json();

  }
  
};