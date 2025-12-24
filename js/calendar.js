/**
 * Calendar entry point - refactored with separation of concerns
 */

if (typeof $ !== 'undefined') {
  $(document).ready(function() {
    $('.preloader').show();
    $('#calendar').hide();
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const { initCalendar } = await import('../src/hooks/useCalendar.js');
    initCalendar();
  } catch (error) {
    console.warn('Failed to load calendar module:', error);
  }
});
