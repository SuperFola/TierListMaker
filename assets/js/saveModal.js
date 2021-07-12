function saveModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addContentModal'));
    const data = modal.data;
    let tier_row = document.getElementById(data.tier);

    const stretch = document.getElementById('flexSwitchCheckDefault').checked;
    const color = document.getElementById('colorInput').value;
    const files = document.getElementById('formFile').files;

    tier_row.firstChild.classList.remove(`tlm-bgcolor-${data.tier.replace(/^tier-/, '')}`);
    tier_row.firstChild.style.backgroundColor = color;

    files.forEach(image => {
        const reader = new FileReader();
        reader.onload = (e) => {
            let img = document.createElement('img');
            img.src = e.target.result;
            img.height = 128;
            if (stretch)
                img.width = 128;
            img.setAttribute('id', stringToHash(img.src));
            img.setAttribute('draggable', 'true');

            img.addEventListener('click', (ev) => {
                ev.target.parentElement.removeChild(ev.target);
            });
            img.addEventListener('dragstart', (ev) => {
                ev.dataTransfer.setData('text/plain', ev.target.id);
            });

            tier_row.children[1].appendChild(img);
        };
        reader.readAsDataURL(image);
    });

    modal.hide();
}