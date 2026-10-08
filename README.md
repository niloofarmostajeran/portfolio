# Niloufar Mostajeran — bilingual portfolio

A complete cream-and-sage portfolio for product and analyst job applications. The site is static: no installation, build command, backend, API key or external font service is needed. It works from the root of a domain and from a GitHub Pages repository subdirectory.

## Preview

Open `index.html` in a current browser. For a local web preview, run `python -m http.server 8000` from this folder, then visit `http://localhost:8000`.

First-time visitors see Persian by default, regardless of their browser language. Returning visitors keep their saved language choice. Share `?lang=en` or `?lang=fa` to select a language explicitly. EN / فا changes the entire layout and content, including CV downloads, dialog text and accessible labels.

## Publish on Cloudflare Pages

1. In Cloudflare, open **Workers & Pages** and create a **Pages** project with **Direct Upload**.
2. Upload the supplied deployment ZIP, or this folder. `index.html` must be at the top level, alongside both stylesheets, all three scripts and `assets/`.
3. Deploy. There is no build step.

Use the Pages upload workflow; a Cloudflare Worker is unnecessary for this site. See [Cloudflare’s Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## Publish on GitHub Pages

1. Create a repository and upload the contents of this folder to its root. Include `assets/` and the empty `.nojekyll` file.
2. Open **Settings → Pages**. Choose **Deploy from a branch**, your branch (usually `main`), and **/ (root)**. Save.
3. Open the published URL shown by GitHub. Relative asset paths support both `username.github.io` and `username.github.io/repository/`.

See [GitHub’s publishing source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Edit

- `content.js`: all English and Persian content, experience, education, skills, courses and research summaries.
- `styles.css`: colors, typography, responsive layouts and motion styling.
- `app.js`: language preferences, navigation, accessible research dialogs, perspective interactions and copy-email feedback.
- `visuals.js`: the four explanatory diagrams and the interactive triangulated background.
- `enhancements.css`: the visual narratives, perspective strip and enhanced motion styling.
- `assets/portrait.webp`: your supplied photograph, compressed without altering its content.
- `assets/cv/`: the English and Persian PDF CVs. Replace these files when updating your résumé.

Contact details also appear in `index.html` and `app.js` for links and copying. Update these together when changing your email, phone or LinkedIn URL.

## Design & motion

The design uses spacious editorial composition, an arched gallery portrait, fine rules and a restrained sage palette. English headings use **Instrument Serif**, paired with **Manrope** for interface and body text. Persian headings use **Estedad**, with **Vazirmatn** body text. All fonts are compressed WOFF2 assets served locally; their Open Font Licenses are included in `assets/fonts/`.

The hero and contact section use an original triangulated field inspired by the connected background in [The Evolution of Trust](https://hamed.github.io/trust/). A Bowyer–Watson triangulation creates an irregular network; its points drift and respond to pointer movement, and a click or touch sends a spring-driven wave through the triangles. No source code, characters or assets from the reference were copied.

The four research diagrams explain their respective subjects:

- **Algorithmic decisions:** source documents pass through a model toward a balance representing human judgment; model cells pulse and the balance gently weighs alternatives.
- **Knowledge sharing:** creation, storage, transfer and application connect through a generative AI hub; signals circulate and each process activates in sequence.
- **Personalization and trust:** preferences connect to a person and a relevant recommendation, with a trust shield and a highlighted choice.
- **Deep learning:** multiple neural layers activate from input to output, with a return path for backpropagation.

All diagram labels switch between Persian and English. The diagrams also appear in the expanded research views. Their animation pauses when they leave the viewport. A new **People / Process / Data** strip lets visitors explore three perspectives grounded in the CV using mouse hover, click, keyboard focus or touch. The headline unfolds with a drawn underline, while the portrait and diagram surfaces respond with restrained depth.

The motion control pauses movement and reveals all content. The initial setting respects `prefers-reduced-motion`; an explicit user preference is saved locally. Each canvas stops rendering when its section is out of view or the browser tab is hidden, caps pixel density, and limits frame rate on phones. Touch input does not capture the pointer or prevent scrolling. Research dialogs support keyboard focus, Escape and focus restoration. Native course disclosures and visible keyboard focus are included.

## Content fidelity

The supplied English and Persian LaTeX CVs are the source. The four projects are presented as academic research; no shipped products, business metrics or downloadable project reports have been invented. Python remains marked as beginner-level. The HR/accounting overlap is preserved. Persian dates retain the Solar Hijri calendar, and the English dates retain the supplied paired Gregorian months. English name spelling uses the user’s correction: Niloufar Mostajeran.

The site is ready for publication but is not deployed to a public account. The ZIP contains only this folder’s deployable contents, with `index.html` at the archive root.

Font sources: [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), [Estedad](https://github.com/google/fonts/tree/main/ofl/estedad), [Vazirmatn](https://github.com/rastikerdar/vazirmatn).
