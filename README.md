# Aashish Sahu Personal Website

This folder contains your GitHub Pages personal website.

It is built from your CV and includes:

- Your profile photo
- Robotics and UAV-focused homepage
- Skills section
- Selected projects
- Publications, patents, and awards summary
- CV download button
- Reserved space for a future intro video

## Very Important

When uploading to GitHub, upload the files **inside** this folder.

Your GitHub repository root should look like this:

```text
assets/
index.html
styles.css
script.js
README.md
.nojekyll
```

Do not upload it like this:

```text
site/
  index.html
  styles.css
  script.js
```

If `index.html` is inside a `site` folder, GitHub Pages will show a 404 page.

## Step-by-Step GitHub Upload

1. Open your GitHub repository:
   `aashish110.github.io`

2. Go to the main page of the repository.

3. If you already see a `site` folder, delete it later after the new upload works.

4. Click **Add file**.

5. Click **Upload files**.

6. Open this folder on your computer:
   `outputs/site`

7. Select everything inside it:
   `assets`, `index.html`, `styles.css`, `script.js`, `README.md`, `.nojekyll`

8. Drag those selected files and folders into GitHub.

9. Click **Commit changes**.

10. Go to **Settings > Pages**.

11. Use these settings:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

12. Wait 2-10 minutes.

13. Open:
   `https://aashish110.github.io`

## How To Add Your Video Later

1. Rename your video file to:

```text
aashish-intro.mp4
```

2. Upload it inside the `assets` folder.

3. Keep the file path exactly like this:

```text
assets/aashish-intro.mp4
```

4. Commit the change.

The website will automatically show the video player when that file exists.

## Things You May Want To Edit

- In `index.html`, update the LinkedIn URL if your actual LinkedIn profile link is different.
- In `index.html`, update the GitHub URL if your username casing is different.
- If you do not want your full CV public, remove `assets/cv-aashish-sahu-2026.pdf` and remove the CV links from `index.html`.
- If you want your phone number hidden, make a public version of the CV before uploading.

## Files

- `index.html` - website content
- `styles.css` - design and layout
- `script.js` - copy email button and automatic video loading
- `assets/aashish-sahu.png` - your profile photo
- `assets/cv-aashish-sahu-2026.pdf` - your CV
- `.nojekyll` - tells GitHub Pages to publish the files as plain static files
