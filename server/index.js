import express from "express"
import cors from 'cors'
import pg from 'pg'
import 'dotenv/config'

//DATABASE CONNECT

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT
});
db.connect();

const app = express();
const port = process.env.PORT;

//MiddleWare

app.use(cors())
app.use(express.json())


//Folders API call for Nottie

app.get("/api/v1/folders", async (req, res)=>{
    try {
        const result = await db.query("SELECT * FROM folders")
        res.status(200).json({
            status: "Success",
            results: result.rows.length,
            data: {
                folders: result.rows
            }
        })
    } catch (err) {
        console.log(err);
    }
})

//GET specific folders

app.get("/api/v1/folders/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const result = await db.query("select folder_name from folders where id = $1", [id])
        res.status(200).json({
            status: "Success",
            data: {
                folder: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//POST folders

app.post("/api/v1/folders", async (req, res)=>{
    const folderName = req.body.folder_name
    const colorCode = req.body.color_code
    console.log(req.body)
    try {
        const result = 
        await db.query("INSERT INTO folders (folder_name, color_code) VALUES ($1, $2) RETURNING *", [folderName, colorCode])
        res.status(200).json({
            status: "Success",
            data: {
                folder: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//Update folders

app.put("/api/v1/folders/:id", async (req, res)=>{
    const id = req.params.id
    const folderName = req.body.folder_name
    const colorCode = req.body.color_code
    console.log(req.params.id)
    console.log(req.body);
    try {
        const result = 
        await db.query("UPDATE folders SET folder_name = $1 where id = $2 RETURNING *",
            [folderName, id])
        res.status(200).json({
            status: "Success",
            data: {
                folder: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//Delete folders

app.delete("/api/v1/folders/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await db.query ("DELETE FROM folders where id = $1", [id])
        res.status(204).json({
            status: "Success"
        })
    } catch (err) {
        console.log(err)
    }
})



//Notes API call for Nottie

//GET all notes
app.get("/api/v1/notes", async (req, res)=>{
    try {
        const result = await db.query("SELECT * FROM notes")
        res.status(200).json({
            status: "Success",
            results: result.rows.length,
            data: {
                notes: result.rows
            }
        })
    } catch (err) {
        console.log(err);
    }
})

//GET a specific note
app.get("/api/v1/notes/:id", async (req, res)=>{
    const id = req.params.id
    console.log(req.params)
    try {
        const result = 
        await db.query("select note_name, note_content, folder_chosen from notes where id = $1", [id])
        res.status(200).json({
            status: "Success",
            data: {
                notes: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//POST a note
app.post("/api/v1/notes", async (req, res)=>{
    const noteName = req.body.note_name
    const noteContent = req.body.note_content
    const folderChosen = req.body.folder_chosen
    const colorCode = req.body.color_code
    try {
        const result = 
        await db.query("INSERT INTO notes (note_name, note_content, color_code, folder_chosen) VALUES ($1, $2, $3, $4) RETURNING *", 
            [noteName, noteContent, colorCode, folderChosen])
        res.status(200).json({
            status: "Success",
            data: {
                notes: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//Update note
app.patch("/api/v1/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { note_name, note_content } = req.body;

    let updateFields = [];
    let queryParams = [];
    let queryCounter = 1;

    if (note_name) {
        updateFields.push(`note_name = $${queryCounter}`);
        queryParams.push(note_name);
        queryCounter++;
    }
    if (note_content) {
        updateFields.push(`note_content = $${queryCounter}`);
        queryParams.push(note_content);
        queryCounter++;
    }

    // If no fields to update, return a 400 Bad Request
    if (updateFields.length === 0) {
        return res.status(400).json({
            status: "Fail",
            message: "No fields to update"
        });
    }

    queryParams.push(id); // Add the id as the last parameter
    const updateQuery = `UPDATE notes SET ${updateFields.join(', ')} WHERE id = $${queryCounter} RETURNING *`;

    try {
        const result = await db.query(updateQuery, queryParams);
        res.status(200).json({
            status: "Success",
            data: {
                notes: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Error",
            message: "Database query failed"
        });
    }
});


//Delete note
app.delete("/api/v1/notes/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await db.query ("DELETE FROM notes where id = $1", [id])
        res.status(204).json({
            status: "Success",
            message: "You have successfully deleted this note"
        })
    } catch (err) {
        console.log(err);
    }
})

//API CALL ENDS



//PORT AREA

app.listen(port, (req, res)=>{
    console.log(`Server is listening on port ${port}`)
})