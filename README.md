# Aashish Sahu Personal Website

This folder contains your GitHub Pages personal website.

It is built from your CV and includes:

- Your profile photo
- Interactive drone flying animation while scrolling
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

## How To Add Your Videos Later

The website now has space for:

- One personal introduction video
- Four research experiment videos

### Option A: Upload MP4 Files To GitHub

Use this only for small videos. Very large videos are better on YouTube.

1. Rename your videos to these filenames:

```text
aashish-intro.mp4
uav-swarm-payload.mp4
passenger-drone.mp4
hybrid-drone-quadruped.mp4
robotics-prototypes.mp4
```

2. Upload them inside this folder:

```text
assets/videos/
```

3. The final paths should look like this:

```text
assets/videos/aashish-intro.mp4
assets/videos/uav-swarm-payload.mp4
assets/videos/passenger-drone.mp4
assets/videos/hybrid-drone-quadruped.mp4
assets/videos/robotics-prototypes.mp4
```

4. Commit changes.

The website will automatically replace the placeholders with video players.

### Option B: Use YouTube Links

Use this for many videos or large video files.

1. Upload your video to YouTube.
2. Set it as **Unlisted** if you do not want it searchable.
3. Click **Share > Embed**.
4. Copy the embed URL. It usually looks like:

```text
https://www.youtube.com/embed/VIDEO_ID
```

5. Send the link here, or paste it into the matching `data-youtube=""` field in `index.html`.

## Things You May Want To Edit

- In `index.html`, update the LinkedIn URL if your actual LinkedIn profile link is different.
- In `index.html`, update the GitHub URL if your username casing is different.
- If you do not want your full CV public, remove `assets/cv-aashish-sahu-2026.pdf` and remove the CV links from `index.html`.
- If you want your phone number hidden, make a public version of the CV before uploading.

## Files

- `index.html` - website content
- `styles.css` - design and layout
- `script.js` - copy email button, drone scroll animation, and automatic video loading
- `assets/aashish-sahu.png` - your profile photo
- `assets/cv-aashish-sahu-2026.pdf` - your CV
- `assets/videos/` - your research experiment videos
- `.nojekyll` - tells GitHub Pages to publish the files as plain static files
