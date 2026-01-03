// Preload click sound
const clickAudio = new Audio('sound/click.wav');
clickAudio.volume = 0.5;

// Click sound effect using audio file
function playClickSound() {
    try {
        // Clone and play to allow overlapping sounds
        const audio = clickAudio.cloneNode();
        audio.play().catch(function(error) {
            // Silently fail if audio can't be played
        });
    } catch (e) {
        // Silently fail if Audio API is not available
    }
}

window.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars with stagger effect
    const skillBars = document.querySelectorAll('.skills');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.classList.add('active');
        }, index * 150);
        
        // Add hover re-animation effect
        bar.addEventListener('mouseenter', function() {
            const className = this.className;
            // Get the width value from the class
            let width = '0%';
            if (className.includes('draw')) width = '70%';
            else if (className.includes('anim')) width = '82%';
            else if (className.includes('html')) width = '79%';
            else if (className.includes('css')) width = '76%';
            
            // Reset and re-animate
            this.style.width = '0%';
            setTimeout(() => {
                this.style.width = width;
            }, 10);
        });
    });

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
            columns[i % 4].push(`<img src="${img.src}" alt="${img.alt}" data-image style="animation: fadeInUp 0.6s ease-out ${(i % 4) * 0.1}s backwards;">`);
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

        async function getImageDimensions(src) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = function() {
                    resolve({ width: this.width, height: this.height, pixels: this.width * this.height });
                };
                img.onerror = function() {
                    resolve({ width: 0, height: 0, pixels: 0 });
                };
                img.src = src;
            });
        }

        async function sortImagesBySize(images) {
            const imagesWithDimensions = await Promise.all(images.map(async img => {
                const dimensions = await getImageDimensions(img.src);
                return { ...img, ...dimensions };
            }));
            imagesWithDimensions.sort((a, b) => b.pixels - a.pixels);
            return imagesWithDimensions;
        }

        (async function() {
            const sortedDigital = await sortImagesBySize(digitalImages);
            const sortedTraditional = await sortImagesBySize(traditionalImages);
            renderGallery(sortedDigital, "digital-gallery");
            renderGallery(sortedTraditional, "traditional-gallery");
        })();

    var artworksToggle = document.querySelector('.artworks-dropdown-toggle');
    var artworksDropdown = document.querySelector('.artworks-dropdown-content');
    var artworksSubheader = document.querySelector('.subheader:has(.artworks-dropdown-toggle)');
    var dropdownTimeout;
    
    // Click functionality
    if (artworksToggle) artworksToggle.onclick = function(e) {
        playClickSound();
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
    
    // Hover functionality for button
    if (artworksToggle) {
        artworksToggle.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
            if (!artworksDropdown.classList.contains('show')) {
                artworksDropdown.classList.add('show');
            }
        });
        
        artworksToggle.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(function() {
                if (artworksDropdown && !artworksDropdown.matches(':hover')) {
                    artworksDropdown.classList.add('animating-out');
                    setTimeout(function() {
                        artworksDropdown.classList.remove('show');
                        artworksDropdown.classList.remove('animating-out');
                    }, 180);
                }
            }, 150);
        });
    }
    
    // Keep dropdown open when hovering over it
    if (artworksDropdown) {
        artworksDropdown.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
        });
        
        artworksDropdown.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(function() {
                artworksDropdown.classList.add('animating-out');
                setTimeout(function() {
                    artworksDropdown.classList.remove('show');
                    artworksDropdown.classList.remove('animating-out');
                }, 180);
            }, 150);
        });
    }
    
    document.addEventListener('click', function(e) {
        if (
            artworksDropdown && artworksDropdown.classList.contains('show') &&
            !artworksDropdown.contains(e.target) && e.target !== artworksToggle &&
            !artworksSubheader.contains(e.target)
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
            playClickSound();
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
                playClickSound();
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
            playClickSound();
            e.preventDefault();
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('show');
        });
    });
    modal.querySelector('.close').onclick = function(e) {
        playClickSound();
        e.preventDefault();
        modal.classList.remove('show');
        modalImg.src = '';
    };
    modal.onclick = function(e) {
        if (e.target === modal) {
            playClickSound();
            modal.classList.remove('show');
            modalImg.src = '';
        }
    };
    
    // Add click sound to navigation links (except artworks dropdown)
    document.querySelectorAll('.subheader a:not(.artworks-dropdown-content a), .dhenias a').forEach(function(link) {
        link.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Add click sound to artworks dropdown links
    document.querySelectorAll('.artworks-dropdown-content a').forEach(function(link) {
        link.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Add click sound to CTA buttons
    document.querySelectorAll('.cta-button').forEach(function(btn) {
        btn.addEventListener('click', function() {
            playClickSound();
        });
    });
});

window.onscroll = function() {};

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
        playClickSound();
        const current = getMode();
        const next = current === 'light' ? 'dark' : 'light';
        setMode(next);
        localStorage.setItem(storageKey, next);
    }
    setMode(getMode());
    if (modeToggleDesktop) modeToggleDesktop.onclick = toggleMode;
    if (modeToggleMobile) modeToggleMobile.onclick = toggleMode;
})();
