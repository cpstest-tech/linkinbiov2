# 🎨 Guida Completa alla Personalizzazione

## 📋 Indice
1. [Personalizzazione Rapida](#personalizzazione-rapida)
2. [Modifica dei Link](#modifica-dei-link)
3. [Cambio Colori e Stili](#cambio-colori-e-stili)
4. [Aggiungere/Rimuovere Bottoni](#aggiungere-rimuovere-bottoni)
5. [Deploy Online](#deploy-online)

---

## 🚀 Personalizzazione Rapida

### Metodo 1: Usa config.js (Consigliato)

Apri il file **`config.js`** e modifica i valori:

```javascript
const siteConfig = {
    profile: {
        emoji: "👋🏻",              // Cambia l'emoji
        username: "cpstest_",        // Cambia username
        bio: "Ciao, sono Paolo 🇮🇹", // Cambia la bio
        bioSecondary: "Parlo di 📱e💻" // Seconda riga bio
    },
    
    social: {
        tiktok: "https://tiktok.com/@tuo_username",
        youtube: "https://youtube.com/@tuo_canale",
        instagram: "https://instagram.com/tuo_profilo"
    },
    
    links: [
        {
            title: "Titolo Bottone",
            subtitle: "Descrizione (opzionale)",
            url: "https://tuo-link.com",
            type: "gradient" // o "telegram", "discord", "amazon", "temu"
        }
    ]
};
```

Salva il file e ricarica la pagina! ✅

### Metodo 2: Modifica Diretta HTML

Apri **`index.html`** e modifica direttamente i testi:

```html
<h1 class="username">TUO_USERNAME</h1>
<p class="bio">La tua bio qui</p>
```

---

## 🔗 Modifica dei Link

### Link Social (Icone in alto)

Nel file `index.html`, cerca questa sezione:

```html
<div class="social-icons">
    <a href="https://tiktok.com/@tuousername" class="social-icon">
        <i class="fab fa-tiktok"></i>
    </a>
    <a href="https://youtube.com/@tuocanale" class="social-icon">
        <i class="fab fa-youtube"></i>
    </a>
    <a href="https://instagram.com/tuoprofilo" class="social-icon">
        <i class="fab fa-instagram"></i>
    </a>
</div>
```

Sostituisci gli URL con i tuoi link reali!

### Link Bottoni

Cerca ogni `<a href="#"` e sostituisci il `#` con il tuo link:

```html
<a href="https://tuosito.com" class="link-button glass-effect gradient-button">
```

---

## 🎨 Cambio Colori e Stili

### Modificare i Colori dei Gradienti

Apri **`styles.css`** e trova la sezione profile card:

```css
.profile-card::before {
    background: linear-gradient(135deg, 
        #ff0080 0%,    /* Rosa magenta */
        #a855f7 25%,   /* Viola */
        #3b82f6 50%,   /* Blu */
        #10b981 75%,   /* Verde */
        #06b6d4 100%   /* Cyan */
    );
}
```

Cambia questi codici colore hex con i tuoi preferiti!

### Colori del Bottone Build PC

```css
.gradient-button::after {
    background: linear-gradient(135deg, 
        rgba(255, 0, 128, 0.7) 0%,
        rgba(168, 85, 247, 0.7) 33%,
        rgba(59, 130, 246, 0.7) 66%,
        rgba(16, 185, 129, 0.7) 100%
    );
}
```

### Colori Bottoni Individuali

**Telegram (Blu):**
```css
.telegram-icon {
    background: rgba(41, 171, 226, 0.4);
    color: #5dccf5;
}
```

**Discord (Viola):**
```css
.discord-icon {
    background: rgba(114, 137, 218, 0.4);
    color: #8ea1e1;
}
```

**Amazon (Oro):**
```css
.amazon-icon {
    background: rgba(180, 150, 100, 0.4);
    color: #d4b896;
}
```

**Temu (Salmone):**
```css
.temu-icon {
    background: rgba(220, 130, 120, 0.4);
    color: #f5b5a8;
}
```

---

## ➕ Aggiungere/Rimuovere Bottoni

### Aggiungere un Nuovo Bottone

1. Copia questo template nel file `index.html`:

```html
<a href="TUO_LINK_QUI" class="link-button glass-effect nuovo-button">
    <div class="button-icon nuovo-icon">
        <i class="fas fa-star"></i> <!-- Cambia icona -->
    </div>
    <div class="button-content">
        <span class="button-title">Titolo Bottone</span>
    </div>
    <div class="button-arrow">
        <i class="fas fa-arrow-right"></i>
    </div>
</a>
```

2. Aggiungi lo stile in `styles.css`:

```css
/* Nuovo Bottone */
.nuovo-button {
    overflow: visible;
}

.nuovo-button:hover {
    background: rgba(255, 100, 200, 0.2);
}

.nuovo-icon {
    background: rgba(255, 100, 200, 0.4);
    color: #ff64c8;
    border: 1px solid rgba(255, 100, 200, 0.4);
    box-shadow: 0 0 20px rgba(255, 100, 200, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.nuovo-button::after {
    content: '';
    position: absolute;
    inset: -25px;
    border-radius: 28px;
    background: rgba(255, 100, 200, 0.4);
    filter: blur(35px);
    opacity: 0.5;
    z-index: -1;
    transition: all 0.3s ease;
}

.nuovo-button:hover::after {
    opacity: 0.8;
    filter: blur(40px);
}
```

### Rimuovere un Bottone

Elimina il blocco `<a href...>...</a>` completo dal file `index.html`.

---

## 🌐 Deploy Online (Gratis)

### Metodo 1: GitHub Pages

1. Crea un account su [GitHub](https://github.com)
2. Crea un nuovo repository chiamato `username.github.io`
3. Carica i file (`index.html`, `styles.css`, `config.js`)
4. Vai su Settings > Pages
5. Seleziona la branch main
6. Il tuo sito sarà live su `https://username.github.io`

### Metodo 2: Netlify

1. Vai su [netlify.com](https://netlify.com)
2. Trascina la cartella del progetto
3. Il sito sarà online in pochi secondi!
4. Puoi collegare un dominio personalizzato gratis

### Metodo 3: Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Connetti il tuo GitHub o carica i file
3. Deploy automatico in 30 secondi
4. SSL gratuito incluso

---

## 📱 Icone Font Awesome

Per cambiare le icone, usa i codici Font Awesome:

- **TikTok:** `<i class="fab fa-tiktok"></i>`
- **YouTube:** `<i class="fab fa-youtube"></i>`
- **Instagram:** `<i class="fab fa-instagram"></i>`
- **Twitter/X:** `<i class="fab fa-x-twitter"></i>`
- **Facebook:** `<i class="fab fa-facebook"></i>`
- **LinkedIn:** `<i class="fab fa-linkedin"></i>`
- **Twitch:** `<i class="fab fa-twitch"></i>`
- **GitHub:** `<i class="fab fa-github"></i>`
- **Email:** `<i class="fas fa-envelope"></i>`
- **WhatsApp:** `<i class="fab fa-whatsapp"></i>`
- **Telegram:** `<i class="fab fa-telegram"></i>`
- **Discord:** `<i class="fab fa-discord"></i>`
- **Shopping:** `<i class="fas fa-shopping-bag"></i>`
- **Star:** `<i class="fas fa-star"></i>`
- **Heart:** `<i class="fas fa-heart"></i>`
- **Computer:** `<i class="fas fa-desktop"></i>`

Trova altre icone su: [fontawesome.com/icons](https://fontawesome.com/icons)

---

## 🎯 Tips Avanzati

### Cambiare Velocità Animazioni

In `styles.css`, modifica questi valori:

```css
/* Velocità rotazione gradiente */
animation: rotateGradient 6s linear infinite;  /* Cambia 6s */

/* Velocità pulse */
animation: pulse 3s ease-in-out infinite;  /* Cambia 3s */

/* Velocità movimento orbs background */
animation: float 20s infinite ease-in-out;  /* Cambia 20s */
```

### Intensità Glow

Aumenta/diminuisci questi valori:

```css
filter: blur(60px) brightness(1.3);  /* Più blur = più glow */
opacity: 1;  /* 0-1, più alto = più visibile */
```

### Border Radius (Arrotondamento)

```css
border-radius: 28px;  /* Più alto = più arrotondato */
```

---

## 🆘 Problemi Comuni

**Gli effetti non si vedono bene?**
- Assicurati di usare Chrome, Firefox, Safari o Edge (ultimi aggiornamenti)
- Gli effetti blur potrebbero essere disabilitati in modalità risparmio energetico

**I link non funzionano?**
- Verifica di aver salvato il file dopo le modifiche
- Controlla che gli URL abbiano `https://` all'inizio

**Il sito sembra diverso sul telefono?**
- Il design è responsive, alcuni effetti sono ridotti per performance

---

## 🎉 Pronto!

Il tuo sito con effetti liquid glass è pronto per impressionare! 

Per domande o supporto, consulta la documentazione o contatta il supporto.

**Made with 💖 and advanced CSS**
