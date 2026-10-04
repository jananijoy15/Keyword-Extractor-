function extractKeywords() {

    const text = document.getElementById("textInput").value.trim();

    if (text === "") {
        alert("Please enter some text!");
        return;
    }

    const stopWords = [
        "the", "is", "a", "an", "and", "or", "of",
        "to", "in", "on", "for", "with", "this",
        "that", "are", "was", "were", "it", "as",
        "at", "by", "from", "be", "has", "have",
        "had", "will", "can", "but", "not", "we",
        "they", "he", "she", "i", "you"
    ];

    const words = text
        .toLowerCase()
        .match(/\b[a-z]+\b/g) || [];

    const filteredWords = words.filter(
        word => !stopWords.includes(word) && word.length > 2
    );

    const frequency = {};

    filteredWords.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    const sortedWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    document.getElementById("wordCount").textContent = words.length;
    document.getElementById("keywordCount").textContent =
        sortedWords.length;

    const keywordBox = document.getElementById("keywords");

    keywordBox.innerHTML = "";

    if (sortedWords.length === 0) {
        keywordBox.textContent = "No keywords found.";
        return;
    }

    sortedWords.forEach(([word, count]) => {

        const span = document.createElement("span");

        span.className = "keyword";
        span.textContent = word + " (" + count + ")";

        keywordBox.appendChild(span);
    });
}