/**
 * Calendar initialization and event handling
 */

export function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl || typeof FullCalendar === 'undefined') return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'list', 'googleCalendar'],
    buttonText: {
      today: 'Today'
    },
    customButtons: {
      addToCalendar: {
        text: 'Add To Your Calendar',
        click: function() {
          window.open('https://bit.ly/2SbrRhe', '_blank');
        }
      }
    },
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'addToCalendar'
    },
    displayEventTime: false,
    googleCalendarApiKey: 'AIzaSyDcmx-nLYfqvrfpEmVJuclwt9akayYfUgg',
    events: {
      googleCalendarId: 'layer5.io_eh2aa9dpf1g40elvoc762jnphs@group.calendar.google.com'
    },
    eventClick: function(arg) {
      window.open(arg.event.url, '_blank', 'width=700,height=600,noopener,noreferrer');
      arg.jsEvent.preventDefault();
    },
    loading: function(isLoading) {
      handleLoadingState(isLoading);
    }
  });

  calendar.render();
}

function handleLoadingState(isLoading) {
  const preloader = document.querySelector('.preloader');
  const calendar = document.getElementById('calendar');

  if (typeof $ !== 'undefined') {
    if (isLoading) {
      $(preloader).show();
      $(calendar).hide();
    } else {
      $(preloader).hide();
      $(calendar).fadeIn('slow');
    }
  }
}

