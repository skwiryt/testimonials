const express = require('express');
const ConcertsController = require('../controllers/concerts.controller');
const router = express.Router();

router.route('/concerts').get(ConcertsController.getAll);
router.route('/concerts/random').get(ConcertsController.getRandom);
router.route('/concerts/:id').get(ConcertsController.getOne);
router.route('/concerts').post(ConcertsController.addOne);
router.route('/concerts/:id').put(ConcertsController.edit);
router.route('/concerts/:id').delete(ConcertsController.delete);

module.exports = router;