export const contentInfo = {
  section1: {
    text1: {
      target: document.querySelector(".content1 .text1"),
      start: 0.1,
      end: 0.2,
      effect: {
        opacity: [1, 0],
        transform: {
          translate: [0, -60],
        },
      },
    },

    text2: {
      target: document.querySelector(".content1 .text2"),
      start: [0.2, 0.3],
      end: [0.3, 0.4],
      effect: {
        opacity: [0, 1, 1, 0],
        transform: {
          translate: [0, -60, -60, -100],
        },
      },
    },

    text3: {
      target: document.querySelector(".content1 .text3"),
      start: [0.4, 0.55],
      end: [0.55, 0.6],
      effect: {
        opacity: [0, 1, 1, 0],
        transform: {
          translate: [0, -60, -60, -100],
        },
      },
    },

    text4: {
      target: document.querySelector(".content1 .text4"),
      start: 0.6,
      end: 0.7,
      effect: {
        opacity: [0, 1],
        transform: {
          translate: [0, -60],
        },
      },
    },

    video: {
      target: document.querySelector(".content1 .video"),
      start: 0.84,
      end: 0.94,
      effect: {
        opacity: [1, 0],
        transform: {
          rotateX: [360, 330],
        },
      },
    },
  },
  section2: {
    text1: {
      target: document.querySelector(".content2 .text1"),
      start: 0.05,
      end: 0.2,
      effect: {
        opacity: [0, 1],
        transform: {
          translate: [0, -60],
        },
      },
    },

    video: {
      target: document.querySelector(".content2 .video"),
      start: 0.3,
      end: 0.4,
      effect: {
        transform: {
          // scale: [2, 1],
        },
      },
    },
  },
  section3: {},
  section4: {},
};
