(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      let thisForm = this;

      // Select message elements
      const loading = thisForm.querySelector('.loading');
      const errorMsg = thisForm.querySelector('.error-message');
      const sentMsg = thisForm.querySelector('.sent-message');

      loading.classList.add('d-block');
      errorMsg.classList.remove('d-block');
      sentMsg.classList.remove('d-block');

      // Collect form data
      const formData = {
        name: thisForm.querySelector('input[name="name"]').value,
        email: thisForm.querySelector('input[name="email"]').value,
        subject: thisForm.querySelector('input[name="subject"]').value,
        message: thisForm.querySelector('textarea[name="message"]').value
      };

      try {
        const response = await fetch("https://telegram.nikasaxmadara.workers.dev/", { // <- replace with your Worker URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        loading.classList.remove('d-block');

        if (result.success) {
          sentMsg.classList.add('d-block');
          thisForm.reset();
        } else {
          errorMsg.innerHTML = result.error || 'Form submission failed.';
          errorMsg.classList.add('d-block');
        }

      } catch (error) {
        loading.classList.remove('d-block');
        errorMsg.innerHTML = 'Failed to send message.';
        errorMsg.classList.add('d-block');
        console.error(error);
      }
    });
  });

})();
