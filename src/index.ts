import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});