# AGA Groups — Website

Simple static website for AGA Groups (construction). This repository contains the frontend site used to showcase projects, services, and contact information.

## Contents
- HTML pages: `index.html`, `about.html`, `projects.html`, `contact.html`, `showcase.html`, etc.
- Styles: `css/style.css`
- Scripts: `js/script.js` (site config, contact form handling, page modules)
- Assets: `images/`, `assets/`

## Local preview
Serve the site from the project root and open a browser:

```bash
# from repository root
python -m http.server 8000
# open http://localhost:8000 in your browser
```

## Notes
- Edit contact details in `js/script.js` under `SITE_CONFIG`.
- Project images are in `images/projects/`.
- The 3D showcase uses Three.js; keep `three.min.js` and `OrbitControls.js` references in `showcase.html`.

## Contributing
Small content changes can be edited directly in the files. To push updates:

```bash
git add -A
git commit -m "Update site"
git push
```

## Contact
For any questions about the site, contact `agagroupshosur@gmail.com` or the manager listed on the About page.

---
Generated from the workspace on 2026-06-07.
