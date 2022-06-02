import Zdog from "zdog";
import Zfont from "zfont";

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

let blockSize = 70;
let blockOffset = blockSize + 5;

const randomNegativeOrPositive = (max: number) =>
  Math.ceil(Math.random() * max) * (Math.round(Math.random()) ? 1 : -1);

// Initialize Zfont
Zfont.init(Zdog);

let viewRotation = new Zdog.Vector();
let dragStartRX = 0;
let dragStartRY = 0;

// Set up a font to use
let myFont = new Zdog.Font({
  src: "./fonts/PressStart2P-Regular.ttf",
});

export class ShapeAnimation {
  illo = null as Zdog.Illustration;
  text = null;

  spinning = true;
  anchors: {
    anchor: Zdog.Anchor;
    speed: number;
  }[] = [];

  /* initialPosition = {

  } */

  constructor(className: string) {
    this.illo = new Zdog.Illustration({
      element: className,
      dragRotate: true,
      onDragStart: () => {
        this.spinning = false;
      },
      onDragMove: (pointer, moveX, moveY) => {
        let moveRX = (moveY / this.illo.width) * Zdog.TAU * -1;
        let moveRY = (moveX / this.illo.width) * Zdog.TAU * -1;
        viewRotation.x = moveRX;
        viewRotation.y = moveRY;
      },
      onDragEnd: () => {
        this.spinning = true;
      },
    });

    // Create a text object
    // This is just a Zdog.Shape object with a couple of extra parameters!
    this.text = new Zdog.Text({
      addTo: this.illo,
      font: myFont,
      value: "DETRIS",
      fontSize: 64,
      color: "#fff",
      fill: true,
      textAlign: "center",
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

    //console.log(this.illo.rotate)

    if (!this.spinning) {
      /* this.text.rotate.x = this.illo.rotate.x * -1;
      this.text.rotate.y = this.illo.rotate.y * -1;
      this.text.rotate.z = this.illo.rotate.z * -1; */

      this.text.rotate.x = this.illo.rotate.x * -1;
      this.text.rotate.y = this.illo.rotate.y * -1;
      this.text.rotate.z = this.illo.rotate.z * -1;

      console.log(this.illo.rotate);
    }
    // animate next frame
    requestAnimationFrame(this.animate.bind(this));
  }
}
