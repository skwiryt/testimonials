const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialsController.getAll);

router.route('/testimonials/random').get(TestimonialsController.getRandom);

router.route('/testimonials/:id').get(TestimonialsController.getOne);

router.route('/testimonials').post(TestimonialsController.addOne);
router.route('/testimonials/:id').put(TestimonialsController.edit);
router.route('/testimonials/:id').delete(TestimonialsController.delete);


module.exports = router;