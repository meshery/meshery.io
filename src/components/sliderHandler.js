/**
 * Slider component handler
 */

export function initSlider() {
  const slider = document.getElementById('slider');
  if (!slider || typeof $ === 'undefined') return;

  $(slider).on('input change', (e) => {
    const sliderPos = e.target.value;
    $('.foreground-img').css('width', `${sliderPos}%`);
    $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`);
  });
}

