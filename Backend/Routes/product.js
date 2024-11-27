const express = require("express");
const router = express.Router();
const Product = require("../Models/product")
const path = require("path");
const multer = require("multer");




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

//เริ่มพารทอัพของ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // โฟลเดอร์ที่เก็บรูปภาพ
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
    },
});
  
const upload = multer({ storage });

router.post ('/',upload.single("item-image"), async (req,res) => 
    {
       // if (!req.file) {
           // return res.status(400).json({ message: 'No file uploaded' });
         // }
        
        try{ 
            const { name, detail, startingBid, endTime } = req.body;
            //const image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

            if (!name || !detail || !startingBid || !endTime /*|| !image*/) {
                return res.status(400).json({ message: 'All fields are required.' });
            }
            const newItem = new Product({ name,detail:req.body.detail ,startingBid: startingBid,currentBid:startingBid,endTime,/*image:image, เก็บ URL ของรูปภาพ */bidderId: null,});
            await newItem.save();
            res.status(201).json({ message: 'Auction item added successfully.' });
        } catch (error) {
            console.error('Error adding new item:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
        });

        // เสิร์ฟไฟล์ในโฟลเดอร์ uploads
        //router.use('/api', express.static(path.join(__dirname, 'uploads')));
        //ข้างล่างโค้ดที่อัพได้แต่ไม่มีรุป
        /* res.send("Test post")
        const product = await Product(req.body).save();
        }catch(err){
            console.log(err);
            res.status(500).send("server Error!");
        } */
        


router.put('/:id', async(req,res) => 
    {
        const { id } = req.params;
        const { bidAmount,nameBidder } = req.body;
        try {
            const auctionItem = await Product.findById(id);
        
            if (!auctionItem) {
              return res.status(404).json({ message: 'Auction item not found' });
            }
        
            if (bidAmount <= auctionItem.currentBid) {
              return res.status(400).json({ message: 'Bid amount must be higher than the current bid.' });
            }
        
            auctionItem.currentBid = bidAmount;
            auctionItem.bidderId = nameBidder; // เพิ่มข้อมูลผู้ Bid (เช่น ID ของผู้ใช้)
            await auctionItem.save();
        
            res.status(200).json({ message: 'Bid placed successfully.' });
          } catch (error) {
            console.error('Error handling bid:', error);
            res.status(500).json({ message: 'Internal server error.' });
          }
    });
module.exports  = router;