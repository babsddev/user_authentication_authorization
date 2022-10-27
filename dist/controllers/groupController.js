"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.updateGroup = exports.getGroupById = exports.getAllGroups = exports.createUserGroup = void 0;
const uuid_1 = require("uuid");
const group_1 = require("../models/group");
async function createUserGroup(req, res) {
    try {
        let newId = (0, uuid_1.v4)();
        const { account, engineering, humanResource } = req.body;
        const userID = req.user.id;
        const group = await group_1.GroupInstance.create({
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
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.createUserGroup = createUserGroup;
async function getAllGroups(req, res) {
    try {
        const groups = await group_1.GroupInstance.findAll();
        return res.status(200).json({
            message: "groups retrieved successfully",
            groups,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.getAllGroups = getAllGroups;
async function getGroupById(req, res) {
    try {
        const { id } = req.params;
        const group = await group_1.GroupInstance.findOne({ where: { id: id } });
        if (!group) {
            return res.status(404).json({
                message: "group not found",
            });
        }
        return res.status(200).json({
            message: "group retrieved successfully",
            group,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.getGroupById = getGroupById;
async function updateGroup(req, res) {
    try {
        const { id } = req.params;
        const { account, engineering, humanResource } = req.body;
        const group = await group_1.GroupInstance.findOne({ where: { id: id } });
        if (!group) {
            return res.status(404).json({
                message: "group not found",
            });
        }
        await group_1.GroupInstance.update({ account, engineering, humanResource }, { where: { id: id } });
        return res.status(200).json({
            message: "group updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.updateGroup = updateGroup;
async function deleteGroup(req, res) {
    try {
        const { id } = req.params;
        const group = await group_1.GroupInstance.findOne({ where: { id: id } });
        if (!group) {
            return res.status(404).json({
                message: "group not found",
            });
        }
        await group_1.GroupInstance.destroy({ where: { id: id } });
        return res.status(200).json({
            message: "group deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error",
        });
        throw new Error(`${error}`);
    }
}
exports.deleteGroup = deleteGroup;
//# sourceMappingURL=groupController.js.map