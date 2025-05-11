document.getElementById('webhookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
        const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzMDA0MzM1MjY0NTUzNDUxMzQi_pc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        if (response.ok) {
            alert('Data sent successfully!');
        } else {
            alert('Failed to send data.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});