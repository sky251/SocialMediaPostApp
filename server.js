const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/socialmedia", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Post Schema & Model
const PostSchema = new mongoose.Schema({ content: String, createdAt: { type: Date, default: Date.now } });
const Post = mongoose.model("Post", PostSchema);

// Routes
app.get("/posts", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const newPost = new Post({ content: req.body.content });
    await newPost.save();
    res.json(newPost);
});

// DELETE Post Route
app.delete("/posts/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting post" });
    }
});

// Start Server
app.listen(8030, () => console.log("Server running on http://localhost:8030"));
