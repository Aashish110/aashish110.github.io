const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const scrollDrone = document.querySelector("[data-scroll-drone]");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const droneWaypoints = [
  { x: 0.82, y: 0.18, tilt: -7 },
  { x: 0.16, y: 0.28, tilt: -14 },
  { x: 0.74, y: 0.43, tilt: 12 },
  { x: 0.28, y: 0.58, tilt: -10 },
  { x: 0.86, y: 0.72, tilt: 9 },
  { x: 0.2, y: 0.24, tilt: -8 },
];
let droneTicking = false;

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function smoothstep(amount) {
  return amount * amount * (3 - 2 * amount);
}

function updateDroneFlight() {
  droneTicking = false;

  if (!scrollDrone || motionQuery.matches) {
    return;
  }

  const root = document.documentElement;
  const scrollRange = root.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  const segmentCount = droneWaypoints.length - 1;
  const rawSegment = Math.min(progress * segmentCount, segmentCount - 0.001);
  const segmentIndex = Math.floor(rawSegment);
  const localProgress = smoothstep(rawSegment - segmentIndex);
  const current = droneWaypoints[segmentIndex];
  const next = droneWaypoints[segmentIndex + 1];
  const drift = Math.sin(progress * Math.PI * 8) * 0.035;
  const x = lerp(current.x, next.x, localProgress);
  const y = lerp(current.y, next.y, localProgress) + drift;
  const tilt = lerp(current.tilt, next.tilt, localProgress);
  const scale = window.innerWidth < 680 ? 0.72 : 1;

  root.style.setProperty("--drone-x", `${Math.round(x * 100)}vw`);
  root.style.setProperty("--drone-y", `${Math.round(y * 100)}vh`);
  root.style.setProperty("--drone-tilt", `${tilt.toFixed(1)}deg`);
  root.style.setProperty("--drone-scale", scale.toString());
  root.style.setProperty("--trail-opacity", `${0.38 + Math.abs(Math.sin(progress * Math.PI * 4)) * 0.36}`);
}

function requestDroneFlightUpdate() {
  if (droneTicking) {
    return;
  }

  droneTicking = true;
  window.requestAnimationFrame(updateDroneFlight);
}

if (scrollDrone) {
  updateDroneFlight();
  window.addEventListener("scroll", requestDroneFlightUpdate, { passive: true });
  window.addEventListener("resize", requestDroneFlightUpdate);
  motionQuery.addEventListener("change", updateDroneFlight);
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

const videoFrames = document.querySelectorAll("[data-video-src], [data-youtube]");

function mountYoutube(frame, url) {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.title = frame.dataset.videoLabel || "Research video";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  frame.replaceChildren(iframe);
  frame.classList.add("has-video");
}

function mountMp4(frame, videoSrc) {
  fetch(videoSrc, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) {
        return;
      }

      const video = document.createElement("video");
      video.controls = true;
      video.preload = "metadata";
      video.poster = frame.dataset.videoPoster;
      video.setAttribute("aria-label", frame.dataset.videoLabel || "Research video");

      const source = document.createElement("source");
      source.src = videoSrc;
      source.type = "video/mp4";

      video.append(source);
      frame.replaceChildren(video);
      frame.classList.add("has-video");
    })
    .catch(() => {});
}

videoFrames.forEach((frame) => {
  const youtubeUrl = frame.dataset.youtube;
  const videoSrc = frame.dataset.videoSrc;

  if (youtubeUrl) {
    mountYoutube(frame, youtubeUrl);
    return;
  }

  if (videoSrc) {
    mountMp4(frame, videoSrc);
  }
});
