export function loadStyles(filePath) {
 return new Promise((resolve, reject) => {
  if (document.querySelector(`link[href="${filePath}"]`)) {
   resolve();
   return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = filePath;
  link.onload = () => {
   resolve();
  };
  link.onerror = () => {
   reject(new Error(`Failed to load stylesheet: ${filePath}`));
  };

  document.head.appendChild(link);
 });
}
