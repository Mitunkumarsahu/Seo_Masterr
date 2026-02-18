from collections import defaultdict
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os


def load_template(template_name: str, data: dict = None) -> str:
    """Return email HTML based on template name with safe substitution."""
    data = data or {}
    templates = {
        "welcome": """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to SeoMasterr</title>
          <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{ 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0; padding: 20px; line-height: 1.6;
            }}
            .email-wrapper {{ 
              max-width: 600px; margin: 0 auto; background: #ffffff; 
              border-radius: 16px; overflow: hidden; 
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }}
            .header {{ 
              background: linear-gradient(135deg, #FF6D00 0%, #E65100 100%);
              color: #ffffff; text-align: center; padding: 40px 20px;
              position: relative; overflow: hidden;
            }}
            .header::before {{
              content: '';
              position: absolute;
              top: -50%;
              right: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: float 6s ease-in-out infinite;
            }}
            @keyframes float {{
              0%, 100% {{ transform: translateY(0px); }}
              50% {{ transform: translateY(-20px); }}
            }}
            .logo {{ 
              font-size: 32px; font-weight: 800; margin-bottom: 8px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
              position: relative; z-index: 2;
            }}
            .tagline {{ 
              font-size: 16px; opacity: 0.9; font-weight: 300;
              position: relative; z-index: 2;
            }}
            .content {{ 
              padding: 40px 30px; color: #333333; 
              background: #ffffff;
            }}
            .welcome-title {{ 
              font-size: 24px; font-weight: 700; color: #2c3e50;
              margin-bottom: 20px; text-align: center;
            }}
            .message {{ 
              font-size: 16px; margin-bottom: 20px; color: #555555;
              text-align: center; line-height: 1.8;
            }}
            .cta-section {{ 
              text-align: center; margin: 30px 0;
              padding: 20px; background: #f8f9fa; border-radius: 12px;
            }}
            .btn {{ 
              display: inline-block; padding: 16px 32px; 
              background: linear-gradient(135deg, #FF6D00 0%, #E65100 100%);
              color: #ffffff !important; text-decoration: none !important;
              border-radius: 50px; font-weight: 700; font-size: 16px;
              box-shadow: 0 8px 20px rgba(255, 109, 0, 0.3);
              transition: all 0.3s ease; text-transform: uppercase;
              letter-spacing: 1px;
            }}
            .btn:hover {{ 
              transform: translateY(-2px);
              box-shadow: 0 12px 30px rgba(255, 109, 0, 0.4);
            }}
            .features {{ 
              display: flex; justify-content: space-around; 
              margin: 30px 0; flex-wrap: wrap;
            }}
            .feature {{ 
              text-align: center; flex: 1; min-width: 150px;
              padding: 20px 10px; margin: 10px;
              background: #ffffff; border-radius: 12px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            }}
            .feature-icon {{ 
              font-size: 32px; margin-bottom: 10px; 
            }}
            .feature-title {{ 
              font-weight: 600; color: #2c3e50; margin-bottom: 8px;
            }}
            .feature-desc {{ 
              font-size: 14px; color: #666666; line-height: 1.5;
            }}
            .footer {{ 
              background: #2c3e50; color: #ffffff; text-align: center;
              padding: 30px 20px; font-size: 14px;
            }}
            .footer a {{ 
              color: #FF6D00 !important; text-decoration: none !important;
            }}
            .social-links {{ 
              margin: 20px 0;
            }}
            .social-links a {{ 
              display: inline-block; margin: 0 10px; 
              color: #ffffff !important; text-decoration: none !important;
              font-size: 18px;
            }}
            @media (max-width: 600px) {{
              .email-wrapper {{ margin: 10px; }}
              .content {{ padding: 30px 20px; }}
              .features {{ flex-direction: column; }}
              .feature {{ margin: 10px 0; }}
            }}
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="header">
              <div class="logo">🚀 SeoMasterr</div>
              <div class="tagline">Your Digital Growth Partner</div>
            </div>
            
            <div class="content">
              <h1 class="welcome-title">Welcome Aboard, {name}! 🎉</h1>
              
              <p class="message">
                Thank you for joining the SeoMasterr family! We're thrilled to have you on board 
                and can't wait to help you achieve your digital marketing goals.
              </p>
              
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">📈</div>
                  <div class="feature-title">SEO Services</div>
                  <div class="feature-desc">Boost your search rankings</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">📝</div>
                  <div class="feature-title">Expert Blogs</div>
                  <div class="feature-desc">Latest industry insights</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">🎯</div>
                  <div class="feature-title">PPC Campaigns</div>
                  <div class="feature-desc">Targeted advertising</div>
                </div>
              </div>
              
              <div class="cta-section">
                <p style="margin-bottom: 20px; font-weight: 600; color: #2c3e50;">
                  Ready to transform your digital presence?
                </p>
                <a href="https://seomasterr.com" class="btn">Explore Our Services</a>
              </div>
              
              <p class="message">
                Stay tuned for exclusive tips, industry updates, and special offers 
                delivered straight to your inbox!
              </p>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="https://facebook.com/seomasterr">📘 Facebook</a>
                <a href="https://twitter.com/seomasterr">🐦 Twitter</a>
                <a href="https://linkedin.com/company/seomasterr">💼 LinkedIn</a>
              </div>
              <p>© 2024 SeoMasterr. All rights reserved.</p>
              <p>
                <a href="https://seomasterr.com">Visit Website</a> | 
                <a href="https://seomasterr.com/contact-us">Contact Us</a>
              </p>
            </div>
          </div>
        </body>
        </html>
        """,

        "subscribed": """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Subscription Confirmed - SeoMasterr</title>
          <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{ 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0; padding: 20px; line-height: 1.6;
            }}
            .email-wrapper {{ 
              max-width: 600px; margin: 0 auto; background: #ffffff; 
              border-radius: 16px; overflow: hidden; 
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }}
            .header {{ 
              background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
              color: #ffffff; text-align: center; padding: 40px 20px;
              position: relative; overflow: hidden;
            }}
            .header::before {{
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: pulse 4s ease-in-out infinite;
            }}
            @keyframes pulse {{
              0%, 100% {{ transform: scale(1); opacity: 0.5; }}
              50% {{ transform: scale(1.1); opacity: 0.8; }}
            }}
            .success-icon {{ 
              font-size: 64px; margin-bottom: 16px;
              position: relative; z-index: 2;
              animation: bounce 2s ease-in-out infinite;
            }}
            @keyframes bounce {{
              0%, 20%, 50%, 80%, 100% {{ transform: translateY(0); }}
              40% {{ transform: translateY(-10px); }}
              60% {{ transform: translateY(-5px); }}
            }}
            .header-title {{ 
              font-size: 28px; font-weight: 800; margin-bottom: 8px;
              position: relative; z-index: 2;
            }}
            .header-subtitle {{ 
              font-size: 16px; opacity: 0.9; font-weight: 300;
              position: relative; z-index: 2;
            }}
            .content {{ 
              padding: 40px 30px; color: #333333; 
              background: #ffffff; text-align: center;
            }}
            .main-message {{ 
              font-size: 18px; margin-bottom: 25px; color: #2c3e50;
              font-weight: 600; line-height: 1.6;
            }}
            .sub-message {{ 
              font-size: 16px; margin-bottom: 30px; color: #555555;
              line-height: 1.8;
            }}
            .benefits {{ 
              background: #f8f9fa; border-radius: 12px; 
              padding: 30px 20px; margin: 30px 0;
            }}
            .benefits-title {{ 
              font-size: 20px; font-weight: 700; color: #2c3e50;
              margin-bottom: 20px;
            }}
            .benefit-list {{ 
              list-style: none; padding: 0;
            }}
            .benefit-item {{ 
              display: flex; align-items: center; justify-content: center;
              margin: 15px 0; font-size: 16px; color: #555555;
            }}
            .benefit-icon {{ 
              margin-right: 12px; font-size: 20px;
            }}
            .cta-section {{ 
              margin: 40px 0; padding: 30px 20px;
              background: linear-gradient(135deg, #FF6D00 0%, #E65100 100%);
              border-radius: 12px; color: #ffffff;
            }}
            .cta-title {{ 
              font-size: 22px; font-weight: 700; margin-bottom: 15px;
            }}
            .cta-description {{ 
              font-size: 16px; margin-bottom: 25px; opacity: 0.9;
            }}
            .btn {{ 
              display: inline-block; padding: 16px 32px; 
              background: #ffffff; color: #FF6D00 !important; 
              text-decoration: none !important; border-radius: 50px; 
              font-weight: 700; font-size: 16px;
              box-shadow: 0 8px 20px rgba(0,0,0,0.2);
              transition: all 0.3s ease; text-transform: uppercase;
              letter-spacing: 1px;
            }}
            .btn:hover {{ 
              transform: translateY(-2px);
              box-shadow: 0 12px 30px rgba(0,0,0,0.3);
              background: #f8f9fa;
            }}
            .footer {{ 
              background: #2c3e50; color: #ffffff; text-align: center;
              padding: 30px 20px; font-size: 14px;
            }}
            .footer a {{ 
              color: #4CAF50 !important; text-decoration: none !important;
            }}
            .social-links {{ 
              margin: 20px 0;
            }}
            .social-links a {{ 
              display: inline-block; margin: 0 10px; 
              color: #ffffff !important; text-decoration: none !important;
              font-size: 18px;
            }}
            @media (max-width: 600px) {{
              .email-wrapper {{ margin: 10px; }}
              .content {{ padding: 30px 20px; }}
              .success-icon {{ font-size: 48px; }}
              .header-title {{ font-size: 24px; }}
            }}
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="header">
              <div class="success-icon">🎉</div>
              <div class="header-title">Subscription Confirmed!</div>
              <div class="header-subtitle">Welcome to the SeoMasterr Community</div>
            </div>
            
            <div class="content">
              <p class="main-message">
                Hi {email}! 👋
              </p>
              
              <p class="sub-message">
                Fantastic! You're now part of our exclusive community. Get ready to receive 
                cutting-edge digital marketing insights, expert tips, and exclusive offers 
                directly in your inbox.
              </p>
              
              <div class="benefits">
                <h3 class="benefits-title">What You'll Get:</h3>
                <ul class="benefit-list">
                  <li class="benefit-item">
                    <span class="benefit-icon">📧</span>
                    Weekly newsletter with industry insights
                  </li>
                  <li class="benefit-item">
                    <span class="benefit-icon">🎯</span>
                    Exclusive SEO and marketing tips
                  </li>
                  <li class="benefit-item">
                    <span class="benefit-icon">🚀</span>
                    Early access to new services
                  </li>
                  <li class="benefit-item">
                    <span class="benefit-icon">💰</span>
                    Special discounts and offers
                  </li>
                </ul>
              </div>
              
              <div class="cta-section">
                <h3 class="cta-title">Ready to Explore?</h3>
                <p class="cta-description">
                  Don't wait! Start exploring our latest content and services right now.
                </p>
                <a href="{url}" class="btn">{btn_text}</a>
              </div>
              
              <p class="sub-message">
                Thank you for trusting us with your digital growth journey. 
                We're excited to help you succeed! 🌟
              </p>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="https://facebook.com/seomasterr">📘 Facebook</a>
                <a href="https://twitter.com/seomasterr">🐦 Twitter</a>
                <a href="https://linkedin.com/company/seomasterr">💼 LinkedIn</a>
              </div>
              <p>© 2024 SeoMasterr. All rights reserved.</p>
              <p>
                <a href="https://seomasterr.com">Visit Website</a> | 
                <a href="https://seomasterr.com/contact-us">Contact Us</a> | 
                <a href="#unsubscribe">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
        """
    }

    # For subscribed email → decide button text and link
    if template_name == "subscribed":
        type_ = data.get("type")  # default blogs
        data["btn_text"] = "Explore"
        data["url"] = "https://seomasterr.com"
        if type_ == "services":
            data["btn_text"] = "Explore Services"
            data["url"] = data.get("url", "https://seomasterr.com/services")
        elif type_ == "blogs":
            data["btn_text"] = "Explore Blogs"
            data["url"] = data.get("url", "https://seomasterr.com/blogs")
        print(f"Subscription email data: {data}")

    template = templates.get(template_name, "")
    return template.format_map(defaultdict(str, data))


