document.getElementById('programregistrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const fee = document.getElementById('fees').value; // Corrected ID
    const type = document.getElementById('type').value; // Corrected ID

    // Generate unique Program ID
    const programId = generateProgramId();
    
    const programData = {
        programId: programId,
        name: name,
        fee: fee,
        type: type,
        date: Date.now()
    };
    
    const allProgramsData = JSON.parse(localStorage.getItem('allProgramsData')) || [];
    allProgramsData.push(programData);
    localStorage.setItem('allProgramsData', JSON.stringify(allProgramsData));
    
    // Display Program ID and success message
    alert('Registration successful! Your Program ID is ' + programId);
    
    // Clear form fields
    document.getElementById('programregistrationForm').reset();

    // Redirect to Program Management page
    window.location.href = 'Programmanagement.html'; // Ensure the path is correct
});

document.getElementById('goHome').addEventListener('click', function() {
    window.location.href = 'Adminhome.html'; // Ensure the path is correct
});

function generateProgramId() {
    const lastId = localStorage.getItem('lastProgramId');
    const newId = lastId ? parseInt(lastId, 10) + 1 : 1000; // Starting ID from 1000
    localStorage.setItem('lastProgramId', newId);
    return newId;
}
