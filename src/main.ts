import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  /* ---------------- Scroll Smoother --------------- */
  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5, // Время сглаживания (сек)
    effects: true, // data-speed/data-lag эффекты
    normalizeScroll: true, // Debounced normalizeScroll, Выключаем на мобильных браузерах сворачивание адресной строки при скроллировании
    smoothTouch: 0.1, // Сглаживание на тач (опционально)
  });

  /* ---------------- Text Split -------------------- */
  const textElements = document.querySelectorAll('.col-3 h2, .col-3 p');
  textElements.forEach((el) => {
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'line',
    });
    split.lines.forEach((line) => {
      line.innerHTML = `<span>${line.textContent}</span>`;
    });
  });

  gsap.set('.col-3 .col-content-wrapper .line span', { y: '0%' });
  gsap.set('.col-3 .col-content-wrapper-2 .line span', { y: '-125%' });

  /* ---------------- Master Timeline --------------- */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.sticky-cols',
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 1,
    },
  });

  /* ---------------- Step 1 ------------------------ */
  tl.to('.col-1', { opacity: 0, scale: 0.75 })
    .to('.col-2', { x: '0%' }, '<')
    .to('.col-3', { y: '0%' }, '<')
    .to('.col-img-1 img', { scale: 1.25 }, '<')
    .to(
      '.col-img-2',
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      '<',
    )
    .to('.col-img-2 img', { scale: 1 }, '<');

  /* ---------------- Step 2 ------------------------ */
  tl.to('.col-2', { opacity: 0, scale: 0.75 })
    .to('.col-3', { x: '0%' }, '<')
    .to('.col-4', { y: '0%' }, '<')
    .to('.col-3 .col-content-wrapper .line span', { y: '-125%' }, '<')
    .to('.col-3 .col-content-wrapper-2 .line span', { y: '0%' }, '<0.2');
});
