import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js'

const port = process.env.PORT || 5000;


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/blogs',blogRoutes);

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname,'client/dist')));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','dist','index.html')));
} else {
    app.get('/', (req,res)=>res.send('hi'));
}




app.use(notFound);
app.use(errorHandler);
app.listen(port,()=>console.log(`Server Running on http://localhost:${port}`));
