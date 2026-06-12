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
