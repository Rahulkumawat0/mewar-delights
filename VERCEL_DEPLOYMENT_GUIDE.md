# Vercel Deployment Guide - Environment Variables

## Overview
This guide explains how to set up environment variables on Vercel for the Mewar Delights application, specifically for the EmailJS newsletter functionality.

---

## Local Development vs Production

### ✅ Local Development (`.env.local`)
- Stored locally on your machine
- **NOT** committed to Git (listed in `.gitignore`)
- Used when running `npm run dev`
- Variables are automatically loaded by Vite

### ✅ Production (Vercel Dashboard)
- Configured in Vercel Project Settings
- Securely stored by Vercel
- Available to deployed application
- Override local variables

---

## Setting Up Environment Variables on Vercel

### Step 1: Go to Vercel Project Settings

1. Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **mewar-delights** project
3. Go to **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### Step 2: Add Environment Variables

Click **Add New** and add each variable:

#### Variable 1: VITE_EMAILJS_SERVICE_ID
- **Name:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** `service_6dbi6rn`
- **Environments:** Select all (Development, Preview, Production)
- **Click:** Add

#### Variable 2: VITE_EMAILJS_PUBLIC_KEY
- **Name:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** `CU-lXMKWCnYcHYjTb`
- **Environments:** Select all
- **Click:** Add

#### Variable 3: VITE_EMAILJS_TEMPLATE_ID
- **Name:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** `template_q5gxmfs`
- **Environments:** Select all
- **Click:** Add

#### Variable 4: VITE_ADMIN_EMAIL
- **Name:** `VITE_ADMIN_EMAIL`
- **Value:** `rahulkumawatnwh2092001@gmail.com`
- **Environments:** Select all
- **Click:** Add

#### Variable 5: VITE_API_URL
- **Name:** `VITE_API_URL`
- **Value:** Your production backend URL (e.g., `https://api.example.com`)
- **Environments:** Select all
- **Click:** Add

### Step 3: Deploy & Verify

1. After adding all variables, Vercel will automatically redeploy
2. Wait for the deployment to complete
3. Visit your live URL to test the newsletter signup
4. Check browser console for any errors

---

## Important Notes

⚠️ **Security Best Practices:**

1. **Never commit** `.env.local` (it's in `.gitignore`)
2. **Never share** your EmailJS keys publicly
3. **Use different keys** for development and production if possible
4. **Rotate keys** periodically for security
5. **Monitor** your EmailJS usage at https://dashboard.emailjs.com/

---

## How Vite Handles Environment Variables

### Local Development
```bash
# .env.local file (local machine only)
VITE_EMAILJS_SERVICE_ID=service_6dbi6rn
VITE_EMAILJS_PUBLIC_KEY=CU-lXMKWCnYcHYjTb
```

Vite automatically loads these into `import.meta.env`

### Production (Vercel)
Vercel sets environment variables as build-time variables that are included in the JavaScript bundle.

**Usage in code:**
```javascript
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

---

## Troubleshooting

### Newsletter not working on Vercel?

1. **Check Vercel Dashboard:**
   - Go to Settings > Environment Variables
   - Verify all 5 variables are set
   - Ensure no typos

2. **Check Recent Deployments:**
   - Go to Deployments tab
   - Most recent deployment should show "Ready"
   - If failed, check build logs

3. **Browser Console Errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for messages starting with "EmailJS"

4. **Test Locally First:**
   ```bash
   npm run dev
   # Test newsletter at http://localhost:5173
   ```

5. **Check EmailJS Dashboard:**
   - Verify template exists: https://dashboard.emailjs.com/admin/templates
   - Check service is active: https://dashboard.emailjs.com/admin/services
   - Review usage limits

---

## Environment Variable Checklist

- [ ] `VITE_EMAILJS_SERVICE_ID` set on Vercel
- [ ] `VITE_EMAILJS_PUBLIC_KEY` set on Vercel
- [ ] `VITE_EMAILJS_TEMPLATE_ID` set on Vercel
- [ ] `VITE_ADMIN_EMAIL` set on Vercel
- [ ] `VITE_API_URL` set on Vercel (with production URL)
- [ ] All variables set for Production environment
- [ ] Recent deployment completed successfully
- [ ] Testing newsletter on live URL works

---

## Quick Reference

| Variable | Where to Get | Example |
|----------|-------------|---------|
| VITE_EMAILJS_SERVICE_ID | EmailJS Dashboard > Services | service_6dbi6rn |
| VITE_EMAILJS_PUBLIC_KEY | EmailJS Dashboard > Account > API Keys | CU-lXMKWCnYcHYjTb |
| VITE_EMAILJS_TEMPLATE_ID | EmailJS Dashboard > Templates | template_q5gxmfs |
| VITE_ADMIN_EMAIL | Your restaurant email | rahul@mewar.com |
| VITE_API_URL | Your backend server URL | https://api.mewar.com |

---

## Need Help?

- **EmailJS Issues:** https://www.emailjs.com/docs/
- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html
