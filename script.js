const searchInput = document.getElementById('searchInput');
const contentDiv = document.getElementById('content');
const countBadge = document.getElementById('match-count');

// 1. Capture the original HTML content
// We need this so we don't mess up the HTML structure when backspacing
const originalHTML = contentDiv.innerHTML;

// 2. Helper: Escape special Regex characters
// If user types "?" or "*", we treat them as text, not regex commands
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 3. Highlight Logic
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value;

    // A. Reset if empty
    if (!searchText) {
        contentDiv.innerHTML = originalHTML;
        countBadge.innerText = "0 matches";
        return;
    }

    // B. Create Regular Expression
    // 'g' = global (find all), 'i' = case insensitive
    const regex = new RegExp(`(${escapeRegExp(searchText)})`, 'gi');

    // C. Perform Replacement
    // We use the original HTML as the source
    // $1 represents the matched text (preserving the original case)
    let newHTML = originalHTML.replace(regex, '<mark>$1</mark>');

    // D. Update the DOM
    contentDiv.innerHTML = newHTML;

    // E. Count Matches
    // We count how many <mark> tags we just added
    const matchCount = (newHTML.match(/<mark>/g) || []).length;
    countBadge.innerText = `${matchCount} matches`;
    
    // Optional: Highlight border if no matches
    if(matchCount === 0) {
        searchInput.style.borderColor = "#ff4757"; // Red
    } else {
        searchInput.style.borderColor = "#3b82f6"; // Blue
    }
});
