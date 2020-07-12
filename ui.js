document.querySelector(".high-score").innerHTML = highscore;

document.querySelector(".play").addEventListener("click", () => {
    started = true;
    document.body.style.overflow = 'hidden';
    document.querySelector(".game").style.display = "block";
    document.querySelectorAll(".page").forEach(el => el.style.display = "none")
})

document.querySelector(".restart").addEventListener("click", () => {
    location.reload();
})