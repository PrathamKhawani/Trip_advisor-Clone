const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tripadvisor', { useNewUrlParser: true, useUnifiedTopology: true });

const listingSchema = new mongoose.Schema({
    name: String,
    description: String,
    rating: { type: Number, default: 0 },
    reviews: [String],
    image: String
});
const Listing = mongoose.model('Listing', listingSchema);

// Get all listings
app.get('/api/listings', async (req, res) => {
    const listings = await Listing.find();
    res.json(listings);
});

// Add a new listing
app.post('/api/listings', async (req, res) => {
    const { name, description, image } = req.body;
    if (name && description) {
        const listing = new Listing({ name, description, image });
        await listing.save();
        res.status(201).json({ message: 'Listing added.' });
    } else {
        res.status(400).json({ message: 'Invalid data.' });
    }
});

// Delete a listing
app.delete('/api/listings/:id', async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted.' });
});

// Add a review
app.post('/api/listings/:id/review', async (req, res) => {
    const { review } = req.body;
    const listing = await Listing.findById(req.params.id);
    if (listing && review) {
        listing.reviews.push(review);
        await listing.save();
        res.json({ message: 'Review added.' });
    } else {
        res.status(400).json({ message: 'Invalid data.' });
    }
});

// Rate a listing
app.post('/api/listings/:id/rate', async (req, res) => {
    const { rating } = req.body;
    const listing = await Listing.findById(req.params.id);
    if (listing && rating >= 1 && rating <= 5) {
        listing.rating = rating;
        await listing.save();
        res.json({ message: 'Rating updated.' });
    } else {
        res.status(400).json({ message: 'Invalid data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});