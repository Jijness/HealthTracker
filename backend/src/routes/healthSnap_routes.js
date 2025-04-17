import { Router } from "express";
import { check } from "express-validator";
import healthSnapController from "../controllers/healthSnapController";

const healthSnapRoutes = Router();

healthSnapRoutes.get('/user/:userId', healthSnapController.getHealthSnaps);

healthSnapRoutes.get('/:snapId', healthSnapController.getHealthSnap);

healthSnapRoutes.post('/',
    [
        check('user').notEmpty(),
        check('weight').notEmpty().isNumeric(),
        check('height').notEmpty().isNumeric()
    ],
    healthSnapController.createHealthSnap);

healthSnapRoutes.put('/:snapId', healthSnapController.updateHealthSnap);

healthSnapRoutes.delete('/:snapId', healthSnapController.deleteHealthSnap);

export default healthSnapRoutes;