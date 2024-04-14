const express = require('express');
const upload = require('../middleware/uploadMiddleware')
const router = express.Router();

const {
    getAllPosts,
    createPost,
    updatePost,
    showPost,
    deletePost
} = require('../controllers/postController')

//All routes here will have /posts
router.get('/', getAllPosts);
router.get('/:id', showPost) 
router.post('/', upload.single('cover_photo'), createPost);
router.put('/:id', upload.single('cover_photo'), updatePost);
router.delete('/:id', deletePost);

module.exports = router;