function export2image(evt) {
  const element = document.getElementById("tableBody");

  const posX = 0;
  const posY = 0;
  const width =
    elementWidth(element) - elementWidth(document.getElementById("settings"));
  const height = elementHeight(element);

  html2canvas(element, {
    width: width,
    height: height,
    useCORS: false,
    taintTest: false,
    allowTaint: true,
    scale: 1.0,
    backgroundColor: "transparent",
  }).then((canvas) => {
    let context = canvas.getContext("2d");
    let imageData = context.getImageData(posX, posY, width, height).data;
    let outputCanvas = document.createElement("canvas");
    let outputContext = outputCanvas.getContext("2d");
    outputCanvas.width = width;
    outputCanvas.height = height;

    let idata = outputContext.createImageData(width, height);
    idata.data.set(imageData);
    outputContext.putImageData(idata, 0, 0);

    let a = document.createElement("a");
    a.setAttribute("href", outputCanvas.toDataURL());
    a.setAttribute("download", "tierlist.png");
    a.click();
  });
}
