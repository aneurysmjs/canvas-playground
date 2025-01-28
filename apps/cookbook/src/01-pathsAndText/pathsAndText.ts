const canvas = document.createElement("canvas");

canvas.style.width = "600px";
canvas.style.height = "400px";

canvas.classList.add("bg-neutral-800");
canvas.classList.add("mx-auto");

document.body.append(canvas);

const context = canvas.getContext("2d");
