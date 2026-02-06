# EmailJS Newsletter Setup Guide

## What is EmailJS?
EmailJS is a free service that allows you to send emails directly from your website without needing a backend server. Perfect for newsletters, contact forms, and notifications.

**Free Tier Benefits:**
- 200 emails/month
- Easy setup
- No server required
- Professional email templates

---

## STEP-BY-STEP SETUP (COMPLETE)

### Step 1: Get Your Public Key
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Account"** → **"API Keys"**
3. Copy your **Public Key**
4. Open `.env.local` in your project and replace:
   ```
   VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
   ```
   with your actual public key

**Example:** 
```
VITE_EMAILJS_PUBLIC_KEY=abc123xyz789opqrst...
```

### Step 2: Create Email Template
1. In EmailJS Dashboard, go to **"Email Templates"**
2. Click **"Create New Template"**
3. **Template Name:** `mewar_newsletter_welcome`
4. Fill the template with this content:

**Subject:** `Welcome to Mewar Delights!`

**HTML Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6b0f1a;">Welcome to Mewar Delights! 👑</h2>
  
  <p>Dear Valued Subscriber,</p>
  
  <p>Thank you for subscribing to our newsletter! We're thrilled to have you join our community of Rajasthani food lovers. 🎉</p>
  
  <h3 style="color: #6b0f1a;">What You'll Receive:</h3>
  <ul style="color: #333;">
    <li>🍲 Exclusive offers and special discounts</li>
    <li>📖 Traditional Rajasthani recipes & cooking tips</li>
    <li>🎊 Announcements about new dishes & flavors</li>
    <li>👑 VIP early access to limited-time products</li>
  </ul>
  
  <div style="background-color: #ffd700; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
    <p style="color: #6b0f1a; font-weight: bold; margin: 0;">
      🎁 Get 10% OFF Your First Order! 🎁<br/>
      Use Code: <strong>WELCOME10</strong>
    </p>
  </div>
  
  <p>We can't wait to serve you authentic Rajasthani delicacies at your doorstep!</p>
  
  <p>Best regards,<br/>
  <strong>The Mewar Delights Family</strong> 👑</p>
  
  <hr style="border: none; border-top: 2px solid #ffd700; margin: 20px 0;">
  
  <p style="font-size: 12px; color: #999;">
    Have questions? Reply to this email and we'll help you out!<br/>
    © 2026 Mewar Delights. All rights reserved.
  </p>
</div>
```

5. **After saving**, copy the **Template ID** (visible at top or in list)
6. Update `.env.local`:
   ```
   VITE_EMAILJS_TEMPLATE_ID=template_YOUR_ID_HERE
   ```

**Example:**
```
VITE_EMAILJS_TEMPLATE_ID=template_abc123def456
```

### Step 3: Verify .env.local File
Your complete `.env.local` should look like:
```
VITE_EMAILJS_SERVICE_ID=service_6dbi6rn
VITE_EMAILJS_PUBLIC_KEY=abc123xyz789... (your actual key)
VITE_EMAILJS_TEMPLATE_ID=template_abc123def456 (your actual ID)
VITE_ADMIN_EMAIL=rahulkumawatnwh2092001@gmail.com
```

### Step 4: Test Everything
1. Start the dev server:
   ```bash
   npm run dev
   ```
2. Go to http://localhost:5174/
3. Scroll to bottom → Newsletter section
4. Enter test email and click **Subscribe**
5. Check:
   - ✅ Success message appears
   - ✅ Email received at admin email
   - ✅ Subscriber receives welcome email

---

## What's Working Now:

✅ **Email Validation** - Checks for valid email format
✅ **Loading State** - Shows "Subscribing..." while processing
✅ **Success/Error Messages** - User gets instant feedback
✅ **Environment Variables** - All secrets secured in .env.local
✅ **Auto-dismiss Messages** - Feedback disappears after 3 seconds
✅ **Form Reset** - Input clears after successful subscription
✅ **Subscriber Confirmation** - Subscribers get welcome email

---

## Email Limits & Pricing:

| Plan | Emails/Month | Price |
|------|------------|-------|
| **Free** | 200 | Free |
| **Pro** | Unlimited | $14/month |
| **Business** | Unlimited + Priority | $24/month |

---

## Common Issues & Solutions:

### ❌ "Subscription failed. Please try again."
- **Check:** Is `.env.local` file created in `client/` folder?
- **Check:** Are all 4 variables filled in `.env.local`?
- **Check:** Did you copy Public Key correctly?
- **Check:** Did you copy Template ID correctly?
- **Solution:** Restart dev server after updating `.env.local`

### ❌ Email shows variables like `{{user_email}}`
- **Problem:** Template variables not recognized
- **Solution:** Make sure your HTML template uses these exact variables:
  - `{{user_email}}` - subscriber's email
  - `{{to_email}}` - admin email
  - `{{reply_to}}` - reply-to email

### ❌ Emails not arriving
- **Check 1:** Look in spam/junk folder first
- **Check 2:** In EmailJS Dashboard → Logs, check for errors
- **Check 3:** Make sure template is **active** (not archived)
- **Check 4:** Verify email addresses are correct in `.env.local`

### ❌ "Cannot find module @emailjs/browser"
- **Solution:** Run `npm install @emailjs/browser` in client folder

---

## Security Notes:

✅ **`.env.local` is in `.gitignore`** - Secrets won't be pushed to GitHub
✅ **Public Key is safe** - Can't send emails without it
✅ **Service ID is safe** - Read-only identifier
✅ **Template ID is safe** - Just points to template
✅ **Only Admin Email** - Should keep private

**IMPORTANT:** Never commit `.env.local` to GitHub!

---

## Future Enhancements (Optional):

1. **Email Campaigns** - Send bulk newsletters
2. **Discount Codes** - Unique codes per subscriber
3. **Analytics** - Track opens/clicks
4. **Database** - Store subscribers in MongoDB
5. **Automation** - Birthday discounts, reorder reminders
6. **A/B Testing** - Test different email versions

---

## Useful Links:

- 📚 EmailJS Docs: https://www.emailjs.com/docs/
- 🎯 Dashboard: https://dashboard.emailjs.com/
- 💬 Support: https://www.emailjs.com/docs/faq/


---

## Setup Steps (5 minutes)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click **Sign Up** and create a free account
3. Verify your email

### Step 2: Setup Email Service
1. In the dashboard, click **Email Services**
2. Click **Add Service**
3. Choose **Gmail** (or your preferred email provider)
4. Click **Create Service**
5. You'll get a **Service ID** - copy this!
6. Follow the Gmail setup (you'll need to generate an app password)
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-digit password
   - Paste it into EmailJS

### Step 3: Create Email Template
1. Click **Email Templates** in the dashboard
2. Click **Create New Template**
3. Name it something like "Newsletter Welcome"
4. Create two templates:

#### Template 1: Welcome Email (to subscriber)
```
Subject: Welcome to Mewar Delights Newsletter! 🎉

