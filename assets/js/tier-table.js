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

function moveRowUp(row_id) {}

function moveRowDown(row_id) {}

function editRow(row_id) {}

function createSettingsTd(row_id) {
    let edit = createFAElement('fas', 'fa-edit');
    edit.addEventListener('click', () => editRow(row_id));
    let go_up = createFAElement('fas', 'fa-level-up-alt');
    go_up.addEventListener('click', () => moveRowUp(row_id));
    let go_down = createFAElement('fas', 'fa-level-down-alt');
    go_down.addEventListener('click', () => moveRowDown(row_id));

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
        tier_th.setAttribute('id', row_identifier);
        tier_th.classList.add(`tlm-bgcolor-${row_name}`, 'text-center', 'align-middle');
        tier_th.innerText = value;

        const content = document.createElement('td');
        const settings = createSettingsTd(row_identifier);

        const row = document.createElement('tr');
        row.appendChild(tier_th);
        row.appendChild(content);
        row.appendChild(settings);

        table_body.appendChild(row);
    });
}