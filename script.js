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
  if (socials[0]) socials[0].href = siteConfig.social.tiktok;
  if (socials[1]) socials[1].href = siteConfig.social.youtube;
  if (socials[2]) socials[2].href = siteConfig.social.instagram;

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
