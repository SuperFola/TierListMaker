function generateTierNameInputs(count) {
    const tierNamesContainer = document.getElementById('tierNames');
    tierNamesContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group', 'mb-2');

        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('form-control');
        input.id = `tierName${i}`;
        input.placeholder = `Tier ${i + 1} name`;

        input.addEventListener('input', () => {
            updateTierName(i, input.value);
        });

        inputGroup.appendChild(input);
        tierNamesContainer.appendChild(inputGroup);
    }
    updateTierNames();
}

function updateTierName(index, newName) {
    const rows = document.querySelectorAll('#tableBody tr');
    if (rows[index]) {
        const tierHeader = rows[index].querySelector('th');
        if (tierHeader) {
            tierHeader.innerText = newName;
        }
    }
}

document.onreadystatechange = () => {
    if (document.readyState !== 'complete') {
        return;
    }

    const selectRowCount = document.getElementById('selectRowCount');

    selectRowCount.addEventListener('change', (evt) => {
        const selected = parseInt(evt.target.value);
        generateTierNameInputs(selected);
        generateTable('tableBody', selected);
    });

    tiers.forEach((name, idx) => {
        const position = idx + 1;

        let option = document.createElement('option');
        option.setAttribute('value', position.toString());
        option.innerText = `${position}`;
        selectRowCount.appendChild(option);
    });
    selectRowCount.selectedIndex = tiers.length - 1;
    
    generateTierNameInputs(tiers.length);
    generateTable('tableBody');

    document.getElementById('btn-export').addEventListener('click', export2image);

    new bootstrap.Modal(document.getElementById('addContentModal'));
    document.getElementById('addContentModalSaveBtn').addEventListener('click', saveModal);
};