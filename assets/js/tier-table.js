const tiers = [
    'S',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
];

const spacing = () => {
    let span = document.createElement('span');
    span.innerHTML = '&nbsp';
    return span;
};

function createFAElement(kind, name) {
    let icon = document.createElement('i');
    icon.classList.add(kind, name);

    let element = document.createElement('span');
    element.classList.add('icon');
    element.appendChild(icon);

    return element;
}

function tierNumberFromId(tier_id) {
    const suffix = tier_id.replace(/^tier-/, '');
    const id = tiers
        .map((value, idx) => [value.toLowerCase(), idx])
        .filter((tuple) => {
            const [value, _] = tuple;
            return value === suffix;
        })[0][1];

    return id;
}

function moveRowUp(row_id, table_id) {
    const table = document.getElementById(table_id);
    const row = document.getElementById(row_id);
    const previous = row.previousSibling;

    if (previous === null) {
        return;
    }

    row.parentElement.removeChild(row);
    table.insertBefore(row, previous);
    updateTierNames();
}

function moveRowDown(row_id, table_id) {
    const table = document.getElementById(table_id);
    const row = document.getElementById(row_id);

    const next = row.nextSibling?.nextSibling;
    if (next !== null) {
        row.parentElement.removeChild(row);
        table.insertBefore(row, next);
    } else if (row.nextSibling !== null && next === null) {
        row.parentElement.removeChild(row);
        table.appendChild(row);
    }
    updateTierNames();
}

function updateTierNames() {
    const rows = document.querySelectorAll('#tableBody tr');
    rows.forEach((row, index) => {
        const tierHeader = row.querySelector('th');
        const tierNameInput = document.getElementById(`tierName${index}`);
        if (tierHeader && tierNameInput) {
            tierNameInput.value = tierHeader.innerText;
        }
    });
}

function addElementInRow(row_id, table_id) {
    const tier = document.getElementById(row_id).firstChild.innerText;
    document.getElementById('addContentModalTitle').innerText = `Add content to tier ${tier}`;

    const tier_color = window.getComputedStyle(document.getElementById(row_id).firstChild)
        .getPropertyValue('background-color')
        .replace(/^rgb/, '')
        .replace('(', '')
        .replace(')', '')
        .split(', ')
        .map(value => parseInt(value).toString(16))
        .join('')
        .replace(/.+/, '#$&');
    document.getElementById('colorInput').value = tier_color;

    const el = document.getElementById('addContentModal');
    const modal = bootstrap.Modal.getInstance(el);

    modal.data = {
        color: tier_color,
        tier: row_id,
    };

    modal.toggle();
}

function createSettingsTd(row_id, table_id) {
    let add = createFAElement('fas', 'fa-plus');
    add.addEventListener('click', () => addElementInRow(row_id, table_id));
    let go_up = createFAElement('fas', 'fa-level-up-alt');
    go_up.addEventListener('click', () => moveRowUp(row_id, table_id));
    let go_down = createFAElement('fas', 'fa-level-down-alt');
    go_down.addEventListener('click', () => moveRowDown(row_id, table_id));

    let container = document.createElement('td');
    [add, go_up, go_down].forEach((el, idx, max) => {
        el.classList.add('tlm-pointer');
        container.appendChild(el);
        if (idx !== max - 1)
            container.appendChild(spacing());
    });
    container.classList.add('text-center');

    return container;
}

function generateTable(identifier, count = -1) {
    if (count === -1) {
        count = tiers.length;
    }

    const table_body = document.getElementById(identifier);
    table_body.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const tierNameInput = document.getElementById(`tierName${i}`);
        const value = tierNameInput && tierNameInput.value !== '' ? tierNameInput.value : tiers[i];
        const row_name = tiers[i].toLowerCase();
        const row_identifier = `tier-${row_name}`;

        const tier_th = document.createElement('th');
        tier_th.setAttribute('scope', 'row');
        tier_th.classList.add(`tlm-bgcolor-${row_name}`, 'text-center', 'align-middle');
        tier_th.innerText = value;

        let fake_input = document.createElement('input');
        fake_input.type = 'file';
        fake_input.accept = 'image/*';
        fake_input.multiple = true;
        fake_input.addEventListener('change', () => {
            toArray(fake_input.files).forEach((img) => {
                loadImageAndAddToDOM(img, false, (el) => {
                    content.appendChild(el);
                });
            });
        });

        const content = document.createElement('td');
        ['enter', 'over', 'leave'].forEach(name => {
            content.addEventListener(`drag${name}`, preventDefault, false);
        });
        content.addEventListener('drop', (ev) => {
            preventDefault(ev);

            const files = toArray(ev.dataTransfer.files);
            if (files.length !== 0) {
                files.forEach((img) => {
                    loadImageAndAddToDOM(img, false, (el) => {
                        content.appendChild(el);
                    });
                });
            } else {
                const id = ev.dataTransfer.getData('text');
                const el = document.getElementById(id);
                const drop_zone = ev.target;
                drop_zone.appendChild(el);
            }
        }, false);

        const settings = createSettingsTd(row_identifier, identifier);

        const row = document.createElement('tr');
        row.setAttribute('id', row_identifier);
        row.appendChild(tier_th);
        row.appendChild(content);
        row.appendChild(settings);

        table_body.appendChild(row);
    }
    updateTierNames();
}