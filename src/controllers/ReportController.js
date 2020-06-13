 const { Op } = require('sequelize');
 const User = require('../models/User');

 module.exports = {
    async show(req, res) {
      // find all users with end email with rocketseat.com.br 
      // and live at guilher guenbal street
      // and have react as technologies;
      
      const users = await User.findAll({
        attributes: ['name', 'email'],
        where: {
          email: {
            [Op.iLike]: '%@gmail.com'
          }
        },
        include: [
          { 
            association: 'addresses',
             where: {
               street: 'lidia tome'
              }  
            }, // first for addresses
          { 
            association: 'techs',
            required: false, //faz leftouterjoin, retorna msmo s/ techs
            where: {
              name: {
                [Op.iLike]: 'React%'
              }
            }
          }, // second for techs
        ],
      });

      return res.json({report: users});
   }
 }

