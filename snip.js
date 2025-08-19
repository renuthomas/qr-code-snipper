(async () => {
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 999999,
    cursor: "crosshair",
  });
  document.body.appendChild(overlay);

  let startX, startY, endX, endY, selectionBox;

  const onMouseDown = (e) => {
    startX = e.clientX;
    startY = e.clientY;

    selectionBox = document.createElement("div");
    Object.assign(selectionBox.style, {
      position: "fixed",
      border: "2px dashed black",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      zIndex: 9999999,
      pointerEvents: "none",
    });
    document.body.appendChild(selectionBox);

    overlay.addEventListener("mousemove", onMouseMove);
    overlay.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    endX = e.clientX;
    endY = e.clientY;

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    Object.assign(selectionBox.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    });
  };

  const onMouseUp = () => {
    overlay.removeEventListener("mousemove", onMouseMove);
    overlay.removeEventListener("mouseup", onMouseUp);
    overlay.remove();
    const rect = selectionBox.getBoundingClientRect();
    selectionBox.remove();

    const scale = window.devicePixelRatio || 1;
    const safeRect = {
      left: Math.round(rect.left * scale),
      top: Math.round(rect.top * scale),
      width: Math.max(1, Math.round(rect.width * scale)),
      height: Math.max(1, Math.round(rect.height * scale)),
    };

    console.log("Selected area:", safeRect);

    chrome.runtime.sendMessage({
      type: "CAPTURE",
      rect: safeRect,
    });
  };

  overlay.addEventListener("mousedown", onMouseDown);
})();
