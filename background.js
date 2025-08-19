importScripts("jsQR.js");

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "CAPTURE") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, async (dataUrl) => {
      try {
        const blob = await fetch(dataUrl).then((r) => r.blob());
        const bitmap = await createImageBitmap(blob);

        const rect = sanitizeRect(message.rect, bitmap.width, bitmap.height);

        const canvas = new OffscreenCanvas(rect.width, rect.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          bitmap,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          0,
          0,
          rect.width,
          rect.height
        );
        console.log("Canvas size:", canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log("ImageData OK:", imageData.width, imageData.height);
        console.log("jsQR available?", typeof jsQR); // should be 'function'
        /*canvas.convertToBlob().then((blob) => {
          const url = URL.createObjectURL(blob);
          chrome.tabs.create({ url });
        });*/

        const code = jsQR(imageData.data, imageData.width, imageData.height);
        console.log("jsQR executed");

        if (code) {
          console.log("QR Code data:", code.data);
          chrome.storage.local.get("snippedQR", (result) => {
            let qrdata = result.snippedQR || [];

            if (!Array.isArray(qrdata)) {
              console.warn(
                `Data for key '${qrdata}' is not an array. Overwriting with new array.`
              );
              qrdata = [];
            }

            qrdata.push(code.data);
            chrome.storage.local.set({ snippedQR: qrdata });
          });

          /*chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "QR Code Decoded",
            message: code.data,
          });*/
        } else {
          console.log("No QR code found.");
          /*chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "QR Code",
            message: "No QR code found in the selected region.",
          });*/
        }
      } catch (err) {
        console.error("Error decoding QR:", err);
      }
    });
  }
});

function sanitizeRect(rect, imageWidth, imageHeight) {
  const x = Math.max(0, Math.min(rect.left, imageWidth - 1));
  const y = Math.max(0, Math.min(rect.top, imageHeight - 1));
  const width = Math.max(1, Math.min(rect.width, imageWidth - x));
  const height = Math.max(1, Math.min(rect.height, imageHeight - y));
  return { x, y, width, height };
}
