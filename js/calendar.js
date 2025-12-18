// Disable spinner
$(document).ready(function () {
$('.preloader').show();
$('#calendar').hide();
});

document.addEventListener('DOMContentLoaded', function () {
const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'list', 'googleCalendar'],
    buttonText: {
    today: 'Today'
    },
    customButtons: {
    addToCalendar: {
        text: 'Add To Your Calendar',
        click: function () {
        window.open('https://bit.ly/2SbrRhe', '_blank');
        }
    }
    },
    header: {
    left: 'prev,next today',
    center: 'title',
    right: 'addToCalendar'
    },
    displayEventTime: false, // don't show the time column in list view
    events: {
    googleCalendarId: 'layer5.io_eh2aa9dpf1g40elvoc762jnphs@group.calendar.google.com'
            googleCalendarApiKey: 'AIzaSyDcmx-nLYfqvrfpEmVJuclwt9akayYfUgg',
    },
    eventClick: function (arg) {
    // opens events in a popup window
    window.open(arg.event.url, '_blank', 'width=700,height=600,noopener,noreferrer');
    // prevents current tab from navigating
    arg.jsEvent.preventDefault();
    },
    loading: function(isLoading) {
    if (isLoading) {
        $('.preloader').show();
        $('#calendar').hide();
    } else {
        $('.preloader').hide();
        $('#calendar').fadeIn('slow');
    }
    }
});
calendar.render();
});
