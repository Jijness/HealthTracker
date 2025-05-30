import { Router } from "express";
import { check } from "express-validator";
import { checkAuth } from "../middleware/checkAuth.js";
import healthSnapController from "../controllers/healthSnapController.js";

const healthSnapRoutes = Router();
// Tất cả route với healthSnap đều cần login trước
healthSnapRoutes.use(checkAuth);

// lay ban ghi moi nhat cua user hien tai
healthSnapRoutes.get('/latest', checkAuth, healthSnapController.getLatestHealthSnap);

healthSnapRoutes.get('/', checkAuth, healthSnapController.getHealthSnaps);

healthSnapRoutes.get('/:snapId', checkAuth, healthSnapController.getHealthSnap);

healthSnapRoutes.post('/', checkAuth,
    [
        check('weight').notEmpty().isNumeric(),
        check('height').notEmpty().isNumeric()
    ],
    healthSnapController.createHealthSnap
);

healthSnapRoutes.put('/:snapId', checkAuth, healthSnapController.updateHealthSnap);

healthSnapRoutes.delete('/:snapId', checkAuth, healthSnapController.deleteHealthSnap);

export default healthSnapRoutes;