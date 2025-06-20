import express from 'express';
import auth from '../middleware/auth';
import { Configuration, OpenAIApi } from 'openai';
import Idea from '../models/Idea';
import User from '../models/User';

const router = express.Router();

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// @route   POST api/ideas/generate
// @desc    Generate content ideas
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    const { topic, contentType, audience, count = 5 } = req.body;

    if (!topic || !contentType) {
      return res.status(400).json({ msg: 'Topic and content type are required' });
    }

    // Create prompt for OpenAI
    let prompt = `Generate ${count} creative and engaging ${contentType} content ideas about ${topic}`;
    
    if (audience) {
      prompt += ` targeted for ${audience}`;
    }
    
    prompt += `. For each idea, provide a catchy title and a brief description. Also suggest relevant keywords for each idea. Format as JSON with fields: title, description, and keywords array.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    // Process and format the response
    const result = response.data.choices[0].text.trim();
    let ideas;

    try {
      ideas = JSON.parse(result);
    } catch (error) {
      // If not valid JSON, try to extract structured data
      const ideaPattern = /"title":\s*"([^"]+)",\s*"description":\s*"([^"]+)",\s*"keywords":\s*\[([^\]]+)\]/g;
      const matches = [...result.matchAll(ideaPattern)];
      
      ideas = matches.map(match => ({
        title: match[1],
        description: match[2],
        keywords: match[3].split(',').map(k => k.trim().replace(/"/g, '')),
      }));
    }

    res.json({ ideas });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/ideas
// @desc    Get all ideas for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/ideas
// @desc    Save an idea
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, contentType, keywords } = req.body;

    const newIdea = new Idea({
      title,
      description,
      contentType,
      keywords,
      user: req.user.id,
    });

    const idea = await newIdea.save();

    // Add idea to user's saved ideas
    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedIdeas: idea._id },
    });

    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/ideas/:id
// @desc    Delete an idea
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }

    // Check user
    if (idea.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await idea.remove();

    // Remove idea from user's saved ideas
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedIdeas: req.params.id },
    });

    res.json({ msg: 'Idea removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
