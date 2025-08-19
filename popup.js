document.getElementById("snip-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      files: ["snip.js"],
    })
    .then(() => {
      console.log("script inserted successfully");
    });
});

function addResultItem(text) {
  const resultDiv = document.getElementById("result");

  const item = document.createElement("div");
  item.className = "item";

  const textSpan = document.createElement("span");
  textSpan.className = "text";
  textSpan.textContent = text;
  textSpan.title = text;

  const copyIcon = document.createElement("i");
  copyIcon.className = "fas fa-copy icon";
  copyIcon.title = "Copy";
  copyIcon.onclick = () => {
    navigator.clipboard.writeText(text);
    copyIcon.className = "fas fa-check icon";
    copyIcon.title = "Copied successfully";
    setTimeout(() => {
      copyIcon.className = "fas fa-copy icon";
      copyIcon.title = "Copy";
    }, 2000);
  };

  item.appendChild(textSpan);
  item.appendChild(copyIcon);
  resultDiv.appendChild(item);
}

chrome.storage.local.get("snippedQR", (result) => {
  console.log("QR from storage:", result.snippedQR);
  const resultelement = document.getElementById("result");
  const resultitems = result?.snippedQR?.length;
  if (resultitems > 0) {
    resultelement.textContent = "";
    result.snippedQR.forEach((element) => {
      addResultItem(element);
    });
  }
});
