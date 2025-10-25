(function waitForSpicetify() {
  if (!Spicetify?.Player?.origin?._state) {
    setTimeout(waitForSpicetify, 100);
    return;
  }

  const SpicetifyOrigin = Spicetify.Player.origin;

  function handleRotate() {
    const img = document.querySelector('a[data-testid="context-link"] img');
    if (!img) return;
    
    const isPaused = SpicetifyOrigin._state.isPaused;
    img.style.setProperty("animation-play-state", isPaused ? "paused" : "running");
  }

  // MutationObserver watches for sidebar appearance
  const observer = new MutationObserver(() => {
    const img = document.querySelector('a[data-testid="context-link"] img');
    if (img && !img.dataset.rotateAttached) {
      img.dataset.rotateAttached = "true";
      handleRotate();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  Spicetify.Player.addEventListener("onplaypause", handleRotate);
  Spicetify.Player.addEventListener("songchange", () => setTimeout(handleRotate, 500));
})();