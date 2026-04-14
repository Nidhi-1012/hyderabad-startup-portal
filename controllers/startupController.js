const Startup = require('../models/Startup');

const fs = require('fs');
const path = require('path');

// GET all startups
const getStartups = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        let startups = [];
        let total = 0;

        // Check if DB is connected
        const isConnected = mongoose.connection.readyState === 1;

        if (isConnected) {
            let query = {};
            if (category && category !== 'All') {
                query.category = { $regex: new RegExp(category, 'i') };
            }
            if (search) {
                query.$or = [
                    { name: { $regex: new RegExp(search, 'i') } },
                    { category: { $regex: new RegExp(search, 'i') } }
                ];
            }
            const skip = (page - 1) * limit;
            startups = await Startup.find(query)
                .skip(parseInt(skip))
                .limit(parseInt(limit))
                .sort({ createdAt: -1 });
            total = await Startup.countDocuments(query);
        } else {
            // Fallback mock data if DB is down
            console.warn("DB not connected, serving mock startups from backend_fallback.json");
            const fallbackPath = path.join(__dirname, '../backend_fallback.json');
            let mockAll = [];
            if (fs.existsSync(fallbackPath)) {
                mockAll = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
            }

            // Filter
            let filtered = mockAll.filter(s => {
                const matchesCat = !category || category === 'All' || s.category.toLowerCase() === category.toLowerCase();
                const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
                return matchesCat && matchesSearch;
            });

            total = filtered.length;
            startups = filtered.slice((page-1)*limit, page*limit);
        }

        res.status(200).json({
            startups,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            totalCount: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startups', error: error.message });
    }
};

// GET single startup
const getStartupById = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
            return res.status(404).json({ message: 'Startup not found' });
        }
        res.status(200).json(startup);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching startup', error: error.message });
    }
};

// POST add startup
const createStartup = async (req, res) => {
    try {
        const { name, category, founder, description, location } = req.body;
        
        const newStartup = new Startup({
            name,
            category,
            founder,
            description,
            location
        });

        const savedStartup = await newStartup.save();
        res.status(201).json(savedStartup);
    } catch (error) {
        res.status(500).json({ message: 'Error creating startup', error: error.message });
    }
};

// PUT update startup
const updateStartup = async (req, res) => {
    try {
        const updatedStartup = await Startup.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedStartup) {
            return res.status(404).json({ message: 'Startup not found' });
        }
        
        res.status(200).json(updatedStartup);
    } catch (error) {
        res.status(500).json({ message: 'Error updating startup', error: error.message });
    }
};

// DELETE startup
const deleteStartup = async (req, res) => {
    try {
        const deletedStartup = await Startup.findByIdAndDelete(req.params.id);
        
        if (!deletedStartup) {
            return res.status(404).json({ message: 'Startup not found' });
        }
        
        res.status(200).json({ message: 'Startup deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting startup', error: error.message });
    }
};

module.exports = {
    getStartups,
    getStartupById,
    createStartup,
    updateStartup,
    deleteStartup
};
