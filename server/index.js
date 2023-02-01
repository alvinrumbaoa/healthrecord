require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("./config/mongoose.config");

app.use(cors({
	credentials: true,
	origin: "http://localhost:3000" ||"https://healthrecord.vercel.app/"  ,
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/user.route")(app);
app.listen(process.env.PORT || 5000, () => console.log(`Server listening on port ${process.env.PORT || 5000}`));