# Kunjbihari — Portfolio

Personal portfolio of **Kunjbihari**, Associate Consultant & Engineer at NRI.
Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.

## Files

```
index.html        Home page (About, Experience, Education, Projects, Research, Hobbies, Contact)
blogs.html        Blogs & Vlogs page (coming soon)
css/style.css     Styles for the home page
css/blogs.css     Styles for the Blogs & Vlogs page
js/main.js        Spotlight, cursor, live clock, terminal, contact form, résumé button, confetti
assets/           Yaitro logo and icon (add your résumé PDF here)
```

## Run it locally

Open `index.html` in your browser. That's it.

## Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy on Hostinger

**Option A — upload the files**
1. hPanel → **Websites** → your domain → **File Manager**.
2. Open `public_html` and delete the default `default.php` / `index.php` if present.
3. Upload everything from this folder (keep the `css`, `js` and `assets` folders as they are).
4. Visit your domain.

**Option B — deploy straight from GitHub**
1. hPanel → **Advanced** → **Git**.
2. Paste your repository URL, branch `main`, install path empty (deploys to `public_html`).
3. Click **Create**, then **Deploy**. Turn on **Auto deployment** to redeploy on every push.

## Common edits

**Add your résumé**
1. Put the PDF at `assets/Kunjbihari-Resume.pdf`.
2. In `js/main.js`, set:
   ```js
   var RESUME_URL = 'assets/Kunjbihari-Resume.pdf';
   ```

**Change the contact form email** — in `js/main.js`, edit `CONTACT_EMAIL`.
The form currently opens the visitor's email app with the message filled in.
To receive messages directly in your inbox, create a free form at formspree.io and
send the form data to your Formspree endpoint instead.

**Add a blog or vlog** — edit the "Coming soon" cards in `blogs.html`: swap the
skeleton lines for your title and wrap the card in `<a href="your-link">…</a>`.

**Terminal commands** — edit the `R` object in `js/main.js` to add or change answers.
