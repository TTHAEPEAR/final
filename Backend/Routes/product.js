const express = require("express");
const router = express.Router();
const Product = require("../Models/product")





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
const {upload} = require("../Middleware/upload");
router.post('/', upload, async (req, res) => {
  try {
    const { name, detail, startingBid, endTime } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // บันทึกข้อมูลในฐานข้อมูล
    const newItem = new Product({
      name,
      detail,
      startingBid,
      currentBid: startingBid,
      endTime,
      imageUrl // เก็บ URL ของรูปในฐานข้อมูล
    });

    await newItem.save();

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add item', error });
  }
});
        


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
    const deleteExpiredItems = async () => {
      try {
        const currentTime = new Date();
    
        // ค้นหาสินค้าที่เวลาประมูลหมดแล้ว (endTime <= currentTime)
        const expiredItems = await Product.find({ endTime: { $lte: currentTime } });
    
        if (expiredItems.length > 0) {
          // ลบสินค้าที่เวลาประมูลหมดแล้ว
          await Product.deleteMany({ endTime: { $lte: currentTime } });
          console.log(`Deleted ${expiredItems.length} expired items.`);
        }
      } catch (error) {
        console.error('Error deleting expired items:', error);
      }
    };
    
    router.delete('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        
        // ลบสินค้าโดยใช้ ID
        const deletedItem = await Product.findByIdAndDelete(id);
    
        if (!deletedItem) {
          return res.status(404).json({ message: 'Auction item not found' });
        }
    
        res.status(200).json({ message: 'Item deleted successfully' });
      } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Failed to delete item', error });
      }
    });
module.exports  = router;