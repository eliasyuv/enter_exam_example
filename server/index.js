const express = require('express');
const {Todos} = require("./model/Todos");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const cors = require('cors');

const {baseUrl} = require('../constants');

const port = 3080;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3080'],credentials: true
  }));

const router = express.Router();

const corsOptions = {
    origin: `${baseUrl.client}`,
   //origin: 'http://localhost:3000',

    credentials: true
}






app.get("/", cors(corsOptions), (req, res) => {
    res.send("Welcome to your Wix Enter exam!");
});

app.get("/user", cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId || uuidv4();
    res.cookie("userId", userId).send({id: userId});
});



// handle the GET request to '/todos' and send a response with the Todos data in JSON format. The cors(corsOptions) function is used as middleware to enable Cross-Origin Resource Sharing (CORS) for this route, allowing the client to access the resource from a different domain or port if configured properly
app.get('/todos', cors(corsOptions), (req, res) => {
    res.send({Todos});
});

app.post('/todos', cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(403).end();
        return;
    }

    const {todo} = req.body;
    if (!todo) {
        res.status(400).json({message: 'Todo is missing'}).end();
        return;
    }

    const {title} = todo;
    if (!(title)) {
        res.status(400).json({message: 'Bad request'}).end();
        return;
    }

    const newTodo = {
        title, id: uuidv4()
    }
    Todos.push(newTodo);
    res.send({todo: newTodo}).status(200).end()
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.put("/todos :id", async (req, res) => {
    try {
        const task = await Todos.findOneAndUpdate(
            { id: req.params.id },
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});



app.delete('/todos/:id',cors(corsOptions), async (req, res) => {
    console.log('saasaaa');
    try {
      const task =await Todos.findByIdAndDelete(req.params.id);

        res.send(true);
    } catch (error) {
        res.send(error);
        console.log('saasaaa');

    }
});

module.exports = router;
