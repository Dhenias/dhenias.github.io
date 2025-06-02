window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skills').forEach(bar => bar.classList.add('active'));

    var artworksToggle = document.querySelector('.artworks-dropdown-toggle');
    var artworksDropdown = document.querySelector('.artworks-dropdown-content');
    if (artworksToggle) artworksToggle.onclick = function(e) {
        e.stopPropagation();
        if (artworksDropdown.classList.contains('show')) {
            artworksDropdown.classList.add('animating-out');
            setTimeout(function() {
                artworksDropdown.classList.remove('show');
                artworksDropdown.classList.remove('animating-out');
            }, 180);
        } else {
            artworksDropdown.classList.add('show');
        }
    };
    document.addEventListener('click', function(e) {
        if (
            artworksDropdown && artworksDropdown.classList.contains('show') &&
            !artworksDropdown.contains(e.target) && e.target !== artworksToggle
        ) {
            artworksDropdown.classList.add('animating-out');
            setTimeout(function() {
                artworksDropdown.classList.remove('show');
                artworksDropdown.classList.remove('animating-out');
            }, 180);
        }
    });

    if (artworksDropdown) {
        artworksDropdown.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                artworksDropdown.classList.add('animating-out');
                setTimeout(function() {
                    artworksDropdown.classList.remove('show');
                    artworksDropdown.classList.remove('animating-out');
                }, 180);
            });
        });
    }

    var toggle = document.getElementById('menu-toggle');
    var dropdown = document.getElementById('mobile-dropdown');

    function hideDropdownWithAnimation() {
        if (!dropdown.classList.contains('show')) return;
        dropdown.classList.remove('animating-out');
        dropdown.classList.add('animating-out');
        setTimeout(function() {
            dropdown.classList.remove('show');
            dropdown.classList.remove('animating-out');
        }, 250);
    }

    function showDropdownWithAnimation() {
        dropdown.classList.remove('animating-out');
        dropdown.classList.add('show');
    }

    if (toggle) {
        toggle.onclick = function(e) {
            e.stopPropagation();
            if (dropdown.classList.contains('show')) {
                hideDropdownWithAnimation();
            } else {
                showDropdownWithAnimation();
            }
        };
    }
    document.addEventListener('click', function(e) {
        if (
            dropdown && dropdown.classList.contains('show') &&
            !dropdown.contains(e.target) &&
            e.target !== toggle
        ) {
            hideDropdownWithAnimation();
        }
    });

    if (dropdown) {
        dropdown.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hideDropdownWithAnimation();
            });
        });
        dropdown.addEventListener('click', function(e) {
            if (e.target === dropdown) {
                hideDropdownWithAnimation();
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1000 && dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            dropdown.classList.remove('animating-out');
        }
    });

    var modal = document.getElementById('image-modal');
    var modalImg = modal.querySelector('img');
    document.querySelectorAll('img[data-image]').forEach(function(img) {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('show');
        });
    });
    modal.querySelector('.close').onclick = function(e) {
        e.preventDefault();
        modal.classList.remove('show');
        modalImg.src = '';
    };
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            modalImg.src = '';
        }
    };
});

window.onscroll = function() {stickyHeader();};

var header = document.getElementById("header");
var sticky = header.offsetTop;
var body = document.querySelector('.body');
var headerHeight = header.offsetHeight;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    if (body) body.style.paddingTop = headerHeight + "px";
  } else {
    header.classList.remove("sticky");
    if (body) body.style.paddingTop = "";
  }
}

(function() {
    const body = document.body;
    const modeToggleDesktop = document.getElementById('mode-toggle-desktop');
    const modeToggleMobile = document.getElementById('mode-toggle-mobile');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storageKey = 'dhenias-mode';
    function setMode(mode) {
        if (mode === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        }
        updateIcons(mode);
    }
    function updateIcons(mode) {
        const sun = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
        const moon = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>`;
        const icon = mode === 'light' ? sun : moon;
        document.querySelectorAll('.mode-toggle-btn .mode-icon').forEach(el => el.innerHTML = icon);
    }
    function getMode() {
        return localStorage.getItem(storageKey) || (prefersDark ? 'dark' : 'light');
    }
    function toggleMode() {
        const current = getMode();
        const next = current === 'light' ? 'dark' : 'light';
        setMode(next);
        localStorage.setItem(storageKey, next);
    }
    setMode(getMode());
    if (modeToggleDesktop) modeToggleDesktop.onclick = toggleMode;
    if (modeToggleMobile) modeToggleMobile.onclick = toggleMode;
})();
