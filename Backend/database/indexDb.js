import { Sequelize } from "sequelize";

const db = new Sequelize('ini_db', 'root','', {
    dialect: 'mysql',
    host: 'localhost'
});

export default db;