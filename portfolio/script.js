window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skills').forEach(bar => bar.classList.add('active'));

    const digitalImages = [
        { src: "img/artworks/digital/Collab w-vyeranie.png", alt: "Collab w-vyeranie" },
        { src: "img/artworks/digital/Denya - Deya.jpeg", alt: "Denya - Deya" },
        { src: "img/artworks/digital/Denya C.jpg", alt: "Denya C" },
        { src: "img/artworks/digital/vanity-weddingdress.jpg", alt: "Vanity in Wedding Dress" },
        { src: "img/artworks/digital/Enya.png", alt: "Enya" },
        { src: "img/artworks/digital/Fanart @peanutiess_.jpg", alt: "Fanart Peanutiess" },
        { src: "img/artworks/digital/Illustration1.jpg", alt: "Illustration1" },
        { src: "img/artworks/digital/fnr1.png", alt: "Fanart Vanity" },
        { src: "img/artworks/digital/Illustration2.jpg", alt: "Illustration2" },
        { src: "img/artworks/digital/Minya.jpg", alt: "Minya" },
        { src: "img/artworks/digital/Nina.jpg", alt: "Nina" },
        { src: "img/artworks/digital/karasu-goi-profile.png", alt: "Zelus d'Craven" },
        { src: "img/artworks/digital/Zephy.jpg", alt: "Zephy" },
        { src: "img/artworks/digital/Denya12.png", alt: "Denya12" },
        { src: "img/artworks/digital/Collab.jpg", alt: "Collab XI Animasi 1" },
        { src: "img/artworks/digital/ILOVEMYWIFE.png", alt: "ILOVEMYWIFE Trend" },
        { src: "img/artworks/digital/Illustration3.png", alt: "Illustration3" },
        { src: "img/artworks/digital/zombie.png", alt: "Zombie" }
    ];

    const traditionalImages = [
        { src: "img/artworks/traditional/Chainsawman.jpg", alt: "Chainsawman" },
        { src: "img/artworks/traditional/Peni Parker (Meme).jpg", alt: "Peni Parker (Meme)" },
        { src: "img/artworks/traditional/Illustration3.jpg", alt: "Illustration3" },
        { src: "img/artworks/traditional/Ren.jpg", alt: "Ren" },
        { src: "img/artworks/traditional/Illustration4.jpg", alt: "Illustration4" },
        { src: "img/artworks/traditional/Renna.jpg", alt: "Renna" },
        { src: "img/artworks/traditional/Toge Inumaki.jpg", alt: "Toge Inumaki" }
    ];

    function renderGallery(images, galleryId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;
        gallery.innerHTML = "";
        const columns = [[], [], [], []];
        images.forEach((img, i) => {
            columns[i % 4].push(`<img src="${img.src}" alt="${img.alt}" data-image>`);
        });
        columns.forEach(col => {
            const div = document.createElement("div");
            div.className = "column";
            div.innerHTML = col.join("");
            gallery.appendChild(div);
        });
            if (galleryId === "digital-gallery" || galleryId === "traditional-gallery") {
                setTimeout(() => {
                    document.querySelectorAll(`#${galleryId} img[data-image]`).forEach(function(img) {
                        img.addEventListener('click', function(e) {
                            e.preventDefault();
                            var modal = document.getElementById('image-modal');
                            var modalImg = modal.querySelector('img');
                            modalImg.src = img.src;
                            modalImg.alt = img.alt;
                            modal.classList.add('show');
                        });
                    });
                }, 0);
            }
    }

        async function getImageSize(src) {
            try {
                const response = await fetch(src);
                if (!response.ok) return 0;
                const blob = await response.blob();
                return blob.size;
            } catch {
                return 0;
            }
        }

        async function sortImagesBySize(images) {
            const imagesWithSize = await Promise.all(images.map(async img => {
                const size = await getImageSize(img.src);
                return { ...img, size };
            }));
            imagesWithSize.sort((a, b) => b.size - a.size);
            return imagesWithSize;
        }

        (async function() {
            const sortedDigital = await sortImagesBySize(digitalImages);
            const sortedTraditional = await sortImagesBySize(traditionalImages);
            renderGallery(sortedDigital, "digital-gallery");
            renderGallery(sortedTraditional, "traditional-gallery");
        })();

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
