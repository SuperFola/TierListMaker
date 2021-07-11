function export2image(evt) {
    const element = document.getElementById('tableBody');

    const posX = 0;
    const posY = 0;
    const width = elementWidth(element) - elementWidth(document.getElementById('settings'));
    const height = elementHeight(element);

    html2canvas(element, {
        width: width,
        height: height,
        useCORS: false,
        taintTest: false,
        allowTaint: true,
        scale: 1.0,
        backgroundColor: 'transparent',
    }).then((canvas) => {
        let context = canvas.getContext('2d');
        let imageData = context.getImageData(posX, posY, width, height).data;
        let outputCanvas = document.createElement('canvas');
        let outputContext = outputCanvas.getContext('2d');
        outputCanvas.width = width;
        outputCanvas.height = height;

        let idata = outputContext.createImageData(width, height);
        idata.data.set(imageData);
        outputContext.putImageData(idata, 0, 0);

        let list = document.getElementById('imageList');
        let item = document.createElement('li');
        let child = document.createElement('a');
        child.setAttribute('href', outputCanvas.toDataURL());
        child.setAttribute('download', 'tierlist.png');
        child.innerText = `TierList no ${list.children.length + 1}`;
        item.appendChild(child);

        list.appendChild(item);
    });
}