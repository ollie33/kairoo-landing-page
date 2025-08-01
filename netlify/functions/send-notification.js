const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // 只允許 POST 請求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, feedback, rating } = JSON.parse(event.body);

    // 驗證必要欄位
    if (!email || !feedback) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // 創建郵件傳輸器（這裡使用 Gmail 作為示例）
    // 實際使用時，你需要設置環境變數
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // 你的 Gmail 地址
        pass: process.env.EMAIL_PASS  // 你的 Gmail 應用密碼
      }
    });

    // 郵件內容
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to Kairoo Early Access!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ea580c; margin: 0;">🦘 Kairoo</h1>
            <p style="color: #666; margin: 10px 0;">Building real connections in new cities</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <h2 style="color: #ea580c; margin: 0 0 20px 0;">Welcome to the Kairoo Family! 🎉</h2>
            <p style="color: #374151; line-height: 1.6; margin: 0;">
              Thank you for joining our early access list! We're excited to have you on board as we build the future of social connections.
            </p>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">📝 Your Feedback</h3>
            <p style="color: #6b7280; margin: 0 0 10px 0;"><strong>Rating:</strong> ${'⭐'.repeat(rating)}</p>
            <p style="color: #6b7280; margin: 0;"><strong>Feedback:</strong> "${feedback}"</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0;">🚀 What's Next?</h3>
            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>We'll notify you as soon as Kairoo launches</li>
              <li>You'll get exclusive early access to new features</li>
              <li>We'll share behind-the-scenes updates</li>
              <li>You'll be the first to know about special events</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Questions? Reply to this email anytime! 💬
            </p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Made with ❤️ by the Kairoo team
            </p>
          </div>
        </div>
      `
    };

    // 發送郵件
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email sent successfully',
        email: email 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        details: error.message 
      })
    };
  }
}; 