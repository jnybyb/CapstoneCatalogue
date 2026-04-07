const { google } = require("googleapis");
const { Readable } = require("stream");
const fs = require("fs");
const path = require("path");

/**
 * Initialize OAuth2 client with stored refresh token
 * @returns {google.auth.OAuth2} OAuth2 client
 */
const initializeOAuth2Client = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  // Set the refresh token to get new access tokens
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return oauth2Client;
};

/**
 * Initialize Google Drive API with OAuth2
 * @returns {google.drive_v3.Drive} Drive API instance
 */
const initializeDriveClient = () => {
  const auth = initializeOAuth2Client();
  return google.drive({ version: "v3", auth });
};

/**
 * Get the authorization URL for OAuth2 authentication
 * @returns {string} Authorization URL
 */
const getAuthorizationUrl = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  const scopes = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
};

/**
 * Exchange authorization code for tokens
 * @param {string} code - Authorization code from OAuth2 callback
 * @returns {Promise<{refresh_token: string, access_token: string}>}
 */
const getTokensFromCode = async (code) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    throw new Error(`Failed to get tokens: ${error.message}`);
  }
};

/**
 * Upload a file to Google Drive
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} originalName - Original filename
 * @param {string} mimeType - MIME type of the file
 * @param {string} folderId - Google Drive folder ID to upload to (optional)
 * @returns {Promise<{fileId: string, webViewLink: string}>}
 */
const uploadFileToDrive = async (fileBuffer, originalName, mimeType, folderId) => {
  try {
    const drive = initializeDriveClient();

    // Create a readable stream from buffer
    const stream = Readable.from([fileBuffer]);

    const response = await drive.files.create({
      requestBody: {
        name: originalName,
        parents: folderId ? [folderId] : [],
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: stream,
      },
      fields: "id, webViewLink, webContentLink, name",
    });

    // Make file publicly accessible (optional, for easy access)
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
      name: response.data.name,
    };
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

/**
 * Delete a file from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise<void>}
 */
const deleteFileFromDrive = async (fileId) => {
  try {
    const drive = initializeDriveClient();
    await drive.files.delete({
      fileId: fileId,
    });
  } catch (error) {
    console.error("Error deleting from Google Drive:", error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

/**
 * Get a direct download link from a Google Drive file ID
 * @param {string} fileId - Google Drive file ID
 * @returns {string} Direct download link
 */
const getDownloadLink = (fileId) => {
  return `https://drive.google.com/uc?id=${fileId}&export=download`;
};

/**
 * Get a preview/view link from a Google Drive file ID
 * @param {string} fileId - Google Drive file ID
 * @returns {string} Preview link
 */
const getViewLink = (fileId) => {
  return `https://drive.google.com/file/d/${fileId}/view`;
};

/**
 * Fetch file content from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise<Buffer>} File content as buffer
 */
const getFileContent = async (fileId) => {
  try {
    const drive = initializeDriveClient();
    
    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media'
      },
      { responseType: 'stream' }
    );

    // Convert stream to buffer
    return new Promise((resolve, reject) => {
      const chunks = [];
      response.data.on('data', (chunk) => chunks.push(chunk));
      response.data.on('end', () => resolve(Buffer.concat(chunks)));
      response.data.on('error', reject);
    });
  } catch (error) {
    console.error("Error fetching file from Google Drive:", error);
    throw new Error(`Failed to fetch file: ${error.message}`);
  }
};

/**
 * Get file metadata from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise<{mimeType: string, name: string}>}
 */
const getFileMetadata = async (fileId) => {
  try {
    const drive = initializeDriveClient();
    
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'mimeType, name'
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching file metadata from Google Drive:", error);
    throw new Error(`Failed to fetch file metadata: ${error.message}`);
  }
};

module.exports = {
  uploadFileToDrive,
  deleteFileFromDrive,
  getDownloadLink,
  getViewLink,
  getFileContent,
  getFileMetadata,
  initializeDriveClient,
  getAuthorizationUrl,
  getTokensFromCode,
  initializeOAuth2Client,
};
