//import { BACKEND_URL } from "./config"; 

// ฟังก์ชันที่ใช้ดึงข้อมูลจาก backend
async function fetchUserData() {
    try {
      // ดึงข้อมูลจาก backend
      const response = await fetch('http://localhost:5000/api'); // ปรับ URL ตาม API ของคุณ
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // แปลงข้อมูลที่ได้จาก API เป็น JSON
      const data = await response.json();
      
      // เรียกฟังก์ชันแสดงข้อมูลในหน้าเว็บ
      displayUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
    // ฟังก์ชันที่ใช้แสดงข้อมูลในหน้าเว็บ
  function displayUserData(users) {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
    // แสดงข้อมูลผู้ใช้ในแต่ละกล่อง
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user-item');
        userElement.innerHTML = `
          <img src="${user.image}" alt="${user.name}" style="width: 100%; height: auto; border-radius: 5px;"/>
          <h3>Name : ${user.name}</h3>
          <p>Detail : ${user.detail}</p>
          <p>Current Min Bid: ${user.currentBid}</p>
          <p>Time Remaining: <span class="countdown" data-end-time="${user.endTime}"></span></p>
          <p>Highest Bidder: ${user.bidderId}</p>
          <button class="bid-button" data-id="${user._id}">Bid</button>
        `;
        container.appendChild(userElement);
      });
      startCountdown();
      
      //setting ปุ่มบิด
      const bidButtons = document.querySelectorAll('.bid-button');
      bidButtons.forEach(button => {
        button.addEventListener('click', event => {
          const itemId = event.target.getAttribute('data-id');
          handleBid(itemId);
        });
      });
    }
    // เมื่อหน้าเว็บโหลดเสร็จเรียกฟังก์ชันดึงข้อมูล
    document.addEventListener('DOMContentLoaded', fetchUserData);

    async function handleBid(itemId) {
      const bidAmount = prompt("Enter your bid amount:");
      const nameBidder = prompt("Enter your name for this auction : ")
    
      if (!bidAmount || isNaN(bidAmount)) {
        alert("Please enter a valid number for the bid.");
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bidAmount,nameBidder}),
        });
    
        if (response.ok) {
          alert('Bid placed successfully!');
          fetchUserData(); // รีเฟรชข้อมูลหลังจาก Bid สำเร็จ
        } else {
          const error = await response.json();
          alert(`Failed to place bid: ${error.message}`);
        }
      } catch (error) {
        console.error('Error placing bid:', error);
        alert('An error occurred while placing your bid.');
      }
    }



function startCountdown() {
  const countdownElements = document.querySelectorAll('.countdown');

  // อัปเดตทุกวินาที
  setInterval(() => {
    countdownElements.forEach(element => {
      const endTime = new Date(element.getAttribute('data-end-time')).getTime();
      const now = new Date().getTime();
      const timeLeft = endTime - now;

      if (timeLeft > 0) {
        // คำนวณเวลาในรูปแบบ วัน ชั่วโมง นาที วินาที
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        // หากเวลาหมด
        element.textContent = "Auction ended";
      }
    });
  }, 1000); // อัปเดตทุก 1 วินาที
}


//อัพของไปขาย

document.getElementById('add-item-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // ป้องกันการรีเฟรชหน้า

  const name = document.getElementById('name').value;
  const detail = document.getElementById('detail').value;
  const startingBid = document.getElementById('startingBid').value;
  const endTime = document.getElementById('endTime').value;
  const image = document.getElementById('image').files[0]; // ดึงไฟล์รูปภาพ

  const formData = new FormData();
  formData.append('name', name);
  formData.append('detail', detail);
  formData.append('startingBid', startingBid);
  formData.append('endTime', endTime);
  formData.append('image', image);
  
  try {
    const response = await fetch('http://localhost:5000/api', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload item');
    }

    const data = await response.json();
    console.log('Item added successfully:', data);

    // อัปเดต UI หรือแจ้งเตือนความสำเร็จ
    alert('Item added successfully!');
    e.target.reset();
  } catch (error) {
    console.error('Error uploading item:', error);
    alert(`Error: ${error.message}`);
  }
});
