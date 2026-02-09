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

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Audit Request Data:', formData);

            // Show success message
            closeAuditModal();
            showSuccessModal('Audit Request Received!', 'Thanks! We\'ll send your personalized website audit within 24 hours.');

            // Reset form
            auditForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Request Free Audit';
        }, 1500);
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
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeAuditModal();
    }
});
