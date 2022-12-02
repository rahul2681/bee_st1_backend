const router=require("express").Router();
const Post=require("../models/Post");

//create new post
router.post("/",async (req,res)=>{
    // console.log(req.body);
    const newPost= new Post(req.body);
    try {
        const savedPost= await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});


//delete post

router.delete("/:id",async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        // console.log();
        if(post.username===req.body.username){
            try {
                await post.delete();
                res.status(200).json("Post has been deleted..");
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(401).json("You can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

//get post
router.get("/:id",async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get all post
router.get("/",async (req,res)=>{
    try {
        const posts=await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports=router;