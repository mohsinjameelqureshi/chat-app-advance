export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chatify</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f4f8;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 35px 30px; text-align: center; border-radius: 16px 16px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -40px; right: -40px; width: 100px; height: 100px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -30px; left: -30px; width: 80px; height: 80px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
      
      <div style="position: relative; z-index: 1;">
        <div style="background: white; width: 70px; height: 70px; margin: 0 auto 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="url(#gradient1)"/>
            <circle cx="8" cy="10" r="1.5" fill="url(#gradient1)"/>
            <circle cx="12" cy="10" r="1.5" fill="url(#gradient1)"/>
            <circle cx="16" cy="10" r="1.5" fill="url(#gradient1)"/>
            <defs>
              <linearGradient id="gradient1" x1="2" y1="2" x2="22" y2="22">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 style="color: white; margin: 0 0 8px 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Welcome to Chatify</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 15px; font-weight: 400;">Connect, chat, and share moments</p>
      </div>
    </div>
    
    <div style="background-color: #ffffff; padding: 45px 40px; border-radius: 0 0 16px 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
      <p style="font-size: 22px; color: #667eea; margin: 0 0 12px 0; font-weight: 600;">Hey ${name}! 👋</p>
      <p style="font-size: 16px; color: #555; margin: 0 0 30px 0; line-height: 1.7;">We're absolutely thrilled to welcome you to Chatify! You're now part of a vibrant community where conversations flow naturally and connections grow stronger every day.</p>
      
      <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); padding: 32px; border-radius: 14px; margin: 35px 0; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.08);">
        <p style="font-size: 18px; margin: 0 0 24px 0; color: #333; font-weight: 600;">✨ Let's get you started</p>
        <div style="margin-bottom: 16px;">
          <div style="display: inline-block; width: 36px; height: 36px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; text-align: center; line-height: 36px; color: white; font-size: 16px; font-weight: 700; margin-right: 14px; vertical-align: middle;">1</div>
          <span style="color: #444; font-size: 16px; vertical-align: middle;">Set up your profile with a photo</span>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="display: inline-block; width: 36px; height: 36px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; text-align: center; line-height: 36px; color: white; font-size: 16px; font-weight: 700; margin-right: 14px; vertical-align: middle;">2</div>
          <span style="color: #444; font-size: 16px; vertical-align: middle;">Find and add your friends</span>
        </div>
        <div style="margin-bottom: 16px;">
          <div style="display: inline-block; width: 36px; height: 36px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; text-align: center; line-height: 36px; color: white; font-size: 16px; font-weight: 700; margin-right: 14px; vertical-align: middle;">3</div>
          <span style="color: #444; font-size: 16px; vertical-align: middle;">Send your first message</span>
        </div>
        <div>
          <div style="display: inline-block; width: 36px; height: 36px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; text-align: center; line-height: 36px; color: white; font-size: 16px; font-weight: 700; margin-right: 14px; vertical-align: middle;">4</div>
          <span style="color: #444; font-size: 16px; vertical-align: middle;">Share photos, videos, and more</span>
        </div>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${clientURL}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 48px; border-radius: 50px; font-weight: 600; font-size: 17px; display: inline-block; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.35);">Get Started Now</a>
      </div>
      
      <div style="background: linear-gradient(135deg, #fff8f0 0%, #fff4e6 100%); padding: 22px 24px; border-radius: 12px; margin: 35px 0; border-left: 5px solid #ffa726;">
        <p style="margin: 0; font-size: 15px; color: #555; line-height: 1.6;">
          <strong style="color: #f57c00; font-size: 16px;">💡 Quick Tip:</strong><br>
          Turn on notifications to stay updated with messages and never miss an important conversation!
        </p>
      </div>
      
      <p style="margin: 30px 0 10px 0; color: #555; font-size: 16px; line-height: 1.6;">Questions? Our support team is ready to help you anytime.</p>
      <p style="margin: 0 0 30px 0; color: #555; font-size: 16px;">Let's start chatting! 💬</p>
      
      <p style="margin-top: 35px; margin-bottom: 6px; color: #333; font-size: 16px;">Best wishes,</p>
      <p style="margin: 0; color: #667eea; font-weight: 600; font-size: 16px;">The Chatify Team</p>
    </div>
    
    <div style="text-align: center; padding: 30px 20px; color: #999; font-size: 13px;">
      <p style="margin: 0 0 18px 0; font-size: 14px;">© 2025 Chatify. All rights reserved.</p>
      <p style="margin: 0;">
        <a href="#" style="color: #667eea; text-decoration: none; margin: 0 15px; font-weight: 500;">Privacy</a>
        <span style="color: #ddd;">•</span>
        <a href="#" style="color: #667eea; text-decoration: none; margin: 0 15px; font-weight: 500;">Terms</a>
        <span style="color: #ddd;">•</span>
        <a href="#" style="color: #667eea; text-decoration: none; margin: 0 15px; font-weight: 500;">Help</a>
      </p>
    </div>
  </body>
  </html>
  `;
}
