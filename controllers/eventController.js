const Event = require('../models/Event');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configure Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
exports.createEvent = async (req, res, next) => {
    try {
        const newEvent = new Event(req.body);

        // Example: Use Gemini to enhance the event description
        const prompt = `Summarize this event description in 50 words or less: ${newEvent.description}`;
        const result = await model.generateContent(prompt);
        const geminiResponse = await result.response;
        const summary = geminiResponse.text();

        // Add the summary to the event object
        newEvent.geminiSummary = summary;


        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', data: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// @desc    Get all upcoming events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date
    res.status(200).json({ data: events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};