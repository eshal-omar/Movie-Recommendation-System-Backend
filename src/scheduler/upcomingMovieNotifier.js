// const cron = require('node-cron');
// const UpcomingMovie = require('../models/UpcomingMovie');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables

// // Set up email transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Send a test email to verify the email functionality
// const sendTestEmail = () => {
//     transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: 'eshalomar951@gmail.com',  // Send to your email for testing
//         subject: 'Test Email',
//         text: 'This is a test email.',
//     }, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// };

// // Call the test email function to verify that sending works
// sendTestEmail();

// // Schedule daily notifications (for upcoming movie releases)
// const scheduleNotifications = () => {
//     cron.schedule('0 8 * * *', async () => { // This cron expression will run daily at 8 AM
//         console.log('Running daily notification task...');
//         const today = new Date();
//         const tomorrow = new Date();
//         tomorrow.setDate(today.getDate() + 1);

//         try {
//             // Find upcoming movies releasing tomorrow
//             const upcomingMovies = await UpcomingMovie.find({
//                 releaseDate: { $gte: today, $lte: tomorrow },
//             }).populate('reminders');

//             // Iterate over the movies and send notifications to the users
//             for (const movie of upcomingMovies) {
//                 for (const user of movie.reminders) {
//                     // Send email notification
//                     await transporter.sendMail({
//                         from: process.env.EMAIL_USER,
//                         to: user.email,
//                         subject: `Upcoming Movie: ${movie.title}`,
//                         text: `Don't miss out! "${movie.title}" is releasing on ${movie.releaseDate.toDateString()}!`,
//                     });

//                     console.log(`Notification sent to ${user.email} for ${movie.title}`);
//                 }
//             }
//         } catch (error) {
//             console.error('Error sending notifications:', error);
//         }
//     });
// };

// // Export the scheduleNotifications function to use it in other parts of the app
// module.exports = { scheduleNotifications };
