import Zdog from "zdog";

type Shapes = "T" | "L" | "I" | "O" | "Z";

const colors = {
  red: {
    primary: "#ff5050",
    darker: "#db4040",
  },
  blue: {
    primary: "#158CFA",
    darker: "#156fc2",
  },
  yellow: {
    primary: "#F9F25D",
    darker: "#b5b157",
  },
  purple: {
    primary: "#D05DF9",
    darker: "#8d38ab",
  },
  teal: {
    primary: "#5DF9DD",
    darker: "#3ba18e",
  },
};

let blockSize = 50;
let blockOffset = blockSize + 5;

const randomNegativeOrPositive = (max: number) =>
  Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);

export class ShapeAnimation {
  illo = null as Zdog.Illustration;
  spinning = true;
  anchors: {
    anchor: Zdog.Anchor;
    speed: number;
  }[] = [];

  constructor(className: string) {
    this.illo = new Zdog.Illustration({
      element: className,
      dragRotate: true,
      onDragStart: () => {
        this.spinning = false;
      },
      onDragEnd: () => {
        this.spinning = true;
      },
    });
  }

  cube(color: string, options?: Record<string, any>) {
    return new Zdog.Box({
      addTo: this.illo,
      width: blockSize,
      height: blockSize,
      depth: blockSize,
      stroke: false,
      color: colors[color].primary,
      leftFace: colors[color].primary,
      rightFace: colors[color].darker,
      topFace: colors[color].primary,
      bottomFace: colors[color].darker,
      backface: colors[color].darker,
      ...options,
    });
  }

  generateL(color: string) {
    let anchor = new Zdog.Anchor({
      addTo: this.illo,
    });

    let cube1 = this.cube(color, {
      addTo: anchor,
      translate: { x: blockOffset },
    });
    cube1.copy({
      translate: { x: 0 },
    });
    cube1.copy({
      translate: { x: -blockOffset },
    });
    cube1.copy({
      translate: { x: -blockOffset, y: -blockOffset },
    });

    return anchor;
  }

  generateI(color: string) {
    let anchor = new Zdog.Anchor({
      addTo: this.illo,
    });

    let cube1 = this.cube(color, {
      addTo: anchor,
      translate: { x: blockOffset },
    });
    cube1.copy({
      translate: { x: 0 },
    });
    cube1.copy({
      translate: { x: -blockOffset },
    });
    cube1.copy({
      translate: { x: -blockOffset * 2 },
    });

    return anchor;
  }

  generateO(color: string) {
    let anchor = new Zdog.Anchor({
      addTo: this.illo,
    });

    let cube1 = this.cube(color, {
      addTo: anchor,
      translate: { x: blockOffset },
    });
    cube1.copy({
      translate: { x: 0 },
    });
    cube1.copy({
      translate: { x: 0, y: -blockOffset },
    });
    cube1.copy({
      translate: { x: blockOffset, y: -blockOffset },
    });

    return anchor;
  }

  generateT(color: string) {
    let anchor = new Zdog.Anchor({
      addTo: this.illo,
    });

    let cube1 = this.cube(color, {
      addTo: anchor,
      translate: { x: blockOffset },
    });
    cube1.copy({
      translate: { x: 0 },
    });
    cube1.copy({
      translate: { x: -blockOffset },
    });
    cube1.copy({
      translate: { x: 0, y: -blockOffset },
    });

    return anchor;
  }

  generateZ(color: string) {
    let anchor = new Zdog.Anchor({
      addTo: this.illo,
    });

    let cube1 = this.cube(color, {
      addTo: anchor,
      translate: { x: blockOffset },
    });
    cube1.copy({
      translate: { x: 0 },
    });
    cube1.copy({
      translate: { x: 0, y: -blockOffset },
    });
    cube1.copy({
      translate: { x: -blockOffset, y: -blockOffset },
    });

    return anchor;
  }

  addShape(shape: Shapes, color: string) {
    let anchor: Zdog.Anchor;

    switch (shape) {
      case "L":
        anchor = this.generateL(color);
        break;

      case "I":
        anchor = this.generateI(color);
        break;

      case "O":
        anchor = this.generateO(color);
        break;

      case "T":
        anchor = this.generateT(color);
        break;

      case "Z":
        anchor = this.generateZ(color);
        break;

      default:
        break;
    }

    anchor.rotate.y = 0.03;

    anchor.translate.x = randomNegativeOrPositive(300);
    anchor.translate.y = randomNegativeOrPositive(300);
    anchor.translate.z = randomNegativeOrPositive(300);

    this.anchors.push({
      anchor,
      speed: Math.random() / 70,
    });
  }

  animate() {
    if (this.spinning) {
      this.anchors.forEach(({ anchor, speed }) => {
        anchor.rotate.y += speed;
        anchor.rotate.x += speed;
      });
    }

    this.illo.updateRenderGraph();
    // animate next frame
    requestAnimationFrame(this.animate.bind(this));
  }
}
