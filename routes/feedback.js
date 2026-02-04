const express = require('express');
const router = express.Router();
// const Feedback = require('../models/Feedback'); // uncomment if you have a model

router.post('/feedback/submit', async (req, res) => {
  try {
    const { feedback_type, message, name } = req.body;
    const submitterName = (name && name.trim()) ? name.trim() : 'Anonymous';

    // Example save (adjust to your DB/model)
    // const fb = new Feedback({ type: feedback_type, message, name: submitterName, createdAt: new Date() });
    // await fb.save();

    // If you previously used auth middleware remove it when wiring this route:
    // before: app.post('/feedback/submit', ensureAuth, feedbackHandler);
    // after:  app.post('/feedback/submit', feedbackHandler);

    return res.redirect('/feedback?sent=1');
  } catch (err) {
    console.error('Feedback submit error:', err);
    return res.status(500).send('Error submitting feedback');
  }
});

module.exports = router;