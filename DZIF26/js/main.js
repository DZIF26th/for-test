function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

// 確保DOM完全載入後才執行
document.addEventListener('DOMContentLoaded', function() {
    closeNav(); // 確保初始狀態是關閉的
});

function scrollToContent() {
    const mainContent = document.getElementById('main-content');
    const offset = -30; // 可以調整這個值來微調最終停止的位置
    const targetPosition = mainContent.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function animateText() {
    const letters = document.querySelectorAll('.letter');

    letters.forEach(letter => {
        letter.style.opacity = '0';
    });
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1';
        }, index * 200);
    });

    const totalDisplayTime = letters.length * 200;

    setTimeout(() => {
        letters.forEach(letter => {
            letter.style.opacity = '0';
        });
        

        setTimeout(animateText, 3000);
    }, totalDisplayTime + 1000);
}
document.addEventListener('DOMContentLoaded', animateText);

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalClose = document.getElementById("modal-close");
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            const title = item.getAttribute("data-title");
            const description = item.getAttribute("data-description");

            modalTitle.textContent = title;
            modalDescription.innerHTML = description;

            modal.classList.add("active");
        });
    });

    modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.getElementById("modal-close");

    document.querySelectorAll(".grid-item").forEach(item => {
        item.addEventListener("click", () => {
            const title = item.getAttribute("data-title");
            const description = item.getAttribute("data-description");
            const image = item.getAttribute("data-image");

            modalTitle.textContent = title;
            modalDescription.innerHTML = description;
            document.getElementById('modal-description').innerHTML = item.getAttribute('data-description');
            modalImage.src = image;

            modal.classList.add("active");
        });
    });

    modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});

document.querySelector('.hamburger').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar-menu');
    const hamburger = this;
    
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelector('.close-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar-menu');
    const hamburger = document.querySelector('.hamburger');
    
    sidebar.classList.remove('active');
    hamburger.classList.remove('active');
});
