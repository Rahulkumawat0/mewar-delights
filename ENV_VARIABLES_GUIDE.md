# Environment Variables Flow Diagram

## 🔄 How Environment Variables Work

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOCAL DEVELOPMENT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Your Machine                                                   │
│  ├── .env.local ← Your credentials (SECRET - NOT IN GIT)      │
│  │   ├── VITE_EMAILJS_SERVICE_ID=service_6dbi6rn              │
│  │   ├── VITE_EMAILJS_PUBLIC_KEY=CU-lXMKWCnYcHYjTb            │
│  │   ├── VITE_EMAILJS_TEMPLATE_ID=template_q5gxmfs            │
│  │   └── VITE_ADMIN_EMAIL=...@gmail.com                       │
│  │                                                              │
│  └── npm run dev                                                │
│      └── Vite reads .env.local                                  │
│          └── import.meta.env.VITE_* variables loaded            │
│              └── http://localhost:5174 ✅ WORKS                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│               PRODUCTION (VERCEL DEPLOYMENT)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GitHub Repository                                              │
│  ├── Source Code (public)                                       │
│  ├── .env.local ← IGNORED (not in Git)                         │
│  └── .env.example ← Template documentation                      │
│      │                                                          │
│      └─→ git push origin main                                   │
│          │                                                      │
│          └─→ Vercel Detects Update                             │
│              │                                                  │
│              └─→ Vercel Build Process                          │
│                  │                                              │
│                  ├─→ Reads from Vercel Dashboard               │
│                  │   (Environment Variables Settings)           │
│                  │   ├── VITE_EMAILJS_SERVICE_ID              │
│                  │   ├── VITE_EMAILJS_PUBLIC_KEY              │
│                  │   ├── VITE_EMAILJS_TEMPLATE_ID             │
│                  │   ├── VITE_ADMIN_EMAIL                     │
│                  │   └── VITE_API_URL                         │
│                  │                                              │
│                  └─→ Bundles them into JavaScript               │
│                      └─→ import.meta.env.VITE_* available       │
│                          │                                      │
│                          └─→ https://app.vercel.app ✅ WORKS   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│              NEWSLETTER COMPONENT WORKFLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User enters email                                              │
│  └─→ onClick "Subscribe"                                        │
│      └─→ Validate email format                                  │
│          └─→ Check environment variables configured             │
│              └─→ Send to EmailJS                                │
│                  │                                              │
│                  ├─→ ✅ Success                                │
│                  │   └─→ Show confirmation message              │
│                  │   └─→ Clear form                             │
│                  │   └─→ Send admin notification                │
│                  │                                              │
│                  └─→ ❌ Error                                  │
│                      └─→ Show error message                     │
│                      └─→ Log details to console                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Environment Variables Mapping

```
┌──────────────────────────┬──────────────────┬──────────────────┐
│ Variable Name            │ Where to Get It  │ Current Value    │
├──────────────────────────┼──────────────────┼──────────────────┤
│ VITE_EMAILJS_            │ EmailJS          │ service_         │
│ SERVICE_ID               │ Dashboard >      │ 6dbi6rn          │
│                          │ Email Services   │                  │
├──────────────────────────┼──────────────────┼──────────────────┤
│ VITE_EMAILJS_            │ EmailJS          │ CU-lXMKWCnYc    │
│ PUBLIC_KEY               │ Dashboard >      │ HYjTb            │
│                          │ Account >        │                  │
│                          │ API Keys         │                  │
├──────────────────────────┼──────────────────┼──────────────────┤
│ VITE_EMAILJS_            │ EmailJS          │ template_        │
│ TEMPLATE_ID              │ Dashboard >      │ q5gxmfs          │
│                          │ Email Templates  │                  │
├──────────────────────────┼──────────────────┼──────────────────┤
│ VITE_ADMIN_EMAIL         │ Your email       │ rahulkumawat...  │
│                          │ address          │ @gmail.com       │
├──────────────────────────┼──────────────────┼──────────────────┤
│ VITE_API_URL             │ Your backend     │ http://localhost │
│                          │ server URL       │ :5000 (local)    │
│                          │                  │ or production    │
│                          │                  │ URL              │
└──────────────────────────┴──────────────────┴──────────────────┘
```

