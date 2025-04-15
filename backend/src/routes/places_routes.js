import { Router } from 'express';
import placeController from '../controllers/places-controller.js';


const placeRouter = Router();



placeRouter.get('/:pid', placeController.getPlaceById);
placeRouter.get('/user/:uid', placeController.getPlacesByUserId);
placeRouter.post('/', placeController.createPlace);
placeRouter.patch('/:pid', placeController.updatePlace);
placeRouter.delete('/:pid', placeController.deletePlace);

export default placeRouter;