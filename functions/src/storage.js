const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { admin } = require("../lib/config");

/**
 * getSignedUploadUrls
 */
exports.getSignedUploadUrls = onCall(async (request) => {
  try {
    let { email, files } = request.data;
    if (!email || !files || !Array.isArray(files)) {
      throw new HttpsError("invalid-argument", "Email and files array are required");
    }
    email = email.toLowerCase();

    const bucket = admin.storage().bucket();
    const uploads = await Promise.all(
      files.map(async (file) => {
        const { id, name, type, category } = file;
        const sanitizedEmail = email.replace(/[@.]/g, "_");
        const storagePath = `consultations/${sanitizedEmail}/${category}/${Date.now()}_${name}`;

        const [url] = await bucket.file(storagePath).getSignedUrl({
          version: "v4",
          action: "write",
          expires: Date.now() + 15 * 60 * 1000,
          contentType: type,
        });

        return { id, url, storagePath };
      })
    );

    return { success: true, uploads };
  } catch (error) {
    console.error("Error in getSignedUploadUrls:", error);
    throw new HttpsError("internal", error.message);
  }
});
