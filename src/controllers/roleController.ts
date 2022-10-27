import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RoleInstance } from "../models/role";

export async function createUserRole(
  req: Request | any,
  res: Response
): Promise<unknown> {
  try {
    let newId = uuidv4();
    const { junior, midLevel, senior } = req.body;
    const userID = req.user.id;
    const Role = await RoleInstance.create({
      id: newId,
      junior,
      midLevel,
      senior,
      userID,
    });
    return res.status(201).json({
      message: "Role created successfully",
      Role,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function getAllRoles(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const Roles = await RoleInstance.findAll();
    return res.status(200).json({
      message: "Roles retrieved successfully",
      Roles,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function getRoleById(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params;
    const Role = await RoleInstance.findOne({ where: { id: id } });
    if (!Role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    return res.status(200).json({
      message: "Role retrieved successfully",
      Role,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function updateRole(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params;
    const { junior, midLevel, senior } = req.body;
    const Role = await RoleInstance.findOne({ where: { id: id } });
    if (!Role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    await RoleInstance.update(
      { junior, midLevel, senior },
      { where: { id: id } }
    );
    return res.status(200).json({
      message: "Role updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function deleteRole(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params;
    const Role = await RoleInstance.findOne({ where: { id: id } });
    if (!Role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    await RoleInstance.destroy({ where: { id: id } });
    return res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}
