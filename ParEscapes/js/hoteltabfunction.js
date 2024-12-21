    // JavaScript to handle tab switching
    document.querySelectorAll('.tab-label').forEach(label => {
        label.addEventListener('click', () => {
            const tabId = label.getAttribute('data-tab');
            
            // Remove active class from all labels and contents
            document.querySelectorAll('.tab-label').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-content-area').forEach(content => content.classList.remove('active'));

            // Add active class to clicked label and corresponding content
            label.classList.add('active');
            document.querySelector(`.tab-content-area[data-content="${tabId}"]`).classList.add('active');
        });
    });