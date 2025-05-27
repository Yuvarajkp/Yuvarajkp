
async function fetchDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        return data[0].meanings[0].definitions[0].definition;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-btn');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', async () => {
        const word = searchInput.value.trim();
        if (word) {
            resultDiv.textContent = 'Loading...';
            const definition = await fetchDefinition(word);
            resultDiv.textContent = `Definition of "${word}": ${definition}`;
        } else {
            resultDiv.textContent = 'Please enter a word.';
        }
    });
});
/* Optionally, you can add support for pressing "Enter" in the search bar */
searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});