# Deploy NextTrack to Vercel

## Prerequisites
- Your NextTrack project is ready
- A Vercel account (free at vercel.com)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository
1. Make sure your code is in a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure all files are committed

### Step 2: Deploy
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Select your NextTrack repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Step 3: Configuration
Vercel will automatically:
- Install dependencies from `package.json`
- Run `npm run build`
- Deploy your app
- Provide you with a live URL

## Method 2: Manual Upload

### Step 1: Prepare Files
1. Create a zip file of your project
2. Exclude `node_modules` and `.next` folders
3. Include all source files

### Step 2: Upload
1. Go to Vercel dashboard
2. Choose "Upload" option
3. Upload your zip file
4. Wait for deployment

## Post-Deployment

### Custom Domain (Optional)
1. In your Vercel dashboard, go to project settings
2. Add your custom domain
3. Configure DNS settings

### Environment Variables (if needed)
If you add environment variables later:
1. Go to project settings in Vercel
2. Add environment variables
3. Redeploy

## Troubleshooting

### Build Issues
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation passes
- Verify all imports are correct

### Common Issues
- **PowerShell execution policy**: Use web interface instead of CLI
- **Build failures**: Check console logs in Vercel dashboard
- **Missing dependencies**: Ensure all packages are in `package.json`

## Your App URL
After deployment, you'll get a URL like:
`https://nextrack-username.vercel.app`

You can share this URL with others to access your financial tracking app! 