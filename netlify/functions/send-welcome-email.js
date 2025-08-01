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
    const { email } = JSON.parse(event.body);

    // 驗證必要欄位
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email field' })
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

    // 歡迎郵件內容
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to Kairoo - Your Journey Begins!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ea580c; margin: 0; font-size: 32px;">🦘 Kairoo</h1>
            <p style="color: #666; margin: 10px 0; font-size: 16px;">Building real connections in new cities</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <h2 style="color: #ea580c; margin: 0 0 20px 0; font-size: 24px;">Welcome to the Kairoo Family! 🎉</h2>
            <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 16px;">
              Thank you for joining our early access list! We're thrilled to have you on board as we build the future of social connections. Your journey with Kairoo starts now!
            </p>
          </div>

          <div style="background: #f0f9ff; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">🚀 What's Next?</h3>
            <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px; font-size: 16px;">
              <li><strong>Exclusive Access:</strong> You'll be among the first to experience Kairoo when we launch</li>
              <li><strong>Behind-the-Scenes:</strong> Get sneak peeks at new features and updates</li>
              <li><strong>Community First:</strong> Join our exclusive community of early adopters</li>
              <li><strong>Special Events:</strong> Be the first to know about launch events and meetups</li>
            </ul>
          </div>

          <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 20px;">💫 What Makes Kairoo Special?</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; margin-bottom: 8px;">🤝</div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;"><strong>Interest-Based Matching</strong></p>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; margin-bottom: 8px;">🗺️</div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;"><strong>Discover Amazing Places</strong></p>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; margin-bottom: 8px;">🛡️</div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;"><strong>Safe & Authentic</strong></p>
              </div>
              <div style="text-align: center; padding: 15px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;"><strong>Simple & Fast</strong></p>
              </div>
            </div>
          </div>

          <div style="background: #fef3c7; padding: 25px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
            <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 20px;">🎯 Ready to Start Connecting?</h3>
            <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 16px;">
              We're working hard to bring Kairoo to life. While you wait, why not help us make it even better?
            </p>
            <p style="color: #ea580c; font-weight: bold; margin: 10px 0 0 0; font-size: 16px;">
              Your feedback shapes our future! 💝
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Questions? Ideas? Just reply to this email anytime! 💬
            </p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Made with ❤️ by the Kairoo team
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
              Building real connections, one city at a time
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
        message: 'Welcome email sent successfully',
        email: email 
      })
    };

  } catch (error) {
    console.error('Error sending welcome email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send welcome email',
        details: error.message 
      })
    };
  }
}; 