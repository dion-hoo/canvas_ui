export const useScroll = (reach, duration, speed) => {
    let gapY = 0;
    const scroll = setInterval(() => {
        window.scrollTo({
            top: gapY,
            left: 0,
        });

        if (window.scrollY === reach) {
            clearInterval(scroll);
        }

        gapY += speed;
    }, duration);
};
