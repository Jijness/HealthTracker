import { Router } from "express";
import { check } from "express-validator";
import { checkAuth } from "../middleware/checkAuth.js";
import dailyStatController from "../controllers/dailyStatController.js";


const dailyStatRoutes = Router();

dailyStatRoutes.use(checkAuth);

// dự cái này là cho việc lấy toàn bộ bản ghi hoặc trong vòng 7 ngày hoặc xa hơn để vẽ biểu đồ
dailyStatRoutes.get('/', checkAuth, dailyStatController.getDailyStats);
dailyStatRoutes.get('/today', checkAuth, dailyStatController.getTodayStat);

// riêng cho nhập giờ ngủ, giờ thức dậy
dailyStatRoutes.patch('/sleep',
    [
        check('sleepTime').notEmpty(),
        check('wakeTime').notEmpty()
    ],
    dailyStatController.updateSleepStat);
// riêng cho cập nhật bước chân ???
dailyStatRoutes.patch('/step',
    [
        check('steps').isInt({ min: 0 })
    ],
    dailyStatController.updateStepStat);

export default dailyStatRoutes;