---

## 🔑 Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 1: Version Control (Git)                                │
│  ├─── .env.local ──→ .gitignore ──→ ❌ Never committed        │
│  └─── Code files   ──→ Git repo   ──→ ✅ Safely committed      │
│                                                                 │
│  Layer 2: Local Machine                                         │
│  ├─── .env.local exists ──→ Only on YOUR machine               │
│  └─── Nobody else has access                                    │
│                                                                 │
│  Layer 3: Vercel (Production)                                   │
│  ├─── Dashboard Settings ──→ Encrypted storage                 │
│  ├─── Build-time injection ──→ Added during build              │
│  └─── Runtime access ──→ Via import.meta.env                   │
│                                                                 │
│  Layer 4: Code Security                                         │
│  ├─── No hardcoded secrets ──→ ✅ Using variables              │
│  ├─── No console.log secrets ──→ ✅ Validated first            │
│  └─── No localStorage secrets ──→ ✅ Never stored              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

```
LOCAL DEVELOPMENT
├─ [ ] npm run dev runs without errors
├─ [ ] http://localhost:5174 loads
├─ [ ] Newsletter section visible
├─ [ ] Email validation works
├─ [ ] Submit button responds
├─ [ ] Success message appears
├─ [ ] Error message appears
└─ [ ] No "not configured" warnings in console

BEFORE VERCEL DEPLOYMENT
├─ [ ] Visit Vercel Dashboard
├─ [ ] Select mewar-delights project
├─ [ ] Go to Settings > Environment Variables
├─ [ ] Add 5 variables (see VERCEL_DEPLOYMENT_GUIDE.md)
├─ [ ] Each variable set to "All" environments
├─ [ ] Save changes
└─ [ ] Wait for auto-redeploy

AFTER VERCEL DEPLOYMENT
├─ [ ] Go to live Vercel URL
├─ [ ] Newsletter section visible
├─ [ ] Email validation works
├─ [ ] Submit button responds
├─ [ ] Success message appears
├─ [ ] Check admin email for notification
├─ [ ] Error message appears (test with bad email)
└─ [ ] No "not configured" warnings in console
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Test Locally ✅
```bash
npm run dev
# Visit http://localhost:5174
# Test newsletter signup
```

### Step 2: Setup Vercel (5 minutes) ⏳
```
1. Vercel Dashboard
2. mewar-delights project > Settings
3. Environment Variables
4. Add 5 variables (copy-paste from VERCEL_DEPLOYMENT_GUIDE.md)
5. Save & wait for redeploy
```

### Step 3: Test Production ✅
```
1. Visit your live Vercel URL
2. Test newsletter signup
3. Check admin email
4. Celebrate! 🎉
```

---

## 📚 Documentation Reference

| File | Purpose | Read When |
|------|---------|-----------|
| `.env.example` | Shows what variables are needed | Setting up local dev |
| `ENV_VARIABLES_SUMMARY.md` | Quick FAQ & overview | Quick questions |
| `VERCEL_DEPLOYMENT_GUIDE.md` | Step-by-step Vercel setup | Deploying to production |
| `NEWSLETTER_SETUP_COMPLETE.md` | Complete checklist | Before going live |
| `Newsletter.jsx` | Component source code | Understanding implementation |

---

## 💡 Key Concepts

**Environment Variables** = Settings that change per environment  
**Local** = Your development machine (uses .env.local)  
**Production** = Vercel live servers (uses dashboard settings)  
**Vite** = Build tool that reads environment variables  
**Import.meta.env** = JavaScript way to access variables  
**Security** = Keeping secrets secret, never in Git  

---

**Ready to deploy? → Follow VERCEL_DEPLOYMENT_GUIDE.md** ✅
