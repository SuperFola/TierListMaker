document.onreadystatechange = () => {
  if (document.readyState !== "complete") {
    return;
  }

  generateTable("tableBody");

  document.getElementById("btn-export").addEventListener("click", export2image);

  new bootstrap.Modal(document.getElementById("addContentModal"));
  document
    .getElementById("addContentModalSaveBtn")
    .addEventListener("click", saveModal);
  document.getElementById("addRowButton").addEventListener("click", addRow);
};
