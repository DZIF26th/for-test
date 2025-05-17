function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

// 等待DOM完全加載後再執行JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 初始化側邊欄
    closeNav();
    
    // 初始化文字動畫，確保元素存在
    if (document.querySelectorAll('.letter').length > 0) {
        animateText();
    }
    
    // 初始化模態框功能，只在需要時執行
    initializeModal();
    
    // 初始化滾動顯示動畫
    initializeScrollReveal();
    
    // 設置介紹段落的索引
    const introSection = document.getElementById('intro');
    if (introSection) {
        const introParagraphs = introSection.querySelectorAll('p');
        introParagraphs.forEach((p, index) => {
            p.style.setProperty('--paragraph-index', index);
        });
        
        // 檢查是否在視窗內，如果是則觸發動畫
        const rect = introSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                introSection.classList.add('reveal');
            }, 500);
        }
    }
    
    // 添加滾動事件監聽器
    window.addEventListener('scroll', function() {
        const introSection = document.getElementById('intro');
        if (introSection) {
            const rect = introSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                introSection.classList.add('reveal');
            }
        }
    });
    
    // 為捲動按鈕添加事件監聽器
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', scrollToContent);
    }
});

function scrollToContent() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    const offset = -30; 
    const targetPosition = mainContent.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function animateText() {
    const letters = document.querySelectorAll('.letter');
    if (!letters || letters.length === 0) return;
    
    // Cache the letters length to avoid recalculating in the loop
    const lettersLength = letters.length;
    
    // Reset all letters to invisible
    for (let i = 0; i < lettersLength; i++) {
        letters[i].style.opacity = '0';
    }
    
    // Animate each letter with a delay
    for (let i = 0; i < lettersLength; i++) {
        setTimeout(() => {
            if (letters[i]) {  // 確保元素仍然存在
                letters[i].style.opacity = '1';
            }
        }, i * 150);  // 減少延遲時間讓動畫更快
    }

    // 計算顯示所有字母所需的總時間
    const totalDisplayTime = lettersLength * 150;
    
    // 在文字完全顯示後保持更長時間（增加到5秒）
    setTimeout(() => {
        // 檢查元素是否仍然存在後再隱藏字母
        if (document.querySelectorAll('.letter').length > 0) {
            // Hide all letters
            for (let i = 0; i < lettersLength; i++) {
                if (letters[i]) {
                    letters[i].style.opacity = '0';
                }
            }
            
            // 增加重新啟動動畫前的延遲（增加到5秒）
            setTimeout(() => {
                // 再次檢查元素是否存在
                if (document.querySelectorAll('.letter').length > 0) {
                    animateText();
                }
            }, 5000);
        }
    }, totalDisplayTime + 5000);  // 最後一個字母出現後保持5秒
}

// Consolidated modal functionality
function initializeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return; // Exit if modal doesn't exist on this page
    
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.getElementById("modal-close");

    // Event delegation for grid items
    document.addEventListener('click', function(e) {
        const gridItem = e.target.closest('.grid-item');
        if (gridItem) {
            const title = gridItem.getAttribute("data-title");
            const description = gridItem.getAttribute("data-description");
            const image = gridItem.getAttribute("data-image");

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.innerHTML = description;
            
            if (modalImage && image) {
                modalImage.src = image;
            }

            modal.classList.add("active");
        }
    });

    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

// 初始化側邊欄導航功能
const initSidebar = (function() {
    // 等待DOM完全載入
    document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.querySelector('.sidebar-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (!sidebar || !hamburger) return;
        
        // 使用事件委派提高性能
        document.addEventListener('click', function(e) {
            // 處理漢堡圖示點擊
            if (e.target.closest('.hamburger')) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!sidebar.classList.contains('transitioning')) {
                    sidebar.classList.add('transitioning');
                    sidebar.classList.toggle('active');
                    hamburger.classList.toggle('active');
                    
                    setTimeout(() => {
                        sidebar.classList.remove('transitioning');
                    }, 300);
                }
            }
            
            // 處理關閉按鈕點擊
            else if (e.target.closest('.close-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!sidebar.classList.contains('transitioning')) {
                    sidebar.classList.add('transitioning');
                    sidebar.classList.remove('active');
                    hamburger.classList.remove('active');
                    
                    setTimeout(() => {
                        sidebar.classList.remove('transitioning');
                    }, 300);
                }
            }
            
            // 處理點擊側邊欄外部
            else {
                if (sidebar && sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    !hamburger.contains(e.target)) {
                    
                    sidebar.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    return {}; // 返回空對象以便擴展
})();

// 滾動顯示動畫
function initializeScrollReveal() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;
    
    // 初始化時隱藏所有區塊
    sections.forEach(section => {
        section.classList.remove('reveal');
        
        // 為介紹部分的段落設置初始狀態
        if (section.id === 'intro') {
            const paragraphs = section.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                p.style.setProperty('--paragraph-index', index);
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
            });
        }
    });
    
    // 創建一個新的交叉觀察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 只在元素進入視圖時添加reveal類
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // 如果這是介紹部分，為錯開動畫設置段落索引
                if (entry.target.id === 'intro') {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        p.style.setProperty('--paragraph-index', index);
                    });
                }
                
                // 元素已顯示後，不再需要觀察它
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // 使用視口作為根
        threshold: 0.15, // 當至少15%的元素可見時觸發，增加門檻確保更多內容進入視圖
        rootMargin: '0px 0px -50px 0px' // 調整觸發時機，使元素更靠近視圖中心時才顯示
    });
    
    // 觀察所有section元素
    sections.forEach(section => {
        observer.observe(section);
    });
}
