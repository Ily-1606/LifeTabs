<template>
  <div>
    <canvas
      ref="bgCanvas"
      :style="mode === 'preview' ? 'border-radius: 10px' : ''"
    />
    <canvas
      ref="starCanvas"
      :style="mode === 'preview' ? 'border-radius: 10px' : ''"
    />
    <canvas
      ref="terCanvas"
      :style="mode === 'preview' ? 'border-radius: 10px' : ''"
    />
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      default() {
        return "fullscreen";
      },
      type: String,
    },
  },
  mounted() {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    window.requestAnimationFrame = requestAnimationFrame;

    // Terrain stuff.
    const terrain = this.$refs.terCanvas;
    const background = this.$refs.bgCanvas;
    const starCanvas = this.$refs.starCanvas;
    const terCtx = terrain.getContext("2d");
    const starCtx = starCanvas.getContext("2d");
    const bgCtx = background.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    terrain.width = background.width = starCanvas.width = width;
    terrain.height = background.height = starCanvas.height = height;

    // Some random points
    const points = [];
    let displacement = 140;
    const power = Math.pow(2, Math.ceil(Math.log(width) / Math.log(2)));

    // set the start height and end height for the terrain
    points[0] = height - (Math.random() * height) / 2 - displacement;
    points[power] = height - (Math.random() * height) / 2 - displacement;

    // create the rest of the points
    for (let i = 1; i < power; i *= 2) {
      for (let j = power / i / 2; j < power; j += power / i) {
        points[j] =
          (points[j - power / i / 2] + points[j + power / i / 2]) / 2 +
          Math.floor(Math.random() * -displacement + displacement);
      }
      displacement *= 0.6;
    }

    // draw the terrain
    terCtx.beginPath();

    for (let i = 0; i <= width; i++) {
      if (i === 0) {
        terCtx.moveTo(0, points[0]);
      } else if (points[i] !== undefined) {
        terCtx.lineTo(i, points[i]);
      }
    }

    terCtx.lineTo(width, terrain.height);
    terCtx.lineTo(0, terrain.height);
    terCtx.lineTo(0, points[0]);
    terCtx.fill();

    // Second canvas used for the stars
    bgCtx.fillStyle = "#05004c";
    bgCtx.fillRect(0, 0, width, height);

    // stars
    function Star(options) {
      this.size = Math.random() * 2;
      this.speed = Math.random() * 0.1;
      this.x = options.x;
      this.y = options.y;
    }

    Star.prototype.reset = function () {
      this.size = Math.random() * 2;
      this.speed = Math.random() * 0.1;
      this.x = width;
      this.y = Math.random() * height;
    };

    Star.prototype.update = function () {
      this.x -= this.speed;
      if (this.x < 0) {
        this.reset();
      } else {
        starCtx.fillStyle = "#ffffff";
        starCtx.fillRect(this.x, this.y, this.size, this.size);
      }
    };

    function ShootingStar() {
      this.reset();
    }

    ShootingStar.prototype.reset = function () {
      this.x = Math.random() * width;
      this.y = 0;
      this.len = Math.random() * 80 + 10;
      this.speed = Math.random() * 10 + 6;
      this.size = Math.random() * 1 + 0.1;
      // this is used so the shooting stars arent constant
      this.waitTime = new Date().getTime() + Math.random() * 3000 + 500;
      this.active = false;
    };

    ShootingStar.prototype.update = function () {
      if (this.active) {
        this.x -= this.speed;
        this.y += this.speed;
        if (this.x < 0 || this.y >= height) {
          this.reset();
        } else {
          bgCtx.lineWidth = this.size;
          bgCtx.beginPath();
          bgCtx.moveTo(this.x, this.y);
          bgCtx.lineTo(this.x + this.len, this.y - this.len);
          bgCtx.stroke();
        }
      } else if (this.waitTime < new Date().getTime()) {
        this.active = true;
      }
    };

    const entities = [];
    starCtx.fillStyle = "#ffffff";
    starCtx.beginPath();
    // init the stars
    for (let i = 0; i < height; i += 3) {
      const star = new Star({
        x: Math.random() * width,
        y: Math.random() * height - height * 0.1,
      });
      starCtx.fillRect(star.x, star.y, star.size, star.size);
      // starCtx.fill();
    }

    // Add 2 shooting stars that just cycle.
    entities.push(new ShootingStar());
    entities.push(new ShootingStar());

    // animate background
    function animate() {
      bgCtx.fillStyle = "#003444";
      bgCtx.fillRect(0, 0, width, height);
      bgCtx.fillStyle = "#ffffff";
      bgCtx.strokeStyle = "#ffffff";

      let entLen = entities.length;

      while (entLen--) {
        entities[entLen].update();
      }

      requestAnimationFrame(animate);
    }
    animate();
  },
};
</script>
<style scoped>
canvas {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  z-index: -1;
}
</style>
