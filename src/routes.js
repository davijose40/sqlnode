const express = require('express');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

routes.get('/', (req, res) => res.json({hello: "world!"}))

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:id/address', AddressController.index);
routes.post('/users/:id/address', AddressController.store);

routes.get('/users/:id/techs', TechController.index);
routes.post('/users/:id/techs', TechController.store);
routes.delete('/users/:id/techs', TechController.delete);

routes.get('/report', ReportController.show);



module.exports = routes;