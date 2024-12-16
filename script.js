const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const lineColor = document.getElementById("line-color");
const largeColor = document.getElementById("large-hand-color");
const secondsColor = document.getElementById("second-hand-color");
const inputs = document.querySelectorAll("input");
const saveBtn = document.getElementById("save-btn");
const canvas = document.getElementById("canvas");
const defaultTheme = ["#f4f4f4", "#800000", "#000000", "#800000", "#ff7f50"];

function clock() {
  const now = new Date();
  const ctx = canvas.getContext("2d");

  // Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

  // Set default styles
  ctx.strokeStyle = lineColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // console.log(`${hr}:${min}:${sec}`);

  // Draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw min hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondsColor.value;
  ctx.fillStyle = secondsColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

function updateTheme(e) {
  const colorArray = [
    faceColor.value,
    borderColor.value,
    lineColor.value,
    largeColor.value,
    secondsColor.value,
  ];

  localStorage.removeItem("theme");
  localStorage.setItem("theme", JSON.stringify(colorArray));
  // loadSavedTheme();
}

function loadSavedTheme() {
  faceColor.value = JSON.parse(localStorage.getItem("theme"))[0];
  borderColor.value = JSON.parse(localStorage.getItem("theme"))[1];
  lineColor.value = JSON.parse(localStorage.getItem("theme"))[2];
  largeColor.value = JSON.parse(localStorage.getItem("theme"))[3];
  secondsColor.value = JSON.parse(localStorage.getItem("theme"))[4];
}

function initSetUp() {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", JSON.stringify(defaultTheme));
    loadSavedTheme();
  } else {
    loadSavedTheme();
  }
}

function downloadImage() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
}

inputs.forEach((input) => input.addEventListener("input", updateTheme));
document.addEventListener("DOMContentLoaded", initSetUp);
saveBtn.addEventListener("click", downloadImage);
