# Gomzi Export — V2

A responsive homepage in Gomzi green (`#99c229`), with internal routes ready for future content. Supplied as a standalone source project; nothing has been pushed or deployed.

## Run locally

Install Node.js 22.12 or newer. From this folder:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To run the optional API, open a second terminal:

```sh
npm run dev:backend
```

Validation and production build:

```sh
npm run build
npm test
```

The frontend build is written to `frontend/dist`. Use a host with SPA fallback routing. `vercel.json` and `frontend/public/_redirects` include frontend routing examples. The backend runs separately with `npm start`; configure its environment from `backend/.env.example`.

## Structure

- `frontend/src/components`: shared navigation, footer, buttons and enquiry dialog.
- `frontend/src/sections`: homepage sections, including the original main-branch map.
- `frontend/src/pages`: route shells and contact/catalogue pages.
- `frontend/src/data`: company details, routes, markets and certificate lists.
- `frontend/src/styles`: theme, responsive layouts and map styles.
- `frontend/public/assets`: brand images, certificates, fonts and reserved video folder.
- `backend/src`: Express API, routes, controllers and middleware.
- `backend/test`: API checks.

## Replace these before launch

1. **Video:** add your film to `frontend/public/assets/video/`, then set `heroVideo` and optional `heroPoster` in `frontend/src/data/site.ts`. Until then, the full-screen hero reserves the video area.
2. **Client logos:** replace the six labelled placeholders in `frontend/src/sections/Clients.tsx` with approved Gomzi client artwork.
3. **GPSR:** the designed badge at `frontend/public/assets/certifications/gpsr-placeholder.svg` is clearly marked “Artwork pending”. Replace it with approved artwork and update `Certifications.tsx` when available. It is not a generated certificate.
4. **Page content:** navigation, all six Expertise entries, Blog and footer links have internal routes. Secondary pages intentionally use content shells; complete them after approval.
5. **Contact details:** centrally editable in `frontend/src/data/site.ts`.

## Enquiries

The enquiry dialog prepares an email draft and supports copying the details. It does not send or save a lead by itself. WhatsApp opens the company contact. The API exposes health and capabilities endpoints; `POST /api/inquiries` intentionally returns 503 until a durable email/CRM delivery service is configured. Do not treat this endpoint as live lead capture yet.

## Source and handoff

Company copy and the downloadable catalogue use the supplied Gomzi company-profile PDF. Logo, factory photo, certificate images and interactive map originate from the existing Gomzi Export main branch. The Bliss source was used as a layout reference; Bliss client logos and contact details are not included. The Inter font licence is bundled with its assets.

Unzip into your V2 working folder and review changes in Antigravity. Preserve that folder’s existing `.git` and private `.env` files. The archive contains neither repository history nor credentials. Check company claims, certification artwork, contact details and final content with management before publishing.

## Validation completed

TypeScript and Vite production build passed. All six backend tests passed. Desktop browser checks covered asset loading, navigation dropdowns and route rendering. Responsive styles include tablet and phone breakpoints; perform a final check on your own target phones before launch.
