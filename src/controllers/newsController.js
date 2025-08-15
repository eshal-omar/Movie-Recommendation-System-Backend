const News = require('../models/News');


const addNews = async (req, res) => {
    const { title, content, source, category } = req.body;

    try {
        const news = new News({ title, content, source, category });
        await news.save();
        res.status(201).json({ message: 'News article added successfully', news });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getNews = async (req, res) => {
    try {
        const news = await News.find().sort({ publishedAt: -1 });  
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getNewsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const news = await News.find({ category }).sort({ publishedAt: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addNews, getNews, getNewsByCategory };
