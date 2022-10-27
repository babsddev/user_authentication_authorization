import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { GroupInstance } from "../models/group";

export async function createUserGroup(
  req: Request | any,
  res: Response
): Promise<unknown> {
  try {
    let newId = uuidv4();
    const { account, engineering, humanResource } = req.body;
    const userID = req.user.id;
    const group = await GroupInstance.create({
      id: newId,
      account,
      engineering,
      humanResource,
      userID,
    });
    return res.status(201).json({
      message: "group created successfully",
      group,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function getAllGroups(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const groups = await GroupInstance.findAll();
    return res.status(200).json({
      message: "groups retrieved successfully",
      groups,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function getGroupById(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params;
    const group = await GroupInstance.findOne({ where: { id: id } });
    if (!group) {
      return res.status(404).json({
        message: "group not found",
      });
    }
    return res.status(200).json({
      message: "group retrieved successfully",
      group,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function updateGroup(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params;
    const { account, engineering, humanResource } = req.body;
    const group = await GroupInstance.findOne({ where: { id: id } });
    if (!group) {
      return res.status(404).json({
        message: "group not found",
      });
    }
    await GroupInstance.update(
      { account, engineering, humanResource },
      { where: { id: id } }
    );
    return res.status(200).json({
      message: "group updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}

export async function deleteGroup(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params;
    const group = await GroupInstance.findOne({ where: { id: id } });
    if (!group) {
      return res.status(404).json({
        message: "group not found",
      });
    }
    await GroupInstance.destroy({ where: { id: id } });
    return res.status(200).json({
      message: "group deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
    throw new Error(`${error}`);
  }
}
