// ฟังก์ชันที่ใช้ส่งข้อมูลการสมัครสมาชิกไปที่ backend
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // หยุดการโหลดหน้าใหม่เมื่อฟอร์มถูกส่ง
  
    // ดึงค่าจากฟอร์ม
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // เช็คว่าผู้ใช้กรอกข้อมูลครบหรือไม่
    if (!username || !password) {
      document.getElementById('message').textContent = 'Please fill in both fields.';
      return;
    }
  
    // ส่งข้อมูลไปที่ backend เพื่อสมัครสมาชิก
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ username, password }), //ส่งข้อมูลเป็นไฟล์ JSON
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
  
      document.getElementById('message').textContent = result.message || 'Registration successful!';
      window.location.href = '/index.html';
      // ถ้าสมัครสมาชิกสำเร็จ สามารถทำการเปลี่ยนเส้นทางไปยังหน้า login หรือหน้าอื่น ๆ
      // window.location.href = '/login.html';  // ตัวอย่างการเปลี่ยนหน้า
  
    } catch (error) {
      document.getElementById('message').textContent = error.message || 'Something went wrong!';
    }
  });
  