import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

/**** Load existing data from the JSON file */
let dbData: any = { users: [], recipes: [] };
fs.readFile('recipe.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        dbData = JSON.parse(data);
    }
});

/****Handle POST requests to /login endpoint */
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Check if the provided username and password match any user in the database
    const user = dbData.users.find((user: any) => user.username === username && user.password === password);
    if (user) {
        // Send a success response if login is successful
        res.status(200).json({ message: 'Login successful', user });
    } else {
        // Send an error response if login fails
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

/**** Handle POST requests to /register endpoint */
app.post('/register', (req: Request, res: Response) => {
    console.log("Hitting app.post");

    const newUser = req.body;
    // Check if the username already exists in the database
    const existingUser = dbData.users.find((user: any) => user.username === newUser.username);
    if (existingUser) {
        // Send an error response if the username is already taken
        res.status(400).json({ message: 'Username already exists' });
    } else {
        // Add the new user to the database
        dbData.users.push(newUser);
        // Update the recipe.json file with the new user data
        fs.writeFile('recipe.json', JSON.stringify(dbData, null, 2), (err) => {
            if (err) {
                console.error(err);
                // Send an error response if there's an error writing to the file
                res.status(500).json({ message: 'Error registering user' });
            } else {
                // Send a success response if the user is registered successfully
                res.status(201).json({ message: 'User registered successfully' });
            }
        });
    }
});


/****************************************************************************************************************
 * Listening to port:
 */

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
