import Users from "../models/UserMod.js";
import { Op } from "sequelize";
import argon2 from "argon2";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
  const { id } = req.params; 
  try {
    const user = await Users.findOne({ 
      attributes: ['uuid', 'name', 'email', 'role'],
      where: { uuid: id } 
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confPassword, role } = req.body;

    if (!name || !email || !password || !confPassword || !role) {
      return res.status(400).json({ message: "Name, email, password, and role are required" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ message: "Password and confirmation do not match" });
    }

    const exist = await Users.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = await argon2.hash(password);

    const user = await Users.create({
      name,
      email,
      password: hashPassword,
      role
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUser = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    const { id } = req.params;

    if (!name || !email || !password || !confPassword) {
        return res.status(400).json({ message: "name, email, password and confPassword are required" });
    }
    try {
        const user = await Users.findOne({attributes: ['uuid', 'name', 'email', 'role'],
             where: { uuid: id } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });}
        if (password !== confPassword) {
            return res.status(400).json({ message: "Password and confirmation do not match" });
        }
        const exist = await Users.findOne({
            where: { email, uuid: { [Op.ne]: id } }
        });
        let hashPassword
        if(password === "" || password === null || password === undefined) {
            hashPassword = user.password
        } else {
            hashPassword = await argon2.hash(password)
        }
        if (exist) {
            return res.status(400).json({ message: "User email already exists" });
        }
        user.name = name;
        user.email = email;
        user.password = hashPassword;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.destroy({
            where: {
                uuid: id
            }
        });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};