# Google Drive OAuth2 Setup Guide

This guide will help you set up OAuth2 authentication for Google Drive integration.

## Step 1: Get OAuth2 Credentials from Google Cloud Console

### 1A. Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure your "capstone-catalogue-storage" project is selected

### 1B. Create OAuth2 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. You might be asked to create a consent screen first:
   - Click **Create Consent Screen**
   - Choose **External** user type
   - Click **Create**
   - Fill in the form:
     - App name: "Capstone Catalogue"
     - User support email: (your email)
     - Developer contact: (your email)
     - Click **Save and Continue**
   - You can skip scopes and optional info, just click **Save and Continue**
   - Click **Back to Dashboard**

### 1C. Create the OAuth2 Client ID
1. Go to **Credentials** again
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web Application**
4. Name it: "Capstone App"
5. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:5000/api/projects/auth/callback
   ```
6. Click **Create**
7. Copy the **Client ID** and **Client Secret** - you'll need these

## Step 2: Get Your Refresh Token

### 2A. Start the Backend Server
```bash
cd backend
npm start
```

### 2B. Get the Authorization URL
Open your browser and visit:
```
http://localhost:5000/api/projects/auth/url
```

You'll get a response like:
```json
{
  "authUrl": "https://accounts.google.com/o/oauth2/auth?..."
}
```

### 2C. Authorize the Application
1. Click on that URL (or copy it to your browser)
2. You'll be asked to sign in with your personal Google account
3. Click **Allow** to give the app permission to access your Google Drive
4. You'll be redirected to a page that shows your **Refresh Token**
5. Copy the entire refresh token (it's a long string)

Example response:
```json
{
  "message": "Authorization successful!",
  "refreshToken": "1//0gUXXXXXXXXXXXXXXX...",
  "instructions": "Add this refresh token to your .env file as GOOGLE_REFRESH_TOKEN"
}
```

## Step 3: Update Your .env File

Update `backend/.env` with your OAuth2 credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Coffee_Monitoring
DB_NAME=capstone_catalogue
DB_PORT=3307
PORT=5000

# OAuth2 Configuration for Google Drive
GOOGLE_CLIENT_ID=your_client_id_from_step_1c
GOOGLE_CLIENT_SECRET=your_client_secret_from_step_1c
GOOGLE_REDIRECT_URL=http://localhost:5000/api/projects/auth/callback
GOOGLE_REFRESH_TOKEN=your_refresh_token_from_step_2c

# Optional: Google Drive folder ID (leave empty to upload to root "My Drive")
GOOGLE_DRIVE_FOLDER_ID=
```

Replace:
- `your_client_id_from_step_1c` with your Client ID
- `your_client_secret_from_step_1c` with your Client Secret  
- `your_refresh_token_from_step_2c` with your Refresh Token

## Step 4: Restart the Backend

```bash
npm start
```

## Step 5: Test the Upload

Try uploading a file through the frontend modal. Files will now be uploaded to your personal Google Drive "My Drive" folder!

## How It Works

1. **OAuth2 Authentication**: Your app uses your Google account credentials to access Google Drive
2. **Refresh Token**: Stored in `.env` so the app can get new access tokens automatically
3. **No Service Account Needed**: Works with personal Google accounts
4. **Personal Drive**: Files upload to your "My Drive" folder (no Shared Drive needed)

## Troubleshooting

### Error: "Client ID or Secret is invalid"
- Make sure you copied them correctly from Step 1C
- Check there are no extra spaces

### Error: "Refresh token is invalid or expired"
- Go through the authorization flow again (Step 2)
- Copy the new refresh token to `.env`

### Error: "Failed to upload file"
- Make sure the refresh token is set correctly in `.env`
- Restart the backend after updating `.env`
- Check that Google Drive API is enabled in Cloud Console

### Files not appearing in Drive
- Check you've authorized with the correct Google account
- Verify the OAuth2 credentials are valid by testing Step 2 again

## Important Security Notes

1. **Never share your refresh token** - it's like a permanent password
2. **Add to .gitignore** - make sure `.env` is in `.gitignore` to prevent committing secrets
3. **Keep it safe** - if leaked, anyone could upload files using your Google account
4. **Can be revoked** - you can revoke the refresh token in [Google Account Security Settings](https://myaccount.google.com/permissions)

## What's Next?

- Test uploading files through the application
- Verify they appear in your Google Drive
- Check the database to confirm links are stored correctly

Happy uploading! 🚀
