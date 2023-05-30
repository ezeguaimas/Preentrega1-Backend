import express from "express";
import ProductRouter from "./routes/ProductRouter.js";
import CartRouter from "./routes/CartRouter.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de productos
app.use("/api/products", ProductRouter);

// Ruta de carritos
app.use("/api/carts", CartRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
