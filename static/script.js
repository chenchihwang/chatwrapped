document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const jsonData = JSON.stringify(Object.fromEntries(data.entries()));

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
});
