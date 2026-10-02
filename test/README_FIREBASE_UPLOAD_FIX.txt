PLYWOOD FIREBASE IMAGE UPLOAD FIX

1. Cloud Storage for Firebase requires the Blaze plan as of February 3, 2026.
2. Verify the Storage bucket in Firebase Console -> Storage -> Files. This project currently uses ecommercewebsite-17aef.appspot.com.
3. From this folder run:

gcloud auth login
gcloud storage buckets update gs://ecommercewebsite-17aef.appspot.com --cors-file=cors.json

4. Verify CORS:
gcloud storage buckets describe gs://ecommercewebsite-17aef.appspot.com --format="default(cors_config)"

5. Deploy storage.rules with Firebase CLI:
firebase login
firebase use ecommercewebsite-17aef
firebase deploy --only storage

The new upload path is listingImages/{USER_UID}/{timestamp}-{filename}. Only the authenticated owner can write to that folder. The CORS file does not list OPTIONS; Google Cloud Storage handles browser preflight.
