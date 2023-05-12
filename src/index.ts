require('dotenv').config()
import express , { Express }  from 'express';
import {sequelize} from './db';
import cors from 'cors';
import {models} from './models/models';
import router from './route/index';

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");
const path = require('path')
const errorHandler = require('./middleware/handlerMiddlewre')
const fileUpload = require('express-fileupload')


const model = models
const app: Express = express();
const PORT: string = process.env.PORT || '2000';


app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use(errorHandler)


const start =  async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
  }catch (e){
    console.log(e)
  }
}
start()



