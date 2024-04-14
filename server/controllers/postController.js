const Post = require( "../models/postModel" );
const deleteFile = require('../utils/deleteFile');
//CREATE

//@desc     Get a Post
//@route    POST /posts
//access    Public
const createPost = async (req, res) => {
    //Validate if req.body exists

    if (!req.body){
        res.status[400].json({ error: "No request body"})
    }

    const { title, author, content } = req.body

    const path = req.file?.path ?? null;
    try{
        const post = new Post({
            title,
            author,
            content,
            cover_photo: path
        })

        const newPost = await post.save()

        if (newPost){
            res.status(201).json(newPost);
        }
    }catch (error) {
        console.log(error);
        res.status(422).json(error);
    }

}

//READ

//@desc     Get All Posts
//@route    GET /posts
//access    Public
const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find();

        res.json(posts)
    }catch (error){
        console.log(error);
    }
}

//@desc     Show specified Post
//@route    GET /posts/:id
//access    Public
const showPost = async (req, res) => {
    try{
        const { id } = req.params;

        const post = await Post.findById(id)

        if (!post){
            res.status(404).json({ error: 'Post not Found'})
        }

        res.json(post)
    }catch (error){
        console.log(error);
        res.status(404).json({ error: 'Post not Found'})
    }
}






//UPDATE

//@desc     Update a Posts
//@route    PUT|PATCH /posts/:id
//access    Public
const updatePost = async (req, res) => {
    //Validate if req.body exists

    if (!req.body){
        res.status[400].json({ error: "No request body"})
    }

    const { id } = req.params;
    const { title, author, content } = req.body

    //Optionally check if req.file exists
    const path = req.file?.path ?? null;
    try{
        //Find the Post

        const originalPost = await Post.findById(id)
        //If there is no post, return
        if(!originalPost) {
            return res.status(404).json({ error: 'Original Post Not Found'})
        }
        // ? Handle Deleting of the Previous Photo
        // Only delete the previous photo if there's a newly UPLOADED file
        if(originalPost.cover_photo && path){
            deleteFile(originalPost.cover_photo)
        }

        //Update the fields of the original Post
        originalPost.title = title;
        originalPost.author = author;
        originalPost.content = content;
        originalPost.cover_photo = path;

        //Save Post
        const updatedPost = await originalPost.save()

        //Return
        res.status(200).json(updatedPost);
    }catch (error) {
        console.log(error);
        res.status(422).json(error);
    }

}

//DELETE

//@desc     Delete a specified Post
//@route    DEL /posts/:id
//access    Public
const deletePost = async (req, res) => {
    try{
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id)

        if (!post){
            res.status(404).json({ error: 'Post not Found'})
        }
        
        if(post.cover_photo){
            deleteFile(post.cover_photo)
        }
        
        res.status(200).json({message: 'Successfully Deleted Post'})
    }catch (error){
        console.log(error);
        res.status(404).json({ error: 'Post not Found'})
    }
}



module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    showPost,
    deletePost
}