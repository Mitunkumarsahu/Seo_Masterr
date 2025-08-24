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
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body {{ font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }}
            .container {{ max-width: 600px; margin: auto; background: #fff; border-radius: 8px; 
                         overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }}
            .header {{ background: #222; color: #fff; text-align: center; padding: 20px; }}
            .header h1 {{ color: #ff6600; margin: 0; }}
            .content {{ padding: 20px; color: #333; }}
            .btn {{ display: inline-block; padding: 12px 20px; background: #ff6600; color: #fff; 
                   text-decoration: none; border-radius: 6px; margin-top: 15px; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to SeoMasterr 🚀</h1>
            </div>
            <div class="content">
              <p>Hi {name},</p>
              <p>Thank you for signing up and logging into our platform! 🎉</p>
              <p>Stay tuned with our latest blogs and services by subscribing and exploring 
                 new features on our platform.</p>
              <a href="https://seomasterr.com" class="btn">Explore</a>
            </div>
          </div>
        </body>
        </html>
        """,

        "subscribed": """
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body {{ font-family: Arial, sans-serif; background: #f9f9f9; }}
            .container {{ max-width: 600px; margin: auto; background: #fff; border-radius: 8px; 
                         padding: 20px; text-align: center; 
                         box-shadow: 0 2px 6px rgba(0,0,0,0.1); }}
            .title {{ color: #ff6600; }}
            .btn {{ background: #ff6600; color: #fff; padding: 12px 20px; border-radius: 6px; 
                   text-decoration: none; display: inline-block; margin-top: 15px; }}
          </style>
        </head>
        <body>
          <div class="container">
            <h2 class="title">🎉 Thank You for Subscribing!</h2>
            <p>Hi {email},</p>
            <p>We’re excited to have you with us. From now on, you’ll receive the latest updates, 
               blogs, and exclusive services directly to your inbox.</p>
            <a href="{url}" class="btn">{btn_text}</a>
          </div>
        </body>
        </html>
        """
    }

    # For subscribed email → decide button text and link
    if template_name == "subscribed":
        type_ = data.get("type", "blogs")  # default blogs
        if type_ == "services":
            data["btn_text"] = "Explore Services"
            data["url"] = data.get("url", "https://seomasterr.com/services")
        else:
            data["btn_text"] = "Explore Blogs"
            data["url"] = data.get("url", "https://seomasterr.com/blogs")

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

    # Load template with data
    body = load_template(email_temp, data)

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, recipient, msg.as_string())
        print(f"✅ Email sent to {recipient} with subject '{subject}'")
        return True
    except Exception as e:
        print(f"❌ Failed to send to {recipient}: {e}")
        return False
