import express from 'express';
import mongoose from 'mongoose';

import StandModel from '../models/standModel.js';

const router = express.Router();

export const getStands = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await StandModel.countDocuments({});
        const stands = await StandModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: stands, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getStandsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const stands = await StandModel.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: stands });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getStandsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const stands = await StandModel.find({ name });

        res.json({ data: stands });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getStand = async (req, res) => { 
    const { id } = req.params;

    try {
        const stand = await StandModel.findById(id);
        
        res.status(200).json(stand);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createStand = async (req, res) => {
    const stand = req.body;

    const newStandModel = new StandModel({ ...stand, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newStandModel.save();

        res.status(201).json(newStandModel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateStand = async (req, res) => {
    const { id } = req.params;
    const { city, street, locationDescription, selectedFile, firstName, lastName, phone, location } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No stand with id: ${id}`);

    const updatedStand = { city, street, locationDescription, location, selectedFile, firstName, lastName, phone, _id: id };

    await StandModel.findByIdAndUpdate(id, updatedStand, { new: true });

    res.json(updatedStand);
}

export const deleteStand = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No stand with id: ${id}`);

    await StandModel.findByIdAndRemove(id);

    res.json({ message: "Stand deleted successfully." });
}

export const likeStand = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No stand with id: ${id}`);
    
    const stand = await StandModel.findById(id);

    const index = stand.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      stand.likes.push(req.userId);
    } else {
      stand.likes = stand.likes.filter((id) => id !== String(req.userId));
    }

    const updatedStand = await StandModel.findByIdAndUpdate(id, stand, { new: true });

    res.status(200).json(updatedStand);
}

export const commentStand = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const stand = await StandModel.findById(id);

    stand.comments.push(value);

    const updatedStand = await StandModel.findByIdAndUpdate(id, stand, { new: true });

    res.json(updatedStand);
};

export default router;