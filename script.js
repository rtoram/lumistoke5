// Carregar imagens do localStorage
const thumbnails = document.getElementById("thumbnail-container");
let images = JSON.parse(localStorage.getItem('savedImages')) || [];

// Função para atualizar miniaturas
function updateThumbnails() {
    thumbnails.innerHTML = "";
    images.forEach((imgSrc, index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("thumbnail");
        img.onclick = () => {
            // Substituir a imagem de fundo
            document.body.style.backgroundImage = `url(${imgSrc})`;
        };
        thumbnails.appendChild(img);
    });
}

// Salvar a imagem selecionada
document.getElementById('bgImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        if (images.length < 4) {
            images.push(e.target.result);
            localStorage.setItem('savedImages', JSON.stringify(images));
            updateThumbnails();
        }
    };
    if (file) reader.readAsDataURL(file);
});

// Função para salvar o conteúdo do editor no localStorage
function saveText() {
    const textContent = document.getElementById("editor").value;
    localStorage.setItem("editorText", textContent);
    alert("Texto salvo!");
}

// Função para salvar o conteúdo em PDF
function savePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const content = document.getElementById("editor").value;
    doc.text(content, 10, 10);
    doc.save("documento.pdf");
}

// Carregar o conteúdo salvo no localStorage
window.onload = function() {
    const savedText = localStorage.getItem("editorText");
    if (savedText) {
        document.getElementById("editor").value = savedText;
    }
    updateThumbnails();
};

// Tocar música
document.getElementById('bgMusic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const music = document.getElementById('music');
        music.src = e.target.result;
        music.play();
        document.getElementById('toggleSound').innerHTML = `
            <svg class="icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3a3.5 3.5 0 0 1-1.5 2.95v-5.9a3.5 3.5 0 0 1 1.5 2.95zm2.5 0a6 6 0 0 1-2.5 4.9v-9.8a6 6 0 0 1 2.5 4.9z"/></svg>
        `;
    };
    if (file) reader.readAsDataURL(file);
});

// Controlar o som
let musicPlaying = false;
document.getElementById('toggleSound').addEventListener('click', function() {
    const music = document.getElementById('music');
    if (musicPlaying) {
        music.pause();
        document.getElementById('toggleSound').innerHTML = `
            <svg class="icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3a3.5 3.5 0 0 1-1.5 2.95v-5.9a3.5 3.5 0 0 1 1.5 2.95zm2.5 0a6 6 0 0 1-2.5 4.9v-9.8a6 6 0 0 1 2.5 4.9z"/></svg>
        `;
        musicPlaying = false;
    } else {
        music.play();
        document.getElementById('toggleSound').innerHTML = `
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/></svg>
        `;
        musicPlaying = true;
    }
});

// Função para aplicar negrito
function toggleBold() {
    document.execCommand('bold');
}

// Função para aplicar itálico
function toggleItalic() {
    document.execCommand('italic');
}

// Função para aplicar sublinhado
function toggleUnderline() {
    document.execCommand('underline');
}

// Função para mudar o tamanho da fonte
function changeFontSize() {
    const size = document.getElementById("fontSize").value;
    document.getElementById("editor").style.fontSize = size + "px";
}

// Função para mudar a cor do texto
function changeFontColor() {
    const color = document.getElementById("fontColor").value;
    document.getElementById("editor").style.color = color;
}
