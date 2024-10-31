// Class: SWE2511 - Drawing
// Names: Alex Pearsall & Gavin Danner-Rivers
// Class Section: 121

const drawShapes = () => {
    var canvas = document.getElementById("my_canvas");

    if (canvas.getContext) {
        var shapes = canvas.getContext('2d');

        //draw a rectangle
        shapes.fillStyle = 'rgb(0,50,255)';
        shapes.fillRect(25, 25, 100, 100);

        //draw a path
        shapes.fillStyle = 'rgb(61,255,0)';
        shapes.beginPath();
        shapes.arc(725, 75, 60, 0, Math.PI * 2, true);
        shapes.stroke();

        // Filled triangle
        shapes.beginPath();
        shapes.moveTo(25, 775);
        shapes.lineTo(105, 775);
        shapes.lineTo(25, 675);
        shapes.fillStyle = 'rgb(255,0,0)';
        shapes.fill();

        //draws bezier
        shapes.beginPath();
        shapes.moveTo(725, 725);
        shapes.bezierCurveTo(700, 350, 300, 900, 400, 550);
        shapes.stroke();


    } else {
        alert('Unsupported Browser.');
    }
}




let x;
let y;
let drawing = false;
let penSizeValue;
let penColorValue;
let penShapeValue;

const mouseCords = (event) => {
    const location = document.getElementById("location");
    const canvas = document.getElementById("my_canvas");
    const canvasLocation = canvas.getBoundingClientRect();

    x = event.clientX - canvasLocation.left;
    y = Math.round(event.clientY - canvasLocation.top);
    location.innerText = "X-Location: " + x + " || Y-Location: " + y;

    if (drawing) {
        draw(x, y, penSizeValue, penColorValue, penShapeValue);
    }
};

const clearCords = () => {
    const location = document.getElementById("location");
    location.innerText = "X-Location: N/A || Y-Location: N/A";

};

const draw = (x, y, size, color, shape) => {
    const canvas = document.getElementById("my_canvas");
    let drawLine = canvas.getContext('2d');
    drawLine.fillStyle = color;
    if (shape === "square") {
        drawLine.fillRect(x, y, size, size);
    } else if (shape === "circle") {
        drawLine.beginPath();
        drawLine.arc(x, y, size/2, 0, 2 * Math.PI);
        drawLine.fill();
    }
};

window.onload = () => {
    const canvas = document.getElementById("my_canvas");
    canvas.addEventListener("mousemove", mouseCords);
    canvas.addEventListener("mouseout", clearCords);

    canvas.addEventListener("mousedown", () => {
        drawing = true;
    });

    canvas.addEventListener("mouseup", () => {
        drawing = false;
    });

    const penSize = document.getElementById("penSize");
    penSizeValue = 5;
    penSize.addEventListener("input", () => {
        penSizeValue = penSize.value;
    });

    const penColor = document.getElementById("penColor");
    penColorValue = "#000000";
    penColor.addEventListener("input", () => {
        penColorValue = penColor.value;
    });

    const square = document.getElementById("square");
    const circle = document.getElementById("circle");
    penShapeValue = "square";
    square.addEventListener("change", () => {
        penShapeValue = "square";
    });
    circle.addEventListener("change", () => {
        penShapeValue = "circle";
    });

    const clear = document.getElementById("clear");
    clear.addEventListener("click", () => {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    const width = document.getElementById("width");
    const widthError = document.getElementById("widthError");
    width.addEventListener("keyup", () => {
        let value = width.value;
        if (isNaN(value) || !Number.isInteger(parseFloat(value)) || value <= 0) {
            widthError.style.visibility = "visible";
        } else {
            widthError.style.visibility = "hidden";
            canvas.width = value;
        }
    });

    const height = document.getElementById("height");
    const heightError = document.getElementById("heightError");
    height.addEventListener("keyup", () => {
        let value = height.value;
        if (isNaN(value) || !Number.isInteger(parseFloat(value)) || value <= 0) {
            heightError.style.visibility = "visible";
        } else {
            heightError.style.visibility = "hidden";
            canvas.height = height.value;
        }
    });

    const resetOptions = document.getElementById("resetOptions");
    resetOptions.addEventListener("click", () => {
        penSize.value = "5";
        penSizeValue = "5";
        penColor.value = "#000000";
        penColorValue = "#000000";
        square.checked = true;
        penShapeValue = "square";
        width.value = "800";
        canvas.width = "800";
        height.value = "800";
        canvas.height = "800";
    });
};