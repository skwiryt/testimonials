const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');


router.route('/seats').get(SeatsController.getAll);
router.route('/seats/random').get(SeatsController.getRandom);
router.route('/seats/:id').get(SeatsController.getOne);
router.route('/seats').post(SeatsController.addOne);
router.route('/seats/:id').put(SeatsController.edit);
router.route('/seats/:id').delete(SeatsController.delete);


module.exports = router;