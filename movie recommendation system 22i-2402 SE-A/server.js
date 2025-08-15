const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const listRoutes = require('./src/routes/listRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const boxofficeRoutes = require('./src/routes/boxOfficeRoutes');
const awardRoutes = require('./src/routes/awardRoutes');
const recommendationRoutes = require('./src/routes/recommendationRoutes');
const discussionRoutes = require('./src/routes/discussionRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
//const { scheduleNotifications } = require('./src/scheduler/upcomingMovieNotifier');


console.log(connectDB);


dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/movies',movieRoutes);
app.use('/',userRoutes);
app.use('/list',listRoutes);
app.use('/reviews',reviewRoutes);
app.use('/news',newsRoutes);
app.use('/boxOffice',boxofficeRoutes);
app.use('/awards',awardRoutes);
app.use('/recommendation',recommendationRoutes);
app.use('/discussion',discussionRoutes);
app.use('/admin',adminRoutes);


//scheduleNotifications();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
