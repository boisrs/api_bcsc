const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const e = require('express')
const app = express()
app.use(express.json())
app.use(cors())
const db = mysql.createConnection({
    // host:"192.168.67.207",
    // user:'admin',
    // password: '123456',
    host:"localhost",
    user  : 'root',
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

//get
app.get("/book/:bid",async(req,res)=>{
    try {
        
        
        const bid =req.params.bid
        const sql="select * from book where bid LIKE '%"+bid+"%'or bookname LIKE '%"+bid+"%' or bprice LIKE '"+bid+"' or bpage LIKE '"+bid+"'"
        
        db.query(sql,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
        // db.query(sql,function(err,result,fields){
        //     if(err){
        //         console.log(err)
        //         return res.status(400).send()
        //     }
        //     return res.status(200).json(result)
        // })
    } catch (error) {
        
    }
})
app.get("/category/:catid",async(req,res)=>{
    try {
        
        
        const catid =req.params.catid
        const sql="select * from category where catid LIKE '%"+catid+"%'or catname LIKE '%"+catid+"'"

        
        db.query(sql,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
        // db.query(sql,function(err,result,fields){
        //     if(err){
        //         console.log(err)
        //         return res.status(400).send()
        //     }
        //     return res.status(200).json(result)
        // })
    } catch (error) {
        
    }
})
app.get("/tbunit/:uid",async(req,res)=>{
    try {  
        const uid =req.params.uid    
        const sql="select * from tbunit where uid LIKE '%"+uid+"%'or uname LIKE '%"+uid+"'"
        db.query(sql,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
        // db.query(sql,function(err,result,fields){
        //     if(err){
        //         console.log(err)
        //         return res.status(400).send()
        //     }
        //     return res.status(200).json(result)
        // })
    } catch (error) {
        
    }
})
app.get("/category", function(req,res){
    try {
        const sql="select * from category"
        db.query(sql,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send(result)
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send()
        
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
app.get("/tbunit",function(req,res){
    try {
        const sql="select * from tbunit"
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
///get/////////////////////

///put////////////////////
app.put("/book/:bid",function(req,res){
    try {
        const sql="UPDATE book SET bookname=?, bprice=?, bpage=?, catid=? WHERE bid=?";
        const bid = req.params.bid
        const {bookname,bprice,bpage,catid} = req.body
        const val = [bookname,bprice,bpage,catid,bid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"update data success"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
app.put("/category/:catid",function(req,res){
    try {
        const sql="UPDATE category SET catname=? WHERE catid=?";
        const catid = req.params.catid
        const {catname} = req.body
        const val = [catname,catid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"update data success"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
app.put("/tbunit/:uid",function(req,res){
    try {
        const sql="UPDATE tbunit SET uname=? WHERE uid=?";
        const uid = req.params.uid
        const {uname} = req.body
        const val = [uname,uid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"update data success"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
////////////put/////////

/////delect////////////
app.delete("/category/:catid",function(req,res){
    try {
        const catid = req.params.catid
        const sql = "delete from category where catid=?"
        const val = [catid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"delete success"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
app.delete("/book/:bid",function(req,res){
    try {
        const bid = req.params.bid
        const sql = "delete from book where bid=?"
        const val = [bid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"delete success"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
app.delete("/tbunit/:uid",function(req,res){
    try {
        const uid = req.params.uid
        const sql = "delete from tbunit where uid=?"
        const val = [uid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"delete success"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})

///////post//////
app.post("/book",async(req,res)=>{
    try {
        const sql="insert into book values(?,?,?,?,?)"
        const {bid,bookname,bprice,bpage,catid} = req.body
        const val = [bid,bookname,bprice,bpage,catid]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"already save data"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
app.post("/category",async(req,res)=>{
    try {
        const sql="insert into category values(?,?)"
        const {catid,catname} = req.body
        const val = [catid,catname]
        db.query(sql,val,async(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send()
            }
            return res.status(200).send({msg:"already save data"})
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
})
app.post("/tbunit", async (req, res) => {
    try {
        const { uid, uname } = req.body;
        const checkSql = "SELECT * FROM tbunit WHERE uname = ?";
        db.query(checkSql, [uname], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (result.length > 0) {
                return res.status(400).send({ msg: "ມີຂໍ້ມູນຫົວຫນ່ວຍນີ້ແລ້ວ" });
            }
            const insertSql = "INSERT INTO tbunit (uid, uname) VALUES (?, ?)";
            db.query(insertSql, [uid, uname], async (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).send({ msg: "ບັນທຶກຂໍ້ມູນແລ້ວ" });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});




app.listen(8000,()=>console.log("Server is running on port 8000"))