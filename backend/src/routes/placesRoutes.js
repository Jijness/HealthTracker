import { Router } from 'express';
import placeController from '../controllers/placesController.js';
import { check } from 'express-validator';

const placeRoutes = Router();



placeRoutes.get('/:pid', placeController.getPlaceById);

placeRoutes.get('/user/:uid', placeController.getPlacesByUserId);

placeRoutes.post('/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    placeController.createPlace
);

placeRoutes.patch('/:pid', placeController.updatePlace);

placeRoutes.delete('/:pid', placeController.deletePlace);

export default placeRoutes;