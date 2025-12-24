/**
 * Calendar entry point - refactored with separation of concerns
 */

import { initCalendar } from '../src/hooks/useCalendar.js';

if (typeof $ !== 'undefined') {
  $(document).ready(function() {
    $('.preloader').show();
    $('#calendar').hide();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initCalendar();
});
