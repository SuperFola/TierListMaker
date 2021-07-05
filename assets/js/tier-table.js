const tiers = [
    'S',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
]

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
}

function moveRowDown(row_id, table_id) {
    const table = document.getElementById(table_id);
    const row = document.getElementById(row_id);
    const next = row.nextSibling?.nextSibling;

    if (next === null) {
        return;
    }

    row.parentElement.removeChild(row);
    table.insertBefore(row, next);
}

function editRow(row_id, table_id) {}

function createSettingsTd(row_id, table_id) {
    let edit = createFAElement('fas', 'fa-edit');
    edit.addEventListener('click', () => editRow(row_id, table_id));
    let go_up = createFAElement('fas', 'fa-level-up-alt');
    go_up.addEventListener('click', () => moveRowUp(row_id, table_id));
    let go_down = createFAElement('fas', 'fa-level-down-alt');
    go_down.addEventListener('click', () => moveRowDown(row_id, table_id));

    let container = document.createElement('td');
    [edit, go_up, go_down].forEach((el, idx, max) => {
        el.classList.add('tlm-pointer');
        container.appendChild(el);
        if (idx !== max - 1)
            container.appendChild(spacing());
    });
    container.classList.add('text-center');

    return container;
}

function generateTable(identifier, count=-1) {
    if (count === -1) {
        count = tiers.length;
    }

    const table_body = document.getElementById(identifier);
    table_body.innerHTML = '';

    tiers.forEach((value, index) => {
        // early return if we displayed enough
        if (index >= count)
            return;

        const row_name = value.toLowerCase();
        const row_identifier = `tier-${row_name}`;

        const tier_th = document.createElement('th');
        tier_th.setAttribute('scope', 'row');
        tier_th.classList.add(`tlm-bgcolor-${row_name}`, 'text-center', 'align-middle');
        tier_th.innerText = value;

        const content = document.createElement('td');
        const settings = createSettingsTd(row_identifier, identifier);

        const row = document.createElement('tr');
        row.setAttribute('id', row_identifier);
        row.appendChild(tier_th);
        row.appendChild(content);
        row.appendChild(settings);

        table_body.appendChild(row);
    });
}