// ===================================
// AUDIT MODAL FUNCTIONALITY
// ===================================

// Open audit modal
function openAuditModal() {
    const modal = document.getElementById('audit-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close audit modal
function closeAuditModal() {
    const modal = document.getElementById('audit-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('audit-modal');

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeAuditModal();
        }
    });

    // Handle form submission
    const auditForm = document.getElementById('audit-form');
    const submitBtn = auditForm.querySelector('.audit-submit-btn');

    auditForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('audit-name').value,
            email: document.getElementById('audit-email').value,
            youtube: document.getElementById('audit-youtube').value,
            website: document.getElementById('audit-website').value,
            goal: document.getElementById('audit-goal').value
        };

        // Send data to FormSubmit using Ajax
        console.log("Sending request to FormSubmit...");
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';

        fetch("https://formsubmit.co/ajax/info.freelancedev@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                _subject: "New Website Audit Request!",
                _template: "table"
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP Status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success data:', data);

                // Show success message
                closeAuditModal();
                showSuccessModal('Audit Request Received!', 'Thanks! We\'ll send your personalized website audit within 24 hours.');

                // Reset form
                auditForm.reset();
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Request Free Audit';
            })
            .catch(error => {
                console.error('Fetch Error:', error);

                // User-friendly error message
                alert("Something went wrong while sending your request. Please check your internet connection and try again.");

                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Try Again';
            });
    });
});

// Success modal helper function
function showSuccessModal(title, message) {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        const titleElement = successModal.querySelector('h3');
        const messageElement = successModal.querySelector('p');

        if (titleElement) titleElement.textContent = title;
        if (messageElement) messageElement.textContent = message;

        successModal.style.display = 'flex';
        // Force reflow
        successModal.offsetHeight;
        successModal.classList.add('active');

        // Add close logic for success modal if not already there
        const closeBtn = successModal.querySelector('#close-modal-btn');
        if (closeBtn) {
            closeBtn.onclick = function () {
                successModal.classList.remove('active');
                setTimeout(() => {
                    successModal.style.display = 'none';
                }, 300);
            };
        }
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeAuditModal();
    }
});
