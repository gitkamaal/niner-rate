import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema for the Review model
const reviewSchema = new Schema({
    courseName: { type: String, required: true },
    studentName: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true }
});

// Define the Review model
const Review = mongoose.model('Review', reviewSchema);

export default Review;