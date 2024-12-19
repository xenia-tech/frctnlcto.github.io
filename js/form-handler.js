document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitButton = document.getElementById('submitButton');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Send to FormSubmit
    fetch('https://formsubmit.co/ajax/mustafa@frctnlcto.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            _bcc: 'will@xenia.tech'
        })
    })
    .then(response => response.json())
    .then(data => {
        // Show success message
        submitButton.innerHTML = 'Message Sent!';
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-success');
        
        // Clear form
        document.getElementById('contactForm').reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-primary');
            submitButton.disabled = false;
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        submitButton.innerHTML = 'Error - Try Again';
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-danger');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-danger');
            submitButton.classList.add('btn-primary');
            submitButton.disabled = false;
        }, 3000);
    });
});
