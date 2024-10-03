document.addEventListener('DOMContentLoaded', function() {
    const programTableBody = document.querySelector('#programTable tbody');
    
    const allProgramsData = JSON.parse(localStorage.getItem('allProgramsData')) || [];

    function renderPrograms(programs) {
        programTableBody.innerHTML = ''; // Clear existing rows
        programs.forEach(program => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${program.programId}</td>
                <td>${program.name}</td>
                <td>${program.fee}</td>
                <td>${program.type}</td>
                <td>
                    <button class="edit-button"  style="background-color: #c9bfaf;" data-id="${program.programId}">Edit</button>
                    <button class="delete-button" style="background-color: #ed7272;" data-id="${program.programId}">Delete</button>
                </td>
            `;

            programTableBody.appendChild(row);
        });
    }

    // Initial render
    renderPrograms(allProgramsData);

    document.getElementById('addProgramButton').addEventListener('click', function() {
        window.location.href = 'Addprogram.html';
    });

    document.getElementById('goHome').addEventListener('click', function() {
        window.location.href = 'Adminhome.html';
    });

    // Edit button click event
    programTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const programId = event.target.dataset.id;
            localStorage.setItem('editProgramId', programId); // Store ID for editing
            window.location.href = 'EditProgram.html'; // Redirect to edit page
        }
    });

    // Delete button click event
    programTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const programId = event.target.dataset.id;
            const confirmed = confirm('Are you sure you want to delete this program?');
            if (confirmed) {
                const updatedPrograms = allProgramsData.filter(program => program.programId != programId);
                localStorage.setItem('allProgramsData', JSON.stringify(updatedPrograms));
                renderPrograms(updatedPrograms); // Re-render table
            }
        }
    });

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', function() {
        const searchValue = document.getElementById('searchBox').value.trim();
        const filteredPrograms = allProgramsData.filter(program => program.programId.toString() === searchValue);
        renderPrograms(filteredPrograms);
    });
});
