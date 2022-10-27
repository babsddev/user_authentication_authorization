"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/create', auth_1.auth, roleController_1.createUserRole);
router.patch('/edit/:id', auth_1.auth, roleController_1.updateRole);
router.get('/all', auth_1.auth, roleController_1.getAllRoles);
router.get('/user/:id', auth_1.auth, roleController_1.getRoleById);
router.delete('/delete/:id', roleController_1.deleteRole);
exports.default = router;
//# sourceMappingURL=role.js.map