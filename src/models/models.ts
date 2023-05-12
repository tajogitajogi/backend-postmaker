import {sequelize} from '../db';
import { DataTypes } from 'sequelize';


export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})


export const Posts = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: true},
    author:{type: DataTypes.STRING, allowNull: false}
    

})


User.hasMany(Posts)
Posts.belongsTo(User)


export const models = [
    User,
    Posts
]