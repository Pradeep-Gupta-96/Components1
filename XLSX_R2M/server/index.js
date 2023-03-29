import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'
import XLSX from 'xlsx'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

//multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

//connect to db
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/Demoexcel', { useNewUrlParser: true })
    .then(() => { console.log('connected to db') })
    .catch((error) => { console.log('error', error) });

//collection schema
var excelSchema = new mongoose.Schema({
    NoticeId: String,
    Date: String,
    Account: Number,
    Name: String,
    Email:String,
    Phone: Number,
    Address: String,
});

var excelModel = mongoose.model('excelData', excelSchema);


app.get('/', async (req, res) => {
    try {
       const data= await excelModel.find()
       res.status(200).json({message:data})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
});

//static folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log()
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/importUser', upload.single('file'), async (req, res) => {
    try {
        console.log(req.file)
        var workbook = XLSX.readFile(req.file.path);
        var sheet_namelist = workbook.SheetNames;
        var x = 0;
        sheet_namelist.forEach(element => {
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
            excelModel.insertMany(xlData, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
            x++;
        });
        res.send({ status: 200, success: true, msg: 'running' })
    } catch (error) {
        res.send({ status: 500, success: false, msg: error.message })
    }
});

//assign port
var port = process.env.PORT || 5000;
app.listen(port, () => console.log('server run at ' + port));



