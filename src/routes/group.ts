import { Router } from "express";
import {
  createUserGroup,
  updateGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
} from "../controllers/groupController";
import { auth } from "../middleware/auth";
const router = Router();

router.post("/create", auth, createUserGroup);
router.patch("/edit/:id", auth, updateGroup);
router.get("/all", auth, getAllGroups);
router.get("/user/:id", auth, getGroupById);
router.delete("/delete/:id", deleteGroup);

export default router;
