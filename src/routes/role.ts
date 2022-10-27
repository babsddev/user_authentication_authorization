import { Router } from "express";
import {
  createUserRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRoleById,
} from "../controllers/roleController";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/create", auth, createUserRole);
router.patch("/edit/:id", auth, updateRole);
router.get("/all", auth, getAllRoles);
router.get("/user/:id", auth, getRoleById);
router.delete("/delete/:id", deleteRole);

export default router;