def send_email(
    recipient: str,
    subject: str,
    email_temp: str,
    data: dict = None
) -> bool:
    """Send email using SMTP server with HTML template only"""

    smtp_server = os.getenv("SMTP_SERVER", "smtp.hostinger.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "ramakanta@seomasterr.com")
    smtp_password = os.getenv("SMTP_PASSWORD", "Ram@1999AS")
    print(f"smtp_server: {smtp_server}, smtp_port: {smtp_port}, smtp_user: {smtp_user}")
    print(f"🔗 Sending email to {recipient} with subject '{subject}' using template '{email_temp}'")

    # Load template with data
    body = load_template(email_temp, data)
    print(f"2.smtp_server: {smtp_server}, smtp_port: {smtp_port}, smtp_user: {smtp_user}")
    print(f"🔗 2.Sending email to {recipient} with subject '{subject}' using template '{email_temp}'")

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            print(f"3.smtp_server: {smtp_server}, smtp_port: {smtp_port}, smtp_user: {smtp_user}")
            print(f"🔗 3.Sending email to {recipient} with subject '{subject}' using template '{email_temp}'")
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, recipient, msg.as_string())
        print(f"✅ Email sent to {recipient} with subject '{subject}'")
        return True
    except Exception as e:
        print(f"❌ Failed to send to {recipient}: {e}")
        print(f"4.smtp_server: {smtp_server}, smtp_port: {smtp_port}, smtp_user: {smtp_user}")
        print(f"🔗 4.Sending email to {recipient} with subject '{subject}' using template '{email_temp}'")
        return False