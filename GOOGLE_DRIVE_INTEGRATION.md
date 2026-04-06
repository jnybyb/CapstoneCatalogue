# Google Drive Integration - Quick Start

Your Capstone Catalogue application has been successfully updated to use Google Drive for image and document storage.

## What Changed?

### Backend Changes
- ✅ Added `googleapis` and `google-auth-library` packages
- ✅ Created `backend/utils/googleDrive.js` - Google Drive API integration module
- ✅ Created `backend/middleware/upload.js` - Multer file upload middleware
- ✅ Updated `backend/controllers/projectController.js` - Added `uploadFile` and `deleteFile` handlers
- ✅ Updated `backend/routes/projectRoutes.js` - Added `/upload` and `/file/:fileId` endpoints
- ✅ Created `GOOGLE_DRIVE_SETUP.md` - Detailed setup guide
- ✅ Created `.env.example` - Environment variables template

### Frontend Changes
- ✅ Updated `frontend/src/services/api.js` - Added `uploadFile` and `deleteFile` methods
- ✅ Updated `frontend/src/components/NewProjectModal.jsx` - Integrated Google Drive upload with progress indication

## Setup Steps (Quick)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Google Cloud Setup
Follow the detailed guide in `backend/GOOGLE_DRIVE_SETUP.md`, which will walk you through:
- Creating a Google Cloud project
- Enabling the Google Drive API
- Creating a service account
- Generating credentials JSON file
- Creating a shared Google Drive folder

### 3. Configure Environment Variables
```bash
cd backend
```

Create a `.env` file with:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=capstone_catalogue
PORT=5000

GOOGLE_APPLICATION_CREDENTIALS=./google-drive-credentials.json
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
```

### 4. Add Credentials File
- Place your service account JSON file in the `backend/` directory
- Rename it to `google-drive-credentials.json` (or match the GOOGLE_APPLICATION_CREDENTIALS path)

### 5. Update .gitignore
Add these lines to `backend/.gitignore`:
```
google-drive-credentials.json
.env
.env.local
*.json.key
```

## How It Works

### File Upload Flow
1. User selects a file in the modal
2. Frontend calls `POST /api/projects/upload` with the file
3. File is uploaded to Google Drive via API
4. Google Drive link is returned to frontend
5. Link is stored in database `abstract_link` field
6. Project is created with the Google Drive link

### File Access
- Files are stored in Google Drive with "Anyone with the link" permission
- Database stores the shareable Google Drive link
- Users can view/download files directly from Google Drive

## API Endpoints

### Upload File
```bash
POST /api/projects/upload
Content-Type: multipart/form-data

Response:
{
  "message": "File uploaded successfully to Google Drive",
  "fileId": "google_drive_file_id",
  "fileName": "original_filename",
  "driveLink": "https://drive.google.com/file/d/.../view",
  "downloadLink": "https://drive.google.com/uc?id=..."
}
```

### Delete File
```bash
DELETE /api/projects/file/:fileId

Response:
{
  "message": "File deleted successfully from Google Drive"
}
```

## Supported File Types
- Images: JPEG, PNG, GIF, WebP
- Documents: PDF
- Maximum size: 50MB

## Important Security Notes

1. **Never commit credentials**
   - `.env` file should be in `.gitignore`
   - `google-drive-credentials.json` should be in `.gitignore`
   - Both are sensitive files containing API keys

2. **Access Control**
   - Only share the Google Drive folder with your service account
   - Regular users access files via the public shareable links

3. **Backup**
   - Keep a backup of `google-drive-credentials.json` in a secure location
   - If lost, you'll need to regenerate it from Google Cloud Console

## Testing

1. Start the backend server:
   ```bash
   npm start
   ```

2. In the frontend, try adding a new project with an image

3. The upload should show progress and complete notification

4. Check your Google Drive folder to verify the file was uploaded

5. Database should contain the Google Drive link in `abstract_link` field

## Troubleshooting

See `backend/GOOGLE_DRIVE_SETUP.md` for detailed troubleshooting steps.

### Common Issues
- **"Cannot find module googleapis"** → Run `npm install` in backend folder
- **"GOOGLE_APPLICATION_CREDENTIALS not found"** → Check credentials file path in `.env`
- **"Permission denied"** → Verify service account has access to the folder

## Support Files

- `backend/GOOGLE_DRIVE_SETUP.md` - Comprehensive setup and troubleshooting guide
- `backend/.env.example` - Environment variables template
- `backend/utils/googleDrive.js` - Google Drive API wrapper functions
- `backend/middleware/upload.js` - File upload middleware

## Next Steps

1. ✅ Run setup from `GOOGLE_DRIVE_SETUP.md`
2. ✅ Configure `.env` file with Google Drive credentials
3. ✅ Test file upload through the UI
4. ✅ Verify files appear in your Google Drive folder
5. ✅ Monitor database to confirm links are stored

Great! Your application is now ready for Google Drive integration. 🚀
