const openButtons = document.querySelectorAll('[data-modal-id]');
const closeButtons = document.querySelectorAll('.modal-close');

openButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal-id');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      modal.style.pointerEvents = 'auto';
    }
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal-window');
    if (modal) {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';

      const iframe = modal.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    }
  });
});

window.addEventListener('click', (event) => {
  const modals = document.querySelectorAll('.modal-window');
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';

      const iframe = modal.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        iframe.src = src;
      }
    }
  });
});
