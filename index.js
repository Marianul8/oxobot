const express = require('express')
require("dotenv").config({path: "./.env"})
const app = express()
const port = 3000
const {getGptMessage}=require("./openAI-integration")
const {getFirstThreeExchangeRate,getExchangeRateByCurrency}=require("./exchange-integration")
const { default: axios } = require('axios')
app.use(express.json());

app.get('/gpt', (req, res) => {
    getGptMessage()
  res.send('Gpt')
})

app.get('/exchange' , async (req, res) => {
   const exchange= await getFirstThreeExchangeRate()
  res.send(exchange)
})

app.post('/exchange' , async(req,res) =>{
  const { currency } = req.body;
  res.send(await getExchangeRateByCurrency(currency));

})

app.get('/Test', async (req, res) => { 
await axios.get("https://openlibrary.org/works/OL45804W.json")
res.send('test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

