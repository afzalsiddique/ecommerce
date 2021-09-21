import express from "express";
import mongoose from "mongoose";
// import data from "./data.js";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";

// set up .env file later
import {mongoURI} from "./EnvVariables";

const app = express();
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
    console.log('DATABASE CONNECTION FAILED')
  });

// static data
// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

// static data
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)

app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use((err,req,res,next)=>{
  res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
