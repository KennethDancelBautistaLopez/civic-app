import Event from '../Models/Event.js';



// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const newEvent = new Event({ title, description, date, location });
    await newEvent.save();
    res.status(201).json({ msg: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update event by ID
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location },
      { new: true }
    );
    res.json({ msg: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete event by ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id);
    res.json({ msg: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};




