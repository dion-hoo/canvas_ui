import { PointPosition } from "./PointPosition.js";

export class LineGroup {
  constructor(x, y) {
    this.lines = [
      // red
      new PointPosition(x, y, 0, 1, 0, "#640000", "#640000", 13),
      new PointPosition(x, y, 1, 1, 0, "#ad0713", "#ad0713", 13),
      new PointPosition(x, y, 2, 3, 0, "#62010a", "#62010a", 13),
      new PointPosition(x, y, 5, 1, 0, "#d92e37", "#d92e37", 13),
      new PointPosition(x, y, 6, 1, 0, "#d34e4f", "#d34e4f", 13),
      new PointPosition(x, y, 7, 1, 0, "#b9013d", "#b9013d", 12),
      new PointPosition(x, y, 8, 3, 0, "#ee8f3f", "#ee8f3f", 12),
      new PointPosition(x, y, 11, 3, 1, "#ba2a45", "#ba2a45", 12),
      new PointPosition(x, y, 14, 1, 0, "#330000", "#330000", 12),
      new PointPosition(x, y, 15, 1, 0, "#9e0120", "#9e0120", 12),

      // orange
      new PointPosition(x, y, 16, 1, 0, "#db6c35", "#db6c35", 11),
      new PointPosition(x, y, 17, 1, 0, "#ee8f3f", "#ee8f3f", 11),
      new PointPosition(x, y, 18, 1, 0, "#d68e80", "#d68e80", 11),
      new PointPosition(x, y, 19, 3, 0, "#dd4f21", "#dd4f21", 11),
      new PointPosition(x, y, 22, 1, 0, "#ebb12c", "#ebb12c", 11),
      new PointPosition(x, y, 23, 1, 0, "#e35b67", "#e35b67", 11),
      new PointPosition(x, y, 24, 1, 0, "#9d2100", "#9d2100", 10),
      new PointPosition(x, y, 25, 1, 0, "#ec7f60", "#ec7f60", 10),
      new PointPosition(x, y, 26, 1, 0, "#fa7d67", "#fa7d67", 10),
      new PointPosition(x, y, 27, 1, 0, "#df6325", "#df6325", 10),
      new PointPosition(x, y, 28, 1, 0, "#db7d4e", "#db7d4e", 10),

      // yellow
      new PointPosition(x, y, 29, 1, 0, "#f6ce38", "#f6ce38", 9),
      new PointPosition(x, y, 30, 3, 2, "#fed53b", "#fed53b", 9),
      new PointPosition(x, y, 34, 1, 0, "#fec538", "#fec538", 9),
      new PointPosition(x, y, 35, 1, 0, "#f19b2a", "#f19b2a", 9),
      new PointPosition(x, y, 36, 1, 10, "#f1ce17", "#f1ce17", 9),
      new PointPosition(x, y, 37, 1, 0, "#dfe333", "#dfe333", 8),
      new PointPosition(x, y, 38, 1, 2, "#a6a916", "#a6a916", 8),
      new PointPosition(x, y, 39, 1, 0, "#d7d453", "#d7d453", 8),
      new PointPosition(x, y, 40, 1, 0, "#fdec00", "#fdec00", 8),
      new PointPosition(x, y, 41, 1, 0, "#e3db6a", "#e3db6a", 8),

      // green
      new PointPosition(x, y, 42, 1, 0, "#058d43", "#058d43", 7),
      new PointPosition(x, y, 43, 1, 0, "#6aec92", "#6aec92", 7),
      new PointPosition(x, y, 44, 1, 0, "#aee1c0", "#aee1c0", 7),
      new PointPosition(x, y, 45, 1, 0, "#97dcb0", "#97dcb0", 7),
      new PointPosition(x, y, 46, 5, 2, "#36b371", "#36b371", 7),
      new PointPosition(x, y, 51, 5, 2, "#007a3d", "#007a3d", 6),
      new PointPosition(x, y, 56, 1, 0, "#01a068", "#01a068", 6),
      new PointPosition(x, y, 57, 1, 9, "#69e5a7", "#69e5a7", 6),
      new PointPosition(x, y, 58, 2, 0, "#0b6a54", "#0b6a54", 6),
      new PointPosition(x, y, 60, 1, 0, "#02392c", "#02392c", 6),

      // blue
      new PointPosition(x, y, 61, 1, 0, "#4bf9ff", "#4bf9ff", 5),
      new PointPosition(x, y, 62, 1, 0, "#0a35d1", "#0a35d1", 5),
      new PointPosition(x, y, 63, 1, 0, "#0a148f", "#0a148f", 5),
      new PointPosition(x, y, 64, 1, 0, "#00118e", "#00118e", 5),
      new PointPosition(x, y, 65, 8, 0, "#30aefa", "#30aefa", 5),
      new PointPosition(x, y, 66, 1, 0, "#0e1cb1", "#0e1cb1", 4),
      new PointPosition(x, y, 67, 1, 0, "#1025ee", "#1025ee", 4),
      new PointPosition(x, y, 68, 1, 0, "#000884", "#000884", 4),
      new PointPosition(x, y, 69, 1, 0, "#1b42db", "#1b42db", 4),
      new PointPosition(x, y, 70, 1, 0, "#246bf7", "#246bf7", 4),

      // indigo
      new PointPosition(x, y, 71, 1, 0, "#000987", "#000987", 3),
      new PointPosition(x, y, 72, 1, 0, "#090a1c", "#090a1c", 3),
      new PointPosition(x, y, 73, 1, 0, "#353cc1", "#353cc1", 3),
      new PointPosition(x, y, 74, 1, 0, "#1a0b65", "#1a0b65", 3),
      new PointPosition(x, y, 75, 4, 1, "#6956c7", "#6956c7", 3),
      new PointPosition(x, y, 79, 1, 0, "#3b384d", "#3b384d", 2),
      new PointPosition(x, y, 80, 1, 0, "#03013f", "#03013f", 2),
      new PointPosition(x, y, 81, 1, 0, "#4637bb", "#4637bb", 2),
      new PointPosition(x, y, 82, 1, 0, "#453f6d", "#453f6d", 2),
      new PointPosition(x, y, 83, 1, 0, "#050314", "#050314", 2),

      // violet
      new PointPosition(x, y, 84, 1, 0, "#690369", "#690369", 1),
      new PointPosition(x, y, 85, 1, 0, "#140114", "#140114", 1),
      new PointPosition(x, y, 86, 1, 0, "#9344ad", "#9344ad", 1),
      new PointPosition(x, y, 87, 1, 0, "#e685e4", "#e685e4", 1),
      new PointPosition(x, y, 88, 1, 0, "#4a0c77", "#4a0c77", 1),
      new PointPosition(x, y, 89, 1, 0, "#8d7fbc", "#8d7fbc", 0),
      new PointPosition(x, y, 90, 1, 0, "#a44ebd", "#a44ebd", 0),
      new PointPosition(x, y, 91, 1, 3, "#6d5d9c", "#6d5d9c", 0),
      new PointPosition(x, y, 92, 1, 0, "#580a44", "#580a44", 0),
      new PointPosition(x, y, 93, 1, 0, "#2a0129", "#2a0129", 0),
    ];
  }
}
