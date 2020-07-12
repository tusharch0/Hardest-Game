let dots = [];
let score = 0;
let health = 5;
let status = 0;
let started = false;

if (!localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", 0)
}

let highscore = parseInt(localStorage.getItem("highscore"));

class Dot {
    constructor() {
        this.x = random(10, width - 10);
        this.y = random(-10, -15);
        this.speed = random(1, 10);
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, 20, 20);
        fill(0, 0.5 * 255);
        arc(this.x, this.y, 20, 20, -PI / 2, PI / 2);
        this.y += this.speed;
    }
}

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight).class("game")
}

function draw() {
    if (started) {

        background(0, 5, 65);
        if (frameCount % 5 == 0) dots.push(new Dot());
        if (frameCount % 50 == 0) status = 0
        for (let i = dots.length - 1; i >= 0; i--) {
            let dot = dots[i];
            dot.draw();
            if (dot.x >= mouseX - 50 && dot.x <= mouseX + 50 && dot.y > height - 40) {
                score++;
                dots.splice(i, 1)
                status = 1
            }

            if (dot.y > height + 10) {
                health--;
                dots.splice(i, 1)
                if (health <= 0) {
                    started = false;
                    if (score > highscore) {
                        highscore = score;
                        document.querySelector(".n-hs").style.display = 'block';
                        localStorage.setItem("highscore", highscore)
                    }
                    document.querySelector(".game").style.display = 'none';
                    document.body.style.overflow = 'auto';
                    document.querySelector(".score").innerHTML = score;
                    document.querySelector(".died").style.display = 'block';
                }
            }
        }
        fill(255);
        rect(mouseX - 30, height - 40, 60, 10, 40);

        textAlign(CENTER)
        textFont("Modak")
        textSize(50);
        fill(109);
        text(score.toLocaleString(), width / 2 + 2, 50 - 2);
        text(score.toLocaleString(), width / 2 - 2, 50 - 2);
        text(score.toLocaleString(), width / 2 - 2, 50 + 2);
        text(score.toLocaleString(), width / 2 + 2, 50 + 2);
        fill(255);
        text(score.toLocaleString(), width / 2, 50);

        fill(255, 0.5 * 255);
        rect(0, 0, (health / 5) * width, 10);

        if (status == 1) {
            fill(0, 255, 0, 0.5 * 255);
            rect(50, 50, width - 100, 100);
            fill(255);
            text("+1", width / 2, 115);
        }
        if (status == -1) {
            fill(255, 0, 0, 0.5 * 255);
            rect(50, 50, width - 100, 100);
            fill(255);
            text("-1", width / 2, 115);
        }

    }
}