let lock = false;
let frameCount = 0;
let seed = Date.now();
if(window.location.search === ""){
    window.location.search = seed;
}else{
    console.log("loading ", window.location.search.replace("?", ""))
    seed = parseInt(window.location.search.replace("?", ""));
}
noise.seed(seed);
let canvas = document.getElementById("canvas");
if (canvas instanceof HTMLCanvasElement) {

    let permalink = document.getElementById("permalink");
    if(permalink instanceof HTMLAnchorElement){
        permalink.innerHTML = window.location.toString();
        permalink.href = window.location.toString();
    }
    let height = canvas.height;
    let width = canvas.width;
    let dotRadius = ((width + height) / 2) / 100;

    let ctx = canvas.getContext('2d');

    let points = [];
    for (let i = 0; i < 500; i++) {
        let shouldDraw = noise.simplex2(i / width + 20_000, i / height - 50_000);
        if (shouldDraw > -0.5) {
            points.push({ x: width * (1 + noise.simplex2(2 * i / width, i / height)) / 2, y: height * (1 + noise.simplex2((2 * i) / width + 50_952, (i) / width + 750_250)) / 2 })
        } else {
            points.push(null);
        }
    }
    let lastPoint = points[0];
    for (let p of points) {
        if (p !== null) {
            ctx.beginPath();
            ctx.ellipse(
                p.x, p.y,
                dotRadius, dotRadius,
                0, 0, 7
            );
            ctx.fill();
            if (lastPoint !== null) {
                ctx.beginPath();
                ctx.ellipse(
                    (p.x + lastPoint.x) / 2, (p.y + lastPoint.y) / 2,
                    dotRadius, dotRadius,
                    0, 0, 7
                );
                ctx.fill();
            }
        }
        lastPoint = p;
    }

}