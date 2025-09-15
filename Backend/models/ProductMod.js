import { Sequelize } from "sequelize";
import db from "../database/indexDb.js";
import Users from "./UserMod.js";

const { DataTypes } = Sequelize;

const Product = db.define("product", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true,
            len: [4, 100]
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Product);
Product.belongsTo(Users, { foreignKey: "userId" });

export default Product;