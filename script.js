const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const copyButton = document.querySelector("[data-copy-email]");

if (copyButton) {
  const originalText = copyButton.textContent.trim();

  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.copyEmail;

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1600);
    } catch {
      copyButton.textContent = email;
    }
  });
}

const videoMount = document.querySelector("#profile-video");

if (videoMount) {
  const videoSrc = videoMount.dataset.videoSrc;
  const poster = videoMount.dataset.videoPoster;

  fetch(videoSrc, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) {
        return;
      }

      const video = document.createElement("video");
      video.controls = true;
      video.preload = "metadata";
      video.poster = poster;
      video.setAttribute("aria-label", "Aashish Sahu profile video");

      const source = document.createElement("source");
      source.src = videoSrc;
      source.type = "video/mp4";

      video.append(source);
      videoMount.replaceChildren(video);
      videoMount.classList.add("has-video");
    })
    .catch(() => {});
}
