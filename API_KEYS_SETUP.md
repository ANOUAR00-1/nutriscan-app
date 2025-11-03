# 🔑 API Keys Setup Guide

Your OpenRouter API keys have expired. Follow these steps to get NEW FREE keys:

## Step 1: Get Your FREE OpenRouter API Key

1. **Go to OpenRouter**: https://openrouter.ai/keys
2. **Sign in** with Google or GitHub (takes 10 seconds)
3. **Click "Create Key"**
4. **Copy your new key** (starts with `sk-or-v1-...`)

**That's it! It's FREE!** 🎉

---

## Step 2: Add Your API Key to the App

### **Option A: Direct Code Update (Quick & Easy)**

1. Open `utils/foodAnalyzer.ts`
2. Find line 21 (around `OPENROUTER_API_KEYS`)
3. Replace the first key with your NEW key:

```typescript
const OPENROUTER_API_KEYS = [
  'sk-or-v1-YOUR_NEW_KEY_HERE',  // ← Paste your key here
  'sk-or-v1-...',  // Old backup (optional to replace)
  'sk-or-v1-...',  // Old backup (optional to replace)
];
```

4. Save the file
5. Refresh your app - **DONE!** ✅

---

### **Option B: Environment Variables (Recommended for Production)**

Create a `.env` file in your project root:

```env
OPENROUTER_API_KEY_1=sk-or-v1-YOUR_NEW_KEY_HERE
OPENROUTER_API_KEY_2=sk-or-v1-BACKUP_KEY_HERE
OPENROUTER_API_KEY_3=sk-or-v1-ANOTHER_BACKUP_KEY_HERE
```

---

## Step 3: Test It!

1. Go to the **Scan** tab
2. Take a photo of any food
3. Click **Analyze Food**
4. Should work in 2-3 seconds! 🎉

---

## Troubleshooting

### "Still getting 401 error"
- ✅ Make sure you copied the FULL key (starts with `sk-or-v1-`)
- ✅ Check for extra spaces before/after the key
- ✅ Try creating a NEW key if the old one doesn't work

### "How many keys do I need?"
- **Minimum: 1 key** (works fine!)
- **Recommended: 2-3 keys** (automatic backup if one fails)

### "Is it really free?"
- ✅ **YES!** OpenRouter offers FREE models
- ✅ We use `nvidia/nemotron-nano-12b-v2-vl:free` (FREE forever)
- ✅ No credit card needed

---

## Quick Links

- **Get API Keys**: https://openrouter.ai/keys
- **OpenRouter Docs**: https://openrouter.ai/docs
- **Free Models List**: https://openrouter.ai/models?order=newest&type=free

---

## Need Help?

Your keys are hardcoded in: `utils/foodAnalyzer.ts` (line 20-24)

Just replace the old keys with your new one and you're good to go! 🚀
