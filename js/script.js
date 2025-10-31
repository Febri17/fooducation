const slides = document.querySelectorAll(".hero-slider .slide");
let slideIndex = 0;
let slideInterval; 

function showSlide() {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === slideIndex) {
            slide.classList.add("active");
        }
    });
    slideIndex = (slideIndex + 1) % slides.length;
}

function startSlider() {
    if (slides.length > 0) {
        if (slideInterval) clearInterval(slideInterval); 
        showSlide(); 
        slideInterval = setInterval(showSlide, 5000); 
    }
}

const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");

if (menuIcon && sidebar) {
    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation(); 
        sidebar.classList.add("active");
    });

    document.addEventListener("click", (e) => {
        if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== menuIcon) {
            sidebar.classList.remove("active");
        }
    });

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    });
}

const typewriterElement = document.getElementById('typewriter-text');
const texts = ["Dengan FooDucation", "Edukasi Pangan", "Cerdas Pangan"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    let displayText = currentText.substring(0, charIndex);

    if (typewriterElement) {
        typewriterElement.textContent = displayText;
    } else {
        return;
    }

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500); 
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; 
            setTimeout(typeWriter, 500); 
            return;
        }
    }

    const typingSpeed = isDeleting ? 50 : 150; 
    setTimeout(typeWriter, typingSpeed);
}

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const modalTriggers = document.querySelectorAll('.detail-btn, .read-btn');
const showVideoBtn = document.getElementById("show-video-btn");
const backToDetailsBtn = document.getElementById("back-to-details-btn");
const youtubeFrame = document.getElementById("youtube-frame");
const videoOfTitle = document.getElementById("video-of-title");
const dataJenis = document.getElementById("data-jenis");
const dataKalori = document.getElementById("data-kalori");
const dataMineral = document.getElementById("data-mineral");
const dataVitamin = document.getElementById("data-vitamin");
const dataSerat = document.getElementById("data-serat");
const dataProtein = document.getElementById("data-protein");
const beritaDescFull = document.getElementById("berita-desc-full");
const dataDescPangan = document.getElementById("data-desc-pangan");
const dataTitlePangan = document.getElementById("data-title-pangan");


function resetVideoModal() {
    if (youtubeFrame) youtubeFrame.src = "";
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('show-video');
            modalContent.classList.remove('has-video');
        }
    }
    if (videoOfTitle) videoOfTitle.textContent = "";
}


if (modal) {
    modalTriggers.forEach(btn => {
        btn.addEventListener('click', function() {
            const isPangan = this.classList.contains('detail-btn');
            const videoUrl = this.getAttribute('data-video');
            
            resetVideoModal(); 
            const title = this.getAttribute('data-title');
            modalTitle.textContent = title;
            modalImg.src = this.getAttribute('data-img');
            if (isPangan) {
                modal.querySelector('.modal-content').classList.add('is-pangan');
                if (beritaDescFull) beritaDescFull.textContent = ''; 
                if (dataTitlePangan) dataTitlePangan.textContent = title; 
                if (dataJenis) dataJenis.textContent = this.getAttribute('data-jenis') || 'N/A';
                if (dataKalori) dataKalori.textContent = this.getAttribute('data-kalori') || 'N/A';
                if (dataMineral) dataMineral.textContent = this.getAttribute('data-mineral') || 'N/A';
                if (dataVitamin) dataVitamin.textContent = this.getAttribute('data-vitamin') || 'N/A';
                if (dataSerat) dataSerat.textContent = this.getAttribute('data-serat') || 'N/A';
                if (dataProtein) dataProtein.textContent = this.getAttribute('data-protein') || 'N/A';
                if (dataDescPangan) dataDescPangan.textContent = this.getAttribute('data-desc') || 'Tidak ada deskripsi.';
                
            } else {
                modal.querySelector('.modal-content').classList.remove('is-pangan');
                if (dataDescPangan) dataDescPangan.textContent = ''; 
                if (beritaDescFull) beritaDescFull.textContent = this.getAttribute('data-desc') || 'Tidak ada isi berita.';
            }
            if (videoUrl && youtubeFrame) {
                youtubeFrame.setAttribute('data-video-url', videoUrl); 
                modal.querySelector('.modal-content').classList.add('has-video');
                if (videoOfTitle) videoOfTitle.textContent = title;
            }
            modal.style.display = "flex";
            document.body.style.overflow = 'hidden'; 
            if (slideInterval) clearInterval(slideInterval); 
        });
    });

    if (showVideoBtn && youtubeFrame) {
        showVideoBtn.addEventListener('click', () => {
            const videoUrl = youtubeFrame.getAttribute('data-video-url');
            if (videoUrl) {
                youtubeFrame.src = videoUrl; 
            }
            modal.querySelector('.modal-content').classList.add('show-video');
        });
    }

    if (backToDetailsBtn) {
        backToDetailsBtn.addEventListener('click', () => {
            modal.querySelector('.modal-content').classList.remove('show-video');
            if (youtubeFrame) youtubeFrame.src = "";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            resetVideoModal(); 
            if (slides.length > 0) startSlider(); 
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            resetVideoModal(); 
            if (slides.length > 0) startSlider(); 
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if(typewriterElement) {
        typeWriter();
    }
    if(slides.length > 0) {
        startSlider();
    }
});