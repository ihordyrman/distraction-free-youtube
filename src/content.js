const CATEGORIES = {
    shorts: ['ytd-rich-shelf-renderer[is-shorts]', 'ytd-reel-shelf-renderer'],
    recommendations: ['#secondary-inner > div:not(:has(> ytd-playlist-panel-renderer))'],
    endScreen: ['.ytp-endscreen-content', '.ytp-ce-element', '.ytp-suggestion-set'],
    homeFeed: ['ytd-browse[page-subtype="home"] ytd-rich-grid-renderer'],
    comments: ['ytd-comments#comments', '#comment-teaser']
};

const DEFAULTS = Object.fromEntries(Object.keys(CATEGORIES).map(k => [k, true]));

const style = document.createElement('style');
style.id = 'opendf-styles';
document.head.appendChild(style);

function buildCSS(settings) {
    const rules = [];
    for (const [key, selectors] of Object.entries(CATEGORIES)) {
        if (settings[key]) {
            rules.push(`${selectors.join(', ')} { display: none !important; }`);
        }
    }
    style.textContent = rules.join('\n');
}

chrome.storage.local.get(DEFAULTS, buildCSS);

chrome.storage.onChanged.addListener((changes) => {
    chrome.storage.local.get(DEFAULTS, buildCSS);
});
