document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1200,
    easing: "ease-in-out",
  });
});

const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("header-scroll", "bg-white/30", "shadow-md");
    header.classList.remove("backdrop-blur-sm", "bg-white/10");
  } else {
    header.classList.remove("backdrop-blur-md", "bg-white/30", "shadow-md");
    header.classList.add("backdrop-blur-sm", "bg-white/10");
  }
});

const canvas = document.getElementById("meteorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = document.querySelector(".home-view").offsetWidth;
canvas.height = document.querySelector(".home-view").offsetHeight;

window.addEventListener("resize", () => {
  canvas.width = document.querySelector(".home-view").offsetWidth;
  canvas.height = document.querySelector(".home-view").offsetHeight;
});

class Meteor {
  constructor(isFlaming = false) {
    this.isFlaming = isFlaming;
    this.reset();
  }

  reset() {
    this.x = canvas.width + Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = this.isFlaming
      ? 50 + Math.random() * 50
      : 80 + Math.random() * 80;
    this.speed = this.isFlaming ? 6 + Math.random() * 2 : 3 + Math.random() * 3;
    this.opacity = this.isFlaming ? 1 : 0.3 + Math.random() * 0.4;
    this.angle = (3 * Math.PI) / 4;
    this.color = this.isFlaming
      ? `rgba(${200 + Math.random() * 55}, ${50 + Math.random() * 50}, 0, ${
          this.opacity
        })`
      : `rgba(255, 255, 255, ${this.opacity})`;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    if (this.y > canvas.height || this.x < -this.length) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.length * Math.cos(this.angle),
      this.y - this.length * Math.sin(this.angle)
    );
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.isFlaming ? 3 : 1.5;
    if (this.isFlaming) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = "orange";
    } else {
      ctx.shadowBlur = 5;
      ctx.shadowColor = "white";
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

const meteors = [
  ...Array.from({ length: 30 }, () => new Meteor(false)),
  ...Array.from({ length: 5 }, () => new Meteor(true)),
];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  meteors.forEach((m) => {
    m.update();
    m.draw();
  });
  requestAnimationFrame(animate);
}

animate();
