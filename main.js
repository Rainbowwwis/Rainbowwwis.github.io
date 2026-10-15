const btn = document.querySelector("#theme-toggle");
console.log(btn);

btn.addEventListener("click", function () {
    console.log("被点击了");
    document.body.classList.toggle("dark");
});

