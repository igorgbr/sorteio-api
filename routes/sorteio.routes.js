module.exports = (app) => {
  const participants = require('../controllers/sorteio.controller.js');

  const router = require('express').Router();

  router.post('/', participants.create);

  // Retrieve all participants
  router.get('/', participants.findAll);

  router.get('/sort', participants.sortOne);

  // // Retrieve a single Tutorial with id
  router.get('/:id', participants.findOne);

  // // Update a participants with id
  router.put('/:id', participants.update);

  // // Delete a participants with id
  router.delete('/:id', participants.delete);

  // // Delete all participants
  router.delete('/', participants.deleteAll);

  app.use('/api/participants', router);
};
