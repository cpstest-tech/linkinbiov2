// Carica configurazione dinamica
(()=>{
  if(typeof siteConfig === 'undefined') return;

  // Aggiorna profilo
  const handle = document.querySelector('.handle');
  const lines = document.querySelectorAll('.line');
  if(handle) handle.textContent = siteConfig.profile.username;
  if(lines[0]) lines[0].textContent = siteConfig.profile.bio;
  if(lines[1]) lines[1].textContent = siteConfig.profile.bioSecondary;

  // Aggiorna dimensioni memoji
  if(siteConfig.profile.memojiSize) {
    document.documentElement.style.setProperty('--memoji-width', siteConfig.profile.memojiSize.width);
    document.documentElement.style.setProperty('--memoji-height', siteConfig.profile.memojiSize.height);
    
    // Dimensioni per mobile se specificate
    if(siteConfig.profile.memojiSize.mobile) {
      document.documentElement.style.setProperty('--memoji-width-mobile', siteConfig.profile.memojiSize.mobile.width);
      document.documentElement.style.setProperty('--memoji-height-mobile', siteConfig.profile.memojiSize.mobile.height);
    }
  }

  // Aggiorna link social
  const socials = document.querySelectorAll('.socials a');
  if(socials[0]) socials[0].href = siteConfig.social.tiktok;
  if(socials[1]) socials[1].href = siteConfig.social.youtube;
  if(socials[2]) socials[2].href = siteConfig.social.instagram;

  // Aggiorna link bottoni
  const links = document.querySelectorAll('.links a.link');
  siteConfig.links.forEach((linkConfig, index) => {
    if(links[index]){
      links[index].href = linkConfig.url;
      const title = links[index].querySelector('.title');
      if(title) title.textContent = linkConfig.title;
      const subtitle = links[index].querySelector('.sub');
      if(subtitle && linkConfig.subtitle){
        subtitle.textContent = linkConfig.subtitle;
      }
    }
  });

  // Effetto tilt (opzionale)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce){
    const max=10;
    document.querySelectorAll('.tilt').forEach(el=>{
      let rect; const upd=()=>rect=el.getBoundingClientRect();
      upd(); window.addEventListener('resize',upd);
      function move(e){
        if(!rect) return;
        const cx=rect.left+rect.width/2;
        const cy=rect.top+rect.height/2;
        const x=(e.clientX-cx)/(rect.width/2);
        const y=(e.clientY-cy)/(rect.height/2);
        el.style.transform=`rotateX(${-y*max}deg) rotateY(${x*max}deg)`;
      }
      function leave(){ el.style.transform=''; }
      el.addEventListener('mousemove',move);
      el.addEventListener('mouseleave',leave);
    });
  }
})();
