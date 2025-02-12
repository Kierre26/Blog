"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import fs from 'fs/promises';
const path_1 = __importDefault(require("path"));
const exphbs = __importStar(require("express-handlebars"));
const app = (0, express_1.default)(); // Initialize an express instance
const port = 3000; // Define the port number for the server
// Set up handlebars as the template engine
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../views'));
// Parse incoming req data
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Set up static files from public directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Array storage for blog posts. Set timestamp for each post
let posts = [
    { id: 1, title: 'First Post', content: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Class adipiscing non consectetur commodo conubia. Fermentum fames integer ligula fermentum habitasse litora luctus maecenas.', timestamp: new Date().toLocaleString() },
    { id: 2, title: 'Second Post', content: 'Scelerisque nisl phasellus, lectus volutpat mauris nulla. Senectus praesent eros litora netus litora parturient porta. Proin diam nascetur malesuada ridiculus dictumst commodo viverra scelerisque donec. ', timestamp: new Date().toLocaleString() }
];
// Display all blog posts
app.get("/", (req, res) => {
    res.render('home', { posts });
});
// Display a single post.
app.get('/post/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Get post ID from url and convert to a number
    const post = posts.find((p) => p.id === id); // Find post with matching ID
    if (post) {
        res.render('post', { post });
    }
    else {
        res.status(404).send('Post not found'); // Set status to 404 if no post is found
    }
});
// Add a new blog post
app.post('/add', (req, res) => {
    const { title, content } = req.body; // Get title and content from form submission
    // If there are no posts, set ID to 1. Otherwise increment the last post ID by 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, title, content, timestamp: new Date().toLocaleString() }; // Create a new post object
    posts.push(newPost); // Add new post to the posts array
    res.redirect('/'); // Redirect back to home
});
//Start express server and listen for incoming requests.
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
