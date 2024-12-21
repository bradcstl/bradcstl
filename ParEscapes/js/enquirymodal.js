        // Modal functionality for enquiry
        function openModal() {
            document.getElementById('enquiryModal').style.display = 'flex';
          }
          
          function closeModal() {
            document.getElementById('enquiryModal').style.display = 'none';
          }
          // Function to display success modal
          function showSuccessModal() {
          const successModal = document.getElementById('successModal');
          successModal.style.display = 'flex'; // Show the success modal
      
          // Close modal when clicking the close button or the "Close" button
          document.getElementById('closeSuccessModal').addEventListener('click', closeSuccessModal);
          document.getElementById('closeSuccessBtn').addEventListener('click', closeSuccessModal);
      }
      
      // Function to close success modal
      function closeSuccessModal() {
          const successModal = document.getElementById('successModal');
          successModal.style.display = 'none'; // Hide the modal
      }
          // Trigger this function after form submission
      document.getElementById('enquiryForm').addEventListener('submit', function(event) {
          event.preventDefault();
      
          const formData = new FormData(this);
      
          fetch('sendEnquiry.php', {
              method: 'POST',
              body: formData
          })
          .then(response => response.text())
          .then(data => {
              showSuccessModal(); // Show the success window after successful form submission
          })
          .catch(error => {
              alert('Failed to send enquiry. Please try again.');
          });
      });