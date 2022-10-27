"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupController_1 = require("../controllers/groupController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create", auth_1.auth, groupController_1.createUserGroup);
router.patch("/edit/:id", auth_1.auth, groupController_1.updateGroup);
router.get("/all", auth_1.auth, groupController_1.getAllGroups);
router.get("/user/:id", auth_1.auth, groupController_1.getGroupById);
router.delete("/delete/:id", groupController_1.deleteGroup);
exports.default = router;
//# sourceMappingURL=group.js.map