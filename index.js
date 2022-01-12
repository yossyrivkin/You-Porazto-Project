
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';  // to read .env file  
import morgan from 'morgan'; // logeer to dev mode

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

import standRoutes from './routes/stands.js';
import userRouter from './routes/user.js';

const app = express();

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/stands', standRoutes);
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "client", "build")))
console.log(__dirname);


app.get('/', (req, res) => {       
    res.send('Server is Running on heroku!!');  
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);