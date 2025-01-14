// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { SHEET_ID, CLIENT_EMAIL, PRIVATE_KEY } = process.env;
const app = express();
app.use(helmet());
app.use(compression());

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

 
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next();
})

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

 async function adddatatosheet(data){
    try{
        const serviceAccountAuth = new JWT({
            email: CLIENT_EMAIL,
            key: PRIVATE_KEY.split(String.raw`\n`).join('\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });
        const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = await doc.sheetsByIndex[0];
        return await sheet.addRow(data)
        
    } 
     catch(error){
        console.log(error)
    }
 }




app.get('/api/v1/test', (req, res) => {
    res.json({ mag: 'api is running successfully', success: true });
});

app.post('/api/v1/submit',async(req,res)=>{
    await adddatatosheet(req.body)
    res.json({msg:"Data recieved successfully", success:true});
})

app.get('/api/v1/sheetname',async(req,res)=>{
    const sheetname = await adddatatosheet();
    res.json({sheetName : sheetname, isusccess:"success"});

})

app.listen(PORT, () =>
    console.log(
        `✅  App is running on : http://${HOST}:${PORT}`
    )
);
