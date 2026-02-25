const CATEGORIES = [
    {key: 'shorts', label: 'Shorts'},
    {key: 'recommendations', label: 'Recommendations'},
    {key: 'endScreen', label: 'End Screen'},
    {key: 'homeFeed', label: 'Home Feed'},
    {key: 'comments', label: 'Comments'},
    {key: 'trending', label: 'Trending'},
];

const DEFAULTS = Object.fromEntries(CATEGORIES.map(c => [c.key, true]));
const container = document.getElementById('categories');

chrome.storage.local.get(DEFAULTS, (settings) => {
    for (const {key, label} of CATEGORIES) {
        const row = document.createElement('div');
        row.className = 'category';

        const name = document.createElement('span');
        name.textContent = label;

        const toggle = document.createElement('label');
        toggle.className = 'toggle';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = settings[key];
        input.addEventListener('change', () => {
            chrome.storage.local.set({[key]: input.checked});
        });

        const slider = document.createElement('span');
        slider.className = 'slider';

        toggle.append(input, slider);
        row.append(name, toggle);
        container.appendChild(row);
    }
});
