# Google Drive Integration Setup Guide

## Overview
This project has been configured to use Google Drive for storing uploaded images and documents. Instead of storing files locally on the server, files are uploaded directly to Google Drive and links are stored in the database.

## Prerequisites
- Node.js and npm installed
- A Google Cloud account
- Access to your Google Drive

## Step-by-Step Setup Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter "Capstone Catalogue" (or your preferred name)
5. Click "CREATE"
6. Wait for the project to be created

### 2. Enable Google Drive API

1. In the Google Cloud Console, make sure your new project is selected
2. Go to **APIs & Services** > **Library**
3. Search for "**Google Drive API**"
4. Click on "Google Drive API"
5. Click the **ENABLE** button

### 3. Create a Service Account

A service account allows your application to authenticate with Google Drive.

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** button
3. Select **Service Account**
4. Fill in the service account details:
   - Service account name: "Capstone Upload Service" (or similar)
   - Description: "Service account for uploading files to Google Drive"
   - Click "CREATE AND CONTINUE"
5. Grant the service account editor role (optional, you can skip this step)
6. Click "CONTINUE"
7. At the final summary, click "CREATE KEY"
8. Choose JSON format
9. Click "CREATE"
10. A JSON file will be automatically downloaded - **Save this file securely**

### 4. Move the Credentials File

1. Go to your project's backend folder: `CapstoneCatalogue/backend/`
2. Move the downloaded JSON file into this directory
3. Rename it to `google-drive-credentials.json` (or your preferred name)
4. **Important**: Add this file to `.gitignore` to prevent committing secrets to version control

Your `.gitignore` should include:
```
google-drive-credentials.json
.env
.env.local
node_modules/
```

### 5. Create a Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Right-click in the left panel and select "New folder"
3. Name it "Project Uploads" or similar
4. Right-click the folder and select "Share"
5. Copy the service account email from your JSON credentials file:
   - Open `google-drive-credentials.json`
   - Find the "client_email" field
6. Paste the email in the share dialog
7. Give it "Editor" access
8. Click "Share"
9. Copy the folder ID from the URL:
   - Open the folder in Google Drive
   - The URL should look like: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
   - Copy everything after `folders/`

### 6. Configure Environment Variables

1. In the backend folder, open `.env` file (or create it if it doesn't exist)
2. Add these lines:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=capstone_catalogue
PORT=5000

# Google Drive Configuration
GOOGLE_APPLICATION_CREDENTIALS=./google-drive-credentials.json
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
```

Replace:
- `your_folder_id_here` with the actual folder ID from step 5
- Keep the credentials file path as is (or update if you chose a different name)

### 7. Install Dependencies

```bash
cd backend
npm install
```

This will install the required packages:
- `googleapis` - Google Drive API client
- `google-auth-library` - Authentication
- `multer` - File upload handling

## Usage

### Frontend: Upload an Image

The frontend now has an `/api/projects/upload` endpoint that handles file uploads:

```javascript
const formData = new FormData();
formData.append('file', fileObject);

const response = await fetch('/api/projects/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// result.driveLink - Link to view on Google Drive
// result.downloadLink - Direct download link
// result.fileId - Google Drive file ID
```

### Backend: Supported File Types

The following file types are supported:
- Images: JPEG, PNG, GIF, WebP
- Documents: PDF

Maximum file size: 50MB

## File Structure

```
backend/
├── controllers/
│   └── projectController.js  (contains uploadFile and deleteFile handlers)
├── middleware/
│   └── upload.js             (multer configuration)
├── utils/
│   └── googleDrive.js        (Google Drive API integration)
├── google-drive-credentials.json (your service account key - in .gitignore)
├── .env                      (your environment variables - in .gitignore)
├── .env.example              (template for .env)
└── server.js
```

## Key Functions

### `uploadFileToDrive(fileBuffer, originalName, mimeType, folderId)`
Uploads a file to Google Drive and makes it publicly readable.

**Returns:**
```javascript
{
  fileId: "drive_file_id",
  webViewLink: "https://drive.google.com/file/d/.../view",
  name: "filename"
}
```

### `deleteFileFromDrive(fileId)`
Deletes a file from Google Drive by its file ID.

## API Endpoints

### Upload a File
```
POST /api/projects/upload
Content-Type: multipart/form-data

Body: file (multipart file field)

Response:
{
  "message": "File uploaded successfully to Google Drive",
  "fileId": "...",
  "fileName": "...",
  "driveLink": "...",
  "downloadLink": "..."
}
```

### Delete a File
```
DELETE /api/projects/file/:fileId

Response:
{
  "message": "File deleted successfully from Google Drive"
}
```

## Troubleshooting

### Error: "GOOGLE_APPLICATION_CREDENTIALS not found"
- Make sure the `google-drive-credentials.json` file exists in the backend folder
- Check the path in your `.env` file

### Error: "Failed to authenticate with Google Drive"
- Make sure the service account has Editor access to the folder
- Check that the JSON credentials file is valid and not corrupted

### Error: "Permission denied"
- Make sure the service account email has been shared the Google Drive folder
- Verify the folder ID is correct in your `.env` file

### Files appear in Google Drive but can't be accessed
- This is normal - files are uploaded with "Anyone with the link can view" permission
- The links in the database will work for viewing and downloading

## Security Notes

1. **Never commit credentials**: Always add `google-drive-credentials.json` and `.env` to `.gitignore`
2. **Use environment variables**: Sensitive data should be in `.env`, not hardcoded
3. **Folder permissions**: The shared folder should be for this project only
4. **Backup credentials**: Keep a backup of your `google-drive-credentials.json` file in a safe location

## Next Steps

After setup:
1. Test the upload functionality with the frontend
2. Verify files appear in your Google Drive folder
3. Check that database links work correctly
4. Monitor the backend logs for any errors

## Support

If you encounter issues:
1. Check the error messages in the backend console
2. Verify all .env variables are correctly set
3. Ensure Google Drive API is enabled in Google Cloud Console
4. Check that the service account has proper folder permissions
