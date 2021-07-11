function stringToHash(string) {
    let hash = 0;

    if (string.length === 0) {
        return hash;
    }

    for (let i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

function getElemProperty(el, prop) {
    return window.getComputedStyle(el).getPropertyValue('width');
}

function elementWidth(el) {
    return parseInt(getElemProperty(el, 'width').replace('px', ''));
}

function elementHeight(el) {
    return parseInt(getElemProperty(el, 'height').replace('px', ''));
}