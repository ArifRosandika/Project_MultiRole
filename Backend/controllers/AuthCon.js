import Users from "../models/UserMod.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: ['uuid', 'name', 'email', 'password', 'role'],
      where: { email: req.body.email }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    req.session.userId = user.uuid;
    console.log(req.session.userId);

    const {password, ...saveUser} = user.dataValues;
    res.json({ message: "Login success", user: saveUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const Me = async (req, res) => {
  console.log('session', req.session);
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
  try {
    const user = await Users.findOne({
      attributes: ['uuid', 'name', 'email', 'role'],
      where: { uuid: req.session.userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ message: "Logout failed" });
        res.status(200).json({ message: "Logout success" });
    });
}