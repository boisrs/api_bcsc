const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    database:'db2',
    port:3306
})
db.connect((err)=>{
    if(err){
        console.log("can not connect mysql")
        return
    }
    console.log("connect mysql success")
})
app.delete("/book/:bid",function(req,res){
    try {
        const bid = req.params.bid
        const sql="DELETE FROM book WHERE bid=?"
        const val = [bid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"DATA DELETE"})

        })

    } catch (error) {
        console.log(err)
        return res.status(500).send()
        
    }
})
app.post("/book",async(req,res)=>{
    try {
        const sql="INSERT INTO book VALUES(?,?,?,?)"
        const {bid,bookname,bprice,bpage} = req.body
        const val=[bid,bookname,bprice,bpage]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"DATA SAVE"})

        })

        }
        catch (error) {
        console.log(err)
        return res.status(500).send()
        
    }
})
app.put("/book/:bid",function(req,res){
    try {
        const sql="UPDATE book set bookname=?,bprice=?,bpage=? where bid=?"
        const bid = req.params.bid
        const {bookname,bprice,bpage} = req.body
        const val=[bookname,bprice,bpage,bid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"DATA EDIT"})

        })

        }
        catch (error) {
        console.log(err)
        return res.status(500).send()
        
    }
})
app.get("/book/:bid",async(req,res)=>{
    try {
        
        
        const bid =req.params.bid
        const sql="select * from book where bid LIKE '%"+bid+"%' or bookname LIKE '%"+bid+"%' or bprice LIKE '%"+bid+"%' or bpage LIKE '%"+bid+"%'"
        
        db.query(sql,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
        
    } catch (error) {
        
    }
})
app.get("/book",function(req,res){
    try {
        const sql="select * from book"
        db.query(sql,function(err,result,fields){
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })

    } catch (error) {
        console.log(err)
        return res.status(500).send()
        
    }
})


app.listen(8000,()=>console.log("Server is running on port 8000"))