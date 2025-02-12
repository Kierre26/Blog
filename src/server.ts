import express, {Express, Request, Response} from "express";
// import fs from 'fs/promises';
import path from 'path';
import * as exphbs from 'express-handlebars';

const app: Express = express(); // Initialize an express instance
const port = 3000; // Define the port number for the server

// Set up handlebars as the template engine
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Parse incoming req data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Define post objects
interface Post {
    id: number;
    title: string;
    content: string;
    timestamp: string;
}

// Array storage for blog posts. Set timestamp for each post
let posts: Post[] = [
    { id: 1, title: 'First Post', content: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Class adipiscing non consectetur commodo conubia. Fermentum fames integer ligula fermentum habitasse litora luctus maecenas.', timestamp: new Date().toLocaleString() },
    { id: 2, title: 'Second Post', content: 'Scelerisque nisl phasellus, lectus volutpat mauris nulla. Senectus praesent eros litora netus litora parturient porta. Proin diam nascetur malesuada ridiculus dictumst commodo viverra scelerisque donec. ', timestamp: new Date().toLocaleString() }
];

// Display all blog posts
app.get("/", (req: Request, res: Response) => {
    res.render('home', { posts });
});

// Display a single post.
app.get('/post/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10); // Get post ID from url and convert to a number
    const post = posts.find((p) => p.id === id); // Find post with matching ID
    if (post) {
      res.render('post', { post });
    } else {
      res.status(404).send('Post not found'); // Set status to 404 if no post is found
    }
});

// Add a new blog post
app.post('/add', (req: Request, res: Response) => {
    const { title, content } = req.body; // Get title and content from form submission

    // If there are no posts, set ID to 1. Otherwise increment the last post ID by 1
    const id: number = posts.length ? posts[posts.length - 1].id + 1 : 1; 
    const newPost: Post = { id, title, content, timestamp: new Date().toLocaleString() }; // Create a new post object
    posts.push(newPost); // Add new post to the posts array
    res.redirect('/'); // Redirect back to home
});


//Start express server and listen for incoming requests.
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})