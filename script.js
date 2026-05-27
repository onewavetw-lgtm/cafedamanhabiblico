document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const swiper = new Swiper('.material-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        freeMode: true,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            }
        }
    });

    // Before/After Slider Logic (Kept if needed for future UI elements or hidden sections)
    document.querySelectorAll('.ba').forEach(root => {
        const range = root.querySelector('.ba-range');
        if (!range) return;
        const setPos = (pct) => {
            pct = Math.max(0, Math.min(100, pct));
            root.style.setProperty('--pos', pct + '%');
            range.value = pct;
        };

        const initial = Number(root.dataset.initial || range.value || 50);
        setPos(initial);

        const pctFromEvent = (e) => {
            const rect = root.getBoundingClientRect();
            const clientX = (e.touches?.[0]?.clientX ?? e.clientX);
            return ((clientX - rect.left) / rect.width) * 100;
        };

        let dragging = false;
        const start = (e) => { dragging = true; setPos(pctFromEvent(e)); };
        const move = (e) => { if (dragging) setPos(pctFromEvent(e)); };
        const end = () => { dragging = false; };

        root.addEventListener('mousedown', start);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', end);

        root.addEventListener('touchstart', start, { passive: true });
        window.addEventListener('touchmove', move, { passive: true });
        window.addEventListener('touchend', end);

        range.addEventListener('input', (e) => setPos(Number(e.target.value)));
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            const isActive = item.classList.contains('active');

            // Close all currently active items if desired (Optional - here we let them be independent, like requested: simple accordion)
            // document.querySelectorAll('.faq-item').forEach(i => {
            //     i.classList.remove('active');
            //     i.querySelector('.faq-answer').style.maxHeight = null;
            // });

            if (isActive) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
                item.querySelector('.faq-answer').style.paddingBottom = "0px";
            } else {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 50 + "px"; // add extra space
                answer.style.paddingBottom = "25px";
            }
        });
    });
});
