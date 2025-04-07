// Load dictionary from LocalStorage or initialize an empty array
let dictionary = JSON.parse(localStorage.getItem("dictionary")) || [];

// Function to add a new word
function addWord() {
    let word = document.getElementById("word").value.trim();
    let meaning = document.getElementById("meaning").value.trim();
    let example = document.getElementById("example").value.trim();
    let pronunciation = document.getElementById("pronunciation").value.trim();

    if (word === "" || meaning === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Info',
            text: 'Please enter a word and at least one meaning!',
        });
        return;
    }

    let existingWord = dictionary.find(entry => entry.word.toLowerCase() === word.toLowerCase());

    if (existingWord) {
        Swal.fire({
            title: 'Word already exists!',
            text: "Do you want to update it?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, keep old one'
        }).then((result) => {
            if (result.isConfirmed) {
                existingWord.meanings = meaning.split(",");
                existingWord.example = example;
                existingWord.pronunciation = pronunciation;

                localStorage.setItem("dictionary", JSON.stringify(dictionary));

                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Word updated successfully.',
                });

                clearInputs();
            }
        });
    } else {
        let newWord = { word, meanings: meaning.split(","), example, pronunciation };
        dictionary.push(newWord);
        localStorage.setItem("dictionary", JSON.stringify(dictionary));

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: 'Word added successfully.',
        });

        clearInputs();
    }
}

// Helper to clear input fields
function clearInputs() {
    document.getElementById("word").value = "";
    document.getElementById("meaning").value = "";
    document.getElementById("example").value = "";
    document.getElementById("pronunciation").value = "";
}

// Function to search for a word
function searchWord() {
    let query = document.getElementById("search").value.trim().toLowerCase();
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    let matches = dictionary.filter(entry => entry.word.toLowerCase().includes(query));

    if (matches.length > 0) {
        matches.forEach(entry => {
            let meanings = entry.meanings.join(", ");
            resultDiv.innerHTML += `<p><strong>${entry.word}</strong>: ${meanings} <br> 
                                     <em>Example:</em> ${entry.example} <br> 
                                     <em>Pronunciation:</em> ${entry.pronunciation || "N/A"}</p>`;
        });
    } else {
        resultDiv.innerHTML = "<p>No results found.</p>";
    }
}
