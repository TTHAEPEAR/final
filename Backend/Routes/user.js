const express = require("express");
const router = express.Router();
const Product = require("../Models/user");




router.get('/', async(req,res) => //แสดงทุกชิ้น
{
    try{
        const product = await Product.find({}).exec();
        res.send(product);
    }catch(err){
        console.log(err);
        res.status(500).send("server Error!");
    }
})


router.get("/:id", async(req,res)=> // แสดงเฉพาะที่ค้นหาจาก id หรือ name ตามตั้งค่า
    {
        try{
            const id = req.params.id
            const product = await Product.findOne({name:id}).exec(); //ถ้าเป็น update ก็ findoneanddelete ถ้า delete ก็ findoneanddelete
            res.send(product);
        }catch(err){
            console.log(err);
            res.status(500).send("server Error!");
        }
})




// เส้นทางสำหรับการสมัครสมาชิก
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    // ตรวจสอบว่า username หรือ password ว่าง
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
     // ตรวจสอบว่าผู้ใช้มีชื่อเดียวกันแล้วหรือไม่
    const existingUser = await Product.findOne({username:username});
     //= Product.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    } 
  
    // บันทึกข้อมูลผู้ใช้ใหม่
     Product({username,password}).save();
    
  
    // ส่งข้อความยืนยันการสมัคร
    res.status(201).json({ message: 'Registration successful' });
  });
router.put('/', async(req,res) => 
    {
        res.send("Test Put")
    })

module.exports  = router;