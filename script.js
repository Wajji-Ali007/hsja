
// 1. AOS Scrolling Animations (Repeatable Up & Down)
AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: false,       // Har baar scroll par animate hoga
    mirror: true,      // Upar scroll karne par bhi re-animate hoga
    offset: 80
});

// 2. Light / Dark Mode Toggle Functionality
const themeBtnDesktop = document.getElementById('themeToggleBtn');
const themeBtnMobile = document.getElementById('themeToggleMobile');
const themeIconDesktop = document.getElementById('themeIcon');
const themeIconMobile = document.getElementById('themeIconMobile');
const backBtn = document.getElementById('backToTop');
const htmlElement = document.documentElement;

function updateThemeUI(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark');
        if (themeIconDesktop) { themeIconDesktop.className = 'fa-solid fa-sun'; }
        if (themeIconMobile) { themeIconMobile.className = 'fa-solid fa-sun'; }
        if (backBtn) {
            backBtn.style.backgroundColor = '#111722';
            backBtn.style.color = '#f87171';
        }
    } else {
        htmlElement.classList.remove('dark');
        if (themeIconDesktop) { themeIconDesktop.className = 'fa-solid fa-moon'; }
        if (themeIconMobile) { themeIconMobile.className = 'fa-solid fa-moon'; }
        if (backBtn) {
            backBtn.style.backgroundColor = '#ffffff';
            backBtn.style.color = '#dc2626';
        }
    }
}

// Check saved theme
const savedTheme = localStorage.getItem('hsja_theme') || 'light';
updateThemeUI(savedTheme === 'dark');

function toggleTheme() {
    const isDarkNow = !htmlElement.classList.contains('dark');
    updateThemeUI(isDarkNow);
    localStorage.setItem('hsja_theme', isDarkNow ? 'dark' : 'light');
}

if (themeBtnDesktop) { themeBtnDesktop.addEventListener('click', toggleTheme); }
if (themeBtnMobile) { themeBtnMobile.addEventListener('click', toggleTheme); }

// 3. Top Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// 4. Program Tabs Switcher (Fee & Timings Section)
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = 'tab-btn px-5 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-white/10 transition border border-slate-200 dark:border-white/10';
    });
    const activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) {
        activeTab.className = 'tab-btn px-5 py-2.5 rounded-xl font-bold text-xs bg-red-600 text-white shadow-md transition';
    }

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    const activeContent = document.getElementById('content-' + tabName);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }
}

// 5. FAQs Accordion Toggle
function toggleFaq(id) {
    const ans = document.getElementById('faq-ans-' + id);
    const icon = document.getElementById('faq-icon-' + id);
    if (ans && icon) {
        ans.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

// 6. Mobile Menu Auto-Close & Toggle
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

function closeMobileDrawer() {
    if (mobileMenu && menuIcon) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
}

if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (isHidden) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    });
}

// Auto-close drawer on any link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
});

// 7. Form Submit Simulation
function handleForm(e) {
    e.preventDefault();
    const successBox = document.getElementById('successBox');
    if (successBox) {
        successBox.classList.remove('hidden');
        e.target.reset();
        setTimeout(() => {
            successBox.classList.add('hidden');
        }, 5000);
    }
}
