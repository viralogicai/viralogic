import docx
import re
import os
import shutil

filename = "Kịch bản EMAIL ViraLogic VIP Mentorship.docx"
output_dir = "email_templates_vip"

# Re-create output directory to clean up
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir)

doc = docx.Document(filename)

emails = []
current_email = None

# Regex patterns
start_pattern = re.compile(r"^📩 EMAIL")
subject_pattern = re.compile(r"^Subject:\s*(.*)")

for i, para in enumerate(doc.paragraphs):
    # Split by soft breaks
    raw_text = para.text
    if not raw_text.strip():
        continue
    
    lines = raw_text.split('\n')
    
    for text in lines:
        text = text.strip()
        if not text:
            continue

        # detection logic
        if start_pattern.match(text):
            if current_email:
                emails.append(current_email)
            
            # New email started
            current_email = {
                "title": text,
                "subject": "",
                "body": []
            }
        elif current_email is not None:
            if not current_email['subject'] and subject_pattern.match(text):
                match = subject_pattern.match(text)
                current_email['subject'] = match.group(1).strip()
            else:
                # It's a body line
                current_email['body'].append(text)

# Add the last one
if current_email:
    emails.append(current_email)

print(f"Found {len(emails)} emails total.")

# HTML Template (Same style as before)
def create_html(email_data):
    body_content = ""
    
    for line in email_data['body']:
        line = line.strip()
        if not line: continue
        
        # Regex for [ BUTTON TEXT ]
        btn_match = re.search(r"^\[\s*(.*?)\s*\]$", line)
        
        # Check for list items
        if line.startswith("👉") or line.startswith("❌") or line.startswith("✅") or line.startswith("📌") or line.startswith("1️⃣") or line.startswith("2️⃣") or line.startswith("⚠️") or line.startswith("🔰") or line.startswith("🔥") or line.startswith("💰"):
             body_content += f'<div style="margin-bottom: 12px; padding-left: 10px; font-weight: 500;">{line}</div>'
        
        elif btn_match:
             # Button
            btn_text = btn_match.group(1)
            # Generic button handling
            body_content += f'''
            <div style="margin: 30px 0; text-align: center;">
                <a href="#" style="background-color: #007bff; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">{btn_text}</a>
            </div>
            '''
        
        elif line.startswith("— ViraLogic AI"):
             body_content += f'<div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 25px; font-weight: bold; color: #555; font-style: italic;">{line}</div>'
        
        elif line.startswith("Subject:"):
            pass 
        
        else:
            # Regular paragraph
            body_content += f'<p style="margin-bottom: 15px;">{line}</p>'
            
    html = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{email_data['subject']}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.6; color: #333333;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <!-- Preheader -->
        <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            {email_data['subject']}
        </div>

        <!-- Header / Subject -->
        <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
            <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">VIP Mentorship Sequence</p>
            <h1 style="font-size: 22px; color: #1a1a1a; margin: 0; line-height: 1.4;">{email_data['subject']}</h1>
        </div>

        <!-- CONTENT AREA -->
        <div style="color: #444444;">
            {body_content}
        </div>

        <!-- Footer -->
        <div style="margin-top: 50px; text-align: center; font-size: 13px; color: #999999; border-top: 1px dashed #e0e0e0; padding-top: 20px;">
            <p style="margin-bottom: 10px;">&copy; 2024 ViraLogic AI. All rights reserved.</p>
            <p style="margin: 0;">Unsubscribe | Manage Preferences</p>
        </div>
    </div>
</body>
</html>"""
    return html

# Generate Files
for i, email in enumerate(emails):
    # Filter metadata
    if "FLOW" in email['title']:
        continue
    if not email['subject']:
        continue

    # Clean title
    safe_title = re.sub(r'[^\w\-_]', '_', email['title']).strip('_')
    safe_title = safe_title[:40]
    
    # Try to extract the S0, D4, D14 tags
    tag_match = re.search(r"Mentorship\s*([SD]\d+)", email['title'], re.IGNORECASE)
    if tag_match:
        sort_prefix = f"VIP_{tag_match.group(1)}"
    else:
        # Fallback if specific tag not found or slightly different format
        # Check simple D4 or S0 too
        simple_match = re.search(r"VIP .* ([SD]\d+)", email['title'], re.IGNORECASE)
        if simple_match:
            sort_prefix = f"VIP_{simple_match.group(1)}"
        else:
            sort_prefix = f"Email_{i:02d}"

    filename = f"{output_dir}/{sort_prefix}_{safe_title}.html"
    
    html_content = create_html(email)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Generated: {filename}")
