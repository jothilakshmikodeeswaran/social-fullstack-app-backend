import express from "express";
import ImageUser from "../models/ImageUser.js";
import { authMiddleware } from "../utils/auth.js";
import multer from 'multer';

const router = new express.Router();
router.use(authMiddleware);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file || !name) {
      return res.status(400).json({ error: 'Name and image are required' });
    }

    const imageUser = new ImageUser({
      name,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await imageUser.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error during upload' });
  }
});

router.get('/image/:name', async (req, res) => {
  try {
    const user = await ImageUser.findOne({ name: req.params.name });
    if (!user) return res.status(404).send('User not found');

    res.set('Content-Type', user.image.contentType);
    res.send(user.image.data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Server error while fetching image');
  }
});



export default router;