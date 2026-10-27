const btn = document.querySelector("#theme-toggle");
console.log(btn);

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");

let galleryContainer = null;
let jsonPath = "";

if (document.querySelector("#gallery-container")) {
    galleryContainer = document.querySelector("#gallery-container");
    jsonPath = "comics.json";
} else if (document.querySelector("#sketch-container")) {
    galleryContainer = document.querySelector("#sketch-container");
    jsonPath = "sketches.json";
} else if (document.querySelector("#finished-container")) {
    galleryContainer = document.querySelector("#finished-container");
    jsonPath = "finished.json";
} else if (document.querySelector("#photos-container")) {
    galleryContainer = document.querySelector("#photos-container");
    jsonPath = "photos.json";
}


if (galleryContainer) {
    // 去请求对应的 JSON 文件
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            // 把数据变成 HTML 塞进去
            data.forEach(item => {
                const html = `
                    <figure>
                        <img src="${item.src}" alt="${item.title}">
                        <figcaption>
                            <h3>${item.title}</h3>
                            <p>${item.date} | ${item.desc}</p>
                        </figcaption>
                    </figure>
                `;
                galleryContainer.innerHTML += html; 
            });

            // ⚠️ 关键：等图片生成到页面上之后，再绑定点击放大事件
            const allImages = galleryContainer.querySelectorAll("img");
            allImages.forEach(img => {
                img.addEventListener('click', () => {
                    lightbox.style.display = 'flex'; 
                    lightboxImg.src = img.src; 
                });
            });
        })
        .catch(error => {
            console.error("加载数据出错啦：", error);
        });
}  

if (lightbox) {
    lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    });
}


if (btn) {
    btn.addEventListener("click", function () {
        console.log("被点击了");
        document.body.classList.toggle("dark");
    });
}

