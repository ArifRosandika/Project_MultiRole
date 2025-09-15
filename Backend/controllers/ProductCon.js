import Product from "../models/ProductMod.js";
import { Op } from "sequelize";
import Users from "../models/UserMod.js";

export const getAllProducts = async (req, res) => {
    try {
        let response;
        if(req.role === "admin") {
            response = await Product.findAll({
                include: [{
                    model: Users,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    userId: req.userId
                }, 
                include: [{
                    model: Users,
                    attributes: ['name', 'email', 'role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};


export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: {
                uuid: id
            }
        });
        if (!product) return res.status(404).json({ message: "Product not found" });
        let response;
        if(req.role === "admin") {
            response = await Product.findOne({
                include: {
                    model: Users,
                    attributes: ['name', 'email', 'role']
                },
                where: {
                    uuid: product.uuid
                }
            });
        } else {
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }, 
                include: [{
                    model: Users,
                    attributes: ['name', 'email', 'role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    if (!req.userId) return res.status(401).json({ message: "Unauthorized: userId not found" });

    const exist = await Product.findOne({ where: { name } });
    if (exist) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const product = await Product.create({
      name,
      price,
      userId: req.userId 
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { uuid: id } });

    if (!product) return res.status(404).json({ message: "Product not found" });
    const { name, price } = req.body;

    if(req.role === "admin") {
        await Product.update({ name, price }, { where: { uuid: product.uuid } });
    } else {
        if(req.userId !== product.userId) return res.status(403).json({ message: "Admin only" });
        await Product.update({ name, price }, { where: { [Op.and]: [{ uuid: product.uuid }, { userId: req.userId }] } });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { uuid: id } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    if(req.role === "admin") {
        await Product.destroy({ where: { uuid: product.uuid } });
    } else {
        if(req.userId !== product.userId) return res.status(403).json({ error: "Admin only" });
        await Product.destroy({ where: { [Op.and]: [{ uuid: product.uuid }, { userId: req.userId }] } });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}