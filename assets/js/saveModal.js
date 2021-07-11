function saveModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addContentModal'));
    const stretch = document.getElementById('flexSwitchCheckDefault').checked;
    const image = document.getElementById('formFile').files[0];
    const color = document.getElementById('colorInput').value;

    const cb = (...els) => {
        const data = modal.data;
        let tier_row = document.getElementById(data.tier);

        tier_row.firstChild.classList.remove(`tlm-bgcolor-${data.tier.replace(/^tier-/, '')}`);
        tier_row.firstChild.style.backgroundColor = color;

        els.forEach(el => tier_row.children[1].appendChild(el));

        modal.hide();
    };

    if (image !== undefined) {
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

            cb(img);
        };
        reader.readAsDataURL(image);
    } else {
        cb();
    }
}