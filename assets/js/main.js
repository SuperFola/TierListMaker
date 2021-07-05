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
            if (stretch) {
                img.width = img.height = 128;
            } else {
                img.height = 128;
            }
            img.addEventListener('click', (ev) => {
                ev.target.parentElement.removeChild(ev.target);
            });

            cb(img);
        };
        reader.readAsDataURL(image);
    } else {
        cb();
    }
}


document.onreadystatechange = () => {
    if (document.readyState !== 'complete') {
        return;
    }

    const selectRowCount = document.getElementById('selectRowCount');

    selectRowCount.addEventListener('change', (evt) => {
        const selected = parseInt(evt.target.value);
        generateTable('tableBody', selected);
    });

    tiers.forEach((name, idx, max) => {
        const position = idx + 1;

        let option = document.createElement('option');
        option.setAttribute('value', position.toString());
        option.innerText = `${name} - ${position}`;
        selectRowCount.appendChild(option);
    });
    selectRowCount.selectedIndex = tiers.length - 1;
    generateTable('tableBody');

    new bootstrap.Modal(document.getElementById('addContentModal'));

    document.getElementById('addContentModalSaveBtn').addEventListener('click', saveModal);
};