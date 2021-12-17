const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload")
dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    },
    ()=> console.log("connected to MongoDB")
)

app.use( fileUpload({
    useTempFiles : true
})
)

//routes
const authRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const productRoutes = require("./routes/ProductRoutes");
const initialDataRoutes = require("./routes/admin/initialData");
const cartRoutes = require("./routes/cart");


app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", initialDataRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(7000, () => console.log("server up and running on port 7000"));