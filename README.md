# QR Code Snipper - Chrome Extension

A lightweight Chrome extension to **scan and read QR codes** directly in your browser. Perfect for quickly decoding QR codes from images, screenshots, or web content — no external app needed.

---

## ✨ Features

🔍 Scan and decode QR codes instantly from images.  
🖼️ Upload images or capture QR codes directly from a webpage.  
📋 Copy decoded text, links, or data with one click.  
🌐 Works offline — no server-side processing required.  
🧩 Clean and minimal popup UI for quick access.

---

## 🎥 Demo

https://github.com/user-attachments/assets/81c9c0a6-cfb9-4cd2-a487-e2f6967ba982

---

## 🧩 Installation

### 👉 From Chrome Web Store

> 📥 **Recommended**: Install directly from the Chrome Web Store.

[**➤ Install from Chrome Web Store**](https://chrome.google.com/webstore/detail/YOUR-EXTENSION-ID)

### 💻 Manual Installation (for developers)

1. Clone or download the repository:

   ```bash
   git clone https://github.com/renuthomas/qr-code-snipper.git

   ```

2. Open Chrome and go to chrome://extensions/.

3. Enable Developer Mode (top right toggle).

4. Click Load Unpacked and select the root folder of the extension.

The extension will now appear in your toolbar — ready to use! 🚀

## 📖 How to Use

1. Click the QR Code Snipper icon in the toolbar.
2. Upload an image with a QR code or let the extension detect QR codes on the current webpage.
3. The decoded result (URL, text, or data) will appear in the popup.
4. Copy or open the decoded content in a new tab with a single click.

## 📂 Folder Structure

```bash
qr-code-snipper-extension/
├── manifest.json           # Extension metadata
├── popup.html              # Popup UI for scanning
├── popup.js                # QR code scanning logic
├── popup.css               # Popup styling
├── background.js           # Background tasks
├── snip.js                 # Snip the QR code
├── jsQR.js                 # Read the QR code
├── assets/                 # Extension icons
```

## 🔑 Permissions

This extension uses the following Chrome permissions:

- `activeTab` – to temporarily access the current tab when the user clicks the extension.
- `tabs` – to capture the screen of the current tab and retrieve metadata like title/URL.
- `storage` – to save extension preferences or history of scanned QR codes.
- `scripting` – for injecting scripts if QR detection needs to run inside the page.

## 🛠 Development Notes

- Built with Manifest V3.
- Uses a lightweight JavaScript QR decoding library (**jsQR**).
- Works fully offline for privacy and security.

## 🚀 Future Improvements

✅ Drag-and-drop QR code images into the popup.

📤 Export decoded results as text or JSON.

🎨 Dark mode for the popup UI.

## 📊 Why Choose QR Code Snipper?

Here’s how **QR Code Snipper** compares to other popular Chrome QR code reader extensions:

| Feature                            | QR Code Reader for Google Chrome™           | **QR Code Snipper ✅**           |
| ---------------------------------- | ------------------------------------------- | -------------------------------- |
| 🔍 How does it work                | ❌ Capture the entire web page for QR code  | ✅ Users can snip the QR code    |
| 🌐 Reads QR codes within documents | ❌ Only via upload(should upload the image) | ✅ Direct detection(by snipping) |
| 🔑 Transparent open-source license | ❌ Proprietary                              | ✅ MIT + Apache 2.0 compliant    |

🚀 **Result:** QR Code Snipper is **lighter, faster, and fully private** — no data ever leaves your browser.

## 🙏 Credits & License

This extension uses the open-source library [jsQR](https://github.com/cozmo/jsQR) developed by [cozmo](https://github.com/cozmo).

- **QR Code Snipper** is licensed under the MIT License (see [LICENSE](LICENSE)).
- **jsQR** is licensed under the Apache License 2.0 (see [LICENSE-jsQR](LICENSE-jsQR)).
