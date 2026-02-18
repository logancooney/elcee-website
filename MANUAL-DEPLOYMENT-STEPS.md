# Manual Deployment Steps

Since automated deployment requires interactive login, here's the manual process:

## Option 1: Vercel Dashboard (Easiest - 5 minutes)

1. **Go to:** https://vercel.com/signup
2. **Sign up** with GitHub, GitLab, or Email (FREE account)
3. **Click:** "Add New Project"
4. **Select:** "Import Git Repository"
5. **Choose:** Either:
   - Push code to GitHub first (recommended)
   - Or use "Import Third-Party Git Repository"

### If using GitHub (Recommended):
```bash
# In workspace
cd /Users/logancooney/.openclaw/workspace/elcee-website

# Initialize git if not already
git init
git add .
git commit -m "Initial website build"

# Create GitHub repo (via gh CLI or web)
gh repo create elcee-website --public --source=. --remote=origin --push
```

Then in Vercel:
1. Import from GitHub
2. Select `elcee-website` repository
3. Framework Preset: Next.js (auto-detected)
4. Root Directory: `./`
5. Click "Deploy"

Done! Your site will be live at `elcee-website.vercel.app` in ~2 minutes.

## Option 2: Manual CLI Deploy (If you have Vercel account)

```bash
cd /Users/logancooney/.openclaw/workspace/elcee-website

# Login to Vercel
vercel login
# Follow email verification link

# Deploy
vercel --prod
# Answer prompts:
# - Set up and deploy? Y
# - Which scope? Your account
# - Link to existing? N
# - Project name? elcee-website
# - Directory? ./
# - Override settings? N
```

## Option 3: Alternative Hosting (Netlify)

If you prefer Netlify over Vercel:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## After Deployment

1. **Test the live site** - Make sure all pages work
2. **Check booking form** - Submit test booking
3. **Check Vercel logs** - Verify form submissions logged
4. **Configure custom domain:**
   - Vercel Dashboard → Project → Settings → Domains
   - Add `elceethealchemist.com`
   - Update DNS at domain registrar (follow Vercel instructions)

## DNS Configuration

When adding custom domain, you'll need to update DNS:

**At your domain registrar:**
- Delete existing A/CNAME records for `@` (root domain)
- Add CNAME record: `@` → `cname.vercel-dns.com`
- Add CNAME record: `www` → `cname.vercel-dns.com`

**For Shopify (shop subdomain):**
- Add CNAME record: `shop` → `shops.myshopify.com`
- Update Shopify settings to use `shop.elceethealchemist.com`

## Expected Results

✅ Main site: `elceethealchemist.com` → Your new website  
✅ Shop: `shop.elceethealchemist.com` → Shopify store  
✅ Auto HTTPS (Vercel provides free SSL)  
✅ Global CDN (fast worldwide)  
✅ Auto-deployments on git push  

## Troubleshooting

**Build fails?**
- Check Vercel build logs
- Ensure all dependencies in package.json
- Verify Node version compatibility

**Images not loading?**
- Check file paths are correct
- Ensure files exist in /public/

**Form not working?**
- Check Vercel function logs
- Verify API route deployed
- Check browser console for errors

**Domain not connecting?**
- DNS can take 24-48 hours to propagate
- Use `dig elceethealchemist.com` to check DNS
- Verify CNAME record points to Vercel

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Community:** Vercel Discord, Next.js GitHub Discussions