Hello,

Thank you for subscribing to Mewar Delights!

You'll now receive:
✅ Exclusive recipes & cooking tips
✅ Special discounts & offers
✅ Updates on new dishes
✅ Restaurant news & events

Get ready to experience authentic Rajasthani flavors!

Best regards,
Mewar Delights Team
```

#### Template 2: Admin Notification (to you)
```
Subject: New Newsletter Subscriber

New subscriber email: {{user_email}}

Time: {{date}}

(Auto-generated notification)
```

4. Click **Save** and copy the **Template ID**

### Step 4: Update Home.jsx with Credentials

In `client/src/pages/Home.jsx`, find these lines (around line 20-24):

```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// And around line 50:
await emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
```

Replace with your actual credentials:

**To get your Public Key:**
1. Go to EmailJS dashboard
2. Click **Account** (top right)
3. Copy your **Public Key**

**Your credentials look like:**
- **Public Key:** `abc123xyz789...`
- **Service ID:** `service_abc123xyz`
- **Template ID:** `template_xyz789abc`

### Step 5: Find Your Credentials

| Credential | Where to Find |
|-----------|---------------|
| Public Key | Account → Public Key |
| Service ID | Email Services → (Your Service) → Service ID |
| Template ID | Email Templates → (Your Template) → Template ID |

---

## How It Works (User Flow)

```
1. User enters email in newsletter form
       ↓
2. Clicks "Subscribe" button
       ↓
3. Email sent to EmailJS API
       ↓
4. EmailJS sends welcome email to subscriber
       ↓
5. EmailJS sends notification email to you
       ↓
6. Success message shown to user
```

---

## Testing

1. In your Home.jsx, you'll see placeholders for:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY_HERE");
   
   // When sending:
   "YOUR_SERVICE_ID"
   "YOUR_TEMPLATE_ID"
   ```

2. Replace these with actual values
3. Test by subscribing with a test email
4. Check your email inbox for the welcome message
5. Check your admin email for the notification

---

## Features Implemented

✅ Email validation  
✅ Loading state while sending  
✅ Success/Error messages  
✅ Auto-clear email field after success  
✅ Disable button while sending  
✅ Beautiful animations  

---

## Free Limits & Upgrades

- **Free:** 200 emails/month
- **Premium starts at:** $4.99/month (1,000 emails)
- **Upgrade anytime** - no credit card needed for free tier

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Check Service ID, Template ID, Public Key |
| Email not sending | Verify Gmail app password was set correctly |
| Form not submitting | Check browser console for error messages |
| Message not appearing | Ensure message state updates (check React DevTools) |

---

## Next Steps (Optional Enhancements)

1. **Add double opt-in**: Send confirmation email before adding to list
2. **Store emails**: Save subscriber emails to your database
3. **Automated campaigns**: Send weekly recipes or promotions
4. **Dynamic content**: Personalize emails with subscriber name
5. **Unsubscribe link**: Add unsubscribe option to emails

---

## Security Notes

✅ Public Key is safe to expose (it's meant to be client-side)  
✅ Private Key is already secured on EmailJS servers  
✅ No sensitive data is stored  
✅ GDPR compliant with proper consent  

---

**Questions?** Check EmailJS documentation: https://www.emailjs.com/docs/
