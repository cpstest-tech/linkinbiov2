// Carica configurazione dinamica
(() => {
  if (typeof siteConfig === 'undefined') return;

  // Aggiorna profilo
  const handle = document.querySelector('.handle');
  const lines = document.querySelectorAll('.line');
  if (handle) handle.textContent = siteConfig.profile.username;
  if (lines[0]) lines[0].textContent = siteConfig.profile.bio;
  if (lines[1]) lines[1].textContent = siteConfig.profile.bioSecondary;

  // Aggiorna dimensioni memoji
  if (siteConfig.profile.memojiSize) {
    document.documentElement.style.setProperty('--memoji-width', siteConfig.profile.memojiSize.width);
    document.documentElement.style.setProperty('--memoji-height', siteConfig.profile.memojiSize.height);

    // Dimensioni per mobile se specificate
    if (siteConfig.profile.memojiSize.mobile) {
      document.documentElement.style.setProperty('--memoji-width-mobile', siteConfig.profile.memojiSize.mobile.width);
      document.documentElement.style.setProperty('--memoji-height-mobile', siteConfig.profile.memojiSize.mobile.height);
    }
  }

  // Aggiorna link social
  const socials = document.querySelectorAll('.socials a');
  socials.forEach(a => {
      const type = a.dataset.social;
      if (siteConfig.social && siteConfig.social[type]) {
          a.href = siteConfig.social[type];
      }
  });

  // Rigenera i link
  const linksContainer = document.querySelector('.links');
  if (linksContainer && siteConfig.links) {
    linksContainer.innerHTML = ''; // Pulisce i link esistenti

    siteConfig.links.forEach((linkConfig) => {
      const a = document.createElement('a');
      a.href = linkConfig.url;
      a.className = 'link';
      a.dataset.type = linkConfig.type;

      // Icona
      const chip = document.createElement('div');
      chip.className = 'chip';
      const i = document.createElement('i');
      i.className = linkConfig.icon || 'fas fa-link'; // Fallback icon
      chip.appendChild(i);
      a.appendChild(chip);

      // Label (Titolo + Sottotitolo)
      const label = document.createElement('div');
      label.className = 'label';

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = linkConfig.title;
      label.appendChild(title);

      if (linkConfig.subtitle) {
        const sub = document.createElement('div');
        sub.className = 'sub';
        sub.textContent = linkConfig.subtitle;
        label.appendChild(sub);
      }
      a.appendChild(label);

      // Freccia
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.textContent = '→';
      a.appendChild(arrow);

      linksContainer.appendChild(a);
    });
  }

  // Genera Carosello Sponsor
  const carouselContainer = document.querySelector('.sponsors-carousel');
  if (carouselContainer && siteConfig.sponsors && siteConfig.sponsors.length > 0) {
    carouselContainer.innerHTML = '';
    
    const track = document.createElement('div');
    track.className = 'carousel-track';
    
    siteConfig.sponsors.forEach((sponsor, index) => {
      const slide = document.createElement('a');
      slide.href = sponsor.url;
      slide.className = 'carousel-slide';
      slide.target = '_blank';
      
      const img = document.createElement('img');
      img.src = sponsor.image;
      img.alt = sponsor.title;
      // Fallback in caso di immagine mancante
      img.onerror = () => { img.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop'; };
      
      const content = document.createElement('div');
      content.className = 'carousel-content';
      
      const title = document.createElement('h3');
      title.textContent = sponsor.title;
      
      const desc = document.createElement('p');
      desc.textContent = sponsor.description;
      
      content.appendChild(title);
      content.appendChild(desc);
      
      slide.appendChild(img);
      slide.appendChild(content);
      track.appendChild(slide);
    });
    
    carouselContainer.appendChild(track);
    
    // Aggiungi controlli se ci sono più di 1 sponsor
    if (siteConfig.sponsors.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-btn prev';
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-btn next';
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      
      siteConfig.sponsors.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = i === 0 ? 'carousel-dot active' : 'carousel-dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
      
      carouselContainer.appendChild(prevBtn);
      carouselContainer.appendChild(nextBtn);
      carouselContainer.appendChild(dotsContainer);
      
      let currentSlide = 0;
      let slideInterval;
      
      const updateSlides = () => {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      };
      
      const nextSlide = () => {
        currentSlide = (currentSlide + 1) % siteConfig.sponsors.length;
        updateSlides();
      };
      
      const prevSlide = () => {
        currentSlide = (currentSlide - 1 + siteConfig.sponsors.length) % siteConfig.sponsors.length;
        updateSlides();
      };
      
      const goToSlide = (i) => {
        currentSlide = i;
        updateSlides();
        resetInterval();
      };
      
      const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
      };
      
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetInterval();
      });
      
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetInterval();
      });
      
      // Swipe support per mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});
      
      carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          nextSlide();
          resetInterval();
        } else if (touchEndX - touchStartX > 50) {
          prevSlide();
          resetInterval();
        }
      }, {passive: true});
      
      resetInterval();
    }
  }

  // Genera lista Bottom Sheet
  const sheetContent = document.querySelector('.sheet-content');
  if (sheetContent && siteConfig.sponsors) {
      sheetContent.innerHTML = '';
      siteConfig.sponsors.forEach(sponsor => {
          const a = document.createElement('a');
          a.href = sponsor.url;
          a.className = 'sheet-item';
          a.target = '_blank';
          
          const img = document.createElement('img');
          img.src = sponsor.image;
          img.alt = sponsor.title;
          img.onerror = () => { img.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop'; };
          
          const textDiv = document.createElement('div');
          textDiv.className = 'sheet-text';
          
          const title = document.createElement('h4');
          title.textContent = sponsor.title;
          
          const desc = document.createElement('p');
          desc.textContent = sponsor.description;
          
          textDiv.appendChild(title);
          textDiv.appendChild(desc);
          
          a.appendChild(img);
          a.appendChild(textDiv);
          
          const arrow = document.createElement('i');
          arrow.className = 'fas fa-chevron-right sheet-arrow';
          a.appendChild(arrow);
          
          sheetContent.appendChild(a);
      });
  }

  // Bottom Sheet Logic
  const openBtn = document.getElementById('open-sponsors-sheet');
  const closeBtn = document.getElementById('close-sponsors-sheet');
  const overlay = document.getElementById('sponsors-overlay');
  const sheet = document.getElementById('sponsors-sheet');

  if(openBtn && sheet && overlay) {
      const openSheet = () => {
          sheet.classList.add('active');
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
      };
      
      const closeSheet = () => {
          sheet.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
      };

      openBtn.addEventListener('click', openSheet);
      closeBtn.addEventListener('click', closeSheet);
      overlay.addEventListener('click', closeSheet);
  }

  // Effetto tilt (opzionale)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    const max = 10;
    document.querySelectorAll('.tilt').forEach(el => {
      let rect; const upd = () => rect = el.getBoundingClientRect();
      upd(); window.addEventListener('resize', upd);
      function move(e) {
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const x = (e.clientX - cx) / (rect.width / 2);
        const y = (e.clientY - cy) / (rect.height / 2);
        el.style.transform = `rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
      }
      function leave() { el.style.transform = ''; }
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
    });
  }
})();
