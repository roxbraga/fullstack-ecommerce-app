// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require('dotenv').config();
require('./passport'); // Passport Google strategy

// [SECTION] Routes
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const enrollmentRoutes = require("./routes/enrollment");
const cartRoutes = require("./routes/cart");
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/orderRoutes')

// [SECTION] Server Setup
const app = express();
app.use(express.json());

// [SECTION] CORS Configuration
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// [SECTION] Session & Passport Setup
app.use(session({
    secret: process.env.clientSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// [SECTION] MongoDB Connection
mongoose.connect(process.env.MONGODB_STRING)
mongoose.connection.once('open', () => console.log('Connected to MongoDB Atlas.'));

// [SECTION] API Routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/cart", cartRoutes);
app.use('/product', productRoutes);
app.use('/orders', orderRoutes)

// [SECTION] Server Start
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`API is running on port ${PORT}`));
}

// Export app and mongoose for testing or external usage
module.exports = { app, mongoose };
