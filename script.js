// JavaScript for Notes Website

document.getElementById('search-bar').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const notes = document.querySelectorAll('.note');

    notes.forEach(note => {
        const title = note.querySelector('h3').textContent.toLowerCase();
        const description = note.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
});

// function viewNote(fileName) {
//     alert(`View functionality for ${fileName} not implemented yet!`);
// }

// function downloadNote(fileName) {
//     const link = document.createElement('a');
//     link.href = `notes/${fileName}`;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }


function viewNote(fileName) {
    const notesContainer = document.getElementById('notes-list');

    // Fetch the note content
    fetch(`notes/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Note not found');
            }
            return response.text();
        })
        .then(content => {
            // Display the content in the notes section
            notesContainer.innerHTML = `
                <div class="note-content">
                    <button onclick="reloadNotes()">Back to Notes</button>
                    <h2>${fileName}</h2>
                    <pre>${content}</pre>
                </div>
            `;
        })
        .catch(error => {
            alert(`Error loading note: ${error.message}`);
        });
}

function downloadNote(fileName) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = `notes/${fileName}`; // File path to the note
    link.download = fileName;       // Set the download attribute to the file name

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link
    document.body.removeChild(link);
}


// Reload the original notes list
function reloadNotes() {
    window.location.reload(); // Reload the page to show the notes list
}


const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    // Change button text/icon based on theme
    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
});

