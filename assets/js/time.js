function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  document.getElementById(
    "second"
  ).style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  document.getElementById(
    "minute"
  ).style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById(
    "hour"
  ).style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}


function activateDarkMode() {
  // Ajouter la classe dark-mode à tous les éléments
  document.body.classList.add("dark-mode");
  document.querySelector(".container").classList.add("dark-mode");
  document.querySelector(".left-content").classList.add("dark-mode");
  document.querySelector(".clock").classList.add("dark-mode");
  document.querySelector(".numbers").classList.add("dark-mode");
  document.querySelector(".center").classList.add("dark-mode");

  // Aiguilles avec dysfonctionnement
  const hourHand = document.getElementById("hour");
  const minuteHand = document.getElementById("minute");
  const secondHand = document.getElementById("second");

  hourHand.classList.add("dark-mode");
  minuteHand.classList.add("dark-mode");
  secondHand.classList.add("dark-mode");

  // Sauvegarder les rotations actuelles pour les restaurer
  const currentHourRotation = hourHand.style.transform;
  const currentMinuteRotation = minuteHand.style.transform;
  const currentSecondRotation = secondHand.style.transform;

  // Dysfonctionnement des aiguilles pendant la transition
  let glitchInterval = setInterval(() => {
    const randomHourOffset = (Math.random() - 0.5) * 60;
    const randomMinuteOffset = (Math.random() - 0.5) * 120;
    const randomSecondOffset = (Math.random() - 0.5) * 180;

    hourHand.style.transform = currentHourRotation.replace(
      /rotate\([^)]*\)/,
      `rotate(${randomHourOffset}deg)`
    );
    minuteHand.style.transform = currentMinuteRotation.replace(
      /rotate\([^)]*\)/,
      `rotate(${randomMinuteOffset}deg)`
    );
    secondHand.style.transform = currentSecondRotation.replace(
      /rotate\([^)]*\)/,
      `rotate(${randomSecondOffset}deg)`
    );
  }, 100);

  // Arrêter le dysfonctionnement après 3 secondes et reprendre l'heure normale
  setTimeout(() => {
    clearInterval(glitchInterval);
    // Reprendre l'update normal de l'horloge
    updateClock();
  }, 10000);

  // Transformer le contenu de manière élégante
  const title = document.querySelector(".main-title");
  const subtitle = document.querySelector(".main-subtitle");
  const container = document.querySelector(".main-container");
  const button = document.querySelector(".main-button");

  // Changer le titre avec style
  setTimeout(() => {
    title.innerHTML = "⌐ SURVEILLANCE ACTIVE ⌐";
    title.style.color = "#d0d0d0";
    title.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.4)";
    title.style.animation = "shadowGlow 3s infinite";
    title.style.fontFamily = "monospace";
    title.style.letterSpacing = "2px";
  }, 800);

  // Changer le sous-titre
  setTimeout(() => {
    subtitle.innerHTML = "◊ Système de contrôle temporel activé ◊";
    subtitle.style.color = "#999";
    subtitle.style.animation = "shadowGlow 4s infinite";
    subtitle.style.fontFamily = "monospace";
    subtitle.style.fontSize = "clamp(12px, 1.8vw, 14px)";
  }, 1500);

  // Transformer le conteneur principal
  setTimeout(() => {
    container.style.background = "rgba(20, 20, 20, 0.95)";
    container.style.border = "1px solid #333";
    container.style.boxShadow =
      "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
    container.style.backdropFilter = "blur(10px)";
  }, 2200);

  // Transformer les cartes avec des données mystérieuses
  const cards = document.querySelectorAll(".appointment-card");
  const darkAppointments = [
    {
      time: "◊◊:◊◊ --- ∞∞:∞∞",
      desc: "Analyse des données comportementales",
      status: "RUNNING",
    },
    {
      time: "∅∅:∅∅ --- ∅∅:∅∅",
      desc: "Synchronisation des systèmes",
      status: "ACTIVE",
    },
    {
      time: "◦◦:◦◦ --- ◦◦:◦◦",
      desc: "Optimisation des processus",
      status: "PENDING",
    },
    {
      time: "▪▪:▪▪ --- ▪▪:▪▪",
      desc: "Maintenance préventive",
      status: "STANDBY",
    },
  ];

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.background = "rgba(40, 40, 40, 0.8)";
      card.style.border = "1px solid #444";
      card.style.boxShadow =
        "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)";
      card.style.backdropFilter = "blur(5px)";

      const timeEl = card.querySelector(".appointment-time");
      const descEl = card.querySelector(".appointment-desc");
      const statusEl = card.querySelector(".appointment-status");

      timeEl.style.color = "#ccc";
      timeEl.style.textShadow = "0 0 8px rgba(255, 255, 255, 0.2)";
      timeEl.style.fontFamily = "monospace";

      descEl.style.color = "#aaa";
      descEl.style.fontFamily = "monospace";
      descEl.style.fontSize = "clamp(11px, 1.8vw, 13px)";

      statusEl.style.color = "#888";
      statusEl.style.fontFamily = "monospace";
      statusEl.style.fontSize = "clamp(10px, 1.6vw, 12px)";
      statusEl.style.textTransform = "uppercase";
      statusEl.style.letterSpacing = "1px";

      // Changer le contenu
      if (darkAppointments[index]) {
        timeEl.innerHTML = darkAppointments[index].time;
        descEl.innerHTML = darkAppointments[index].desc;
        statusEl.innerHTML = darkAppointments[index].status;
      }

      // Animation subtile
      card.style.animation = "mysteriosPulse 6s infinite";
    }, 2800 + index * 400);
  });

  // Transformer le bouton
  setTimeout(() => {
    button.style.background = "linear-gradient(135deg, #333, #555)";
    button.style.boxShadow =
      "0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
    button.style.color = "#ddd";
    button.innerHTML =
      '<i class="fa fa-cog" aria-hidden="true"></i><span>INITIALISER NOUVEAU PROCESSUS</span>';
    button.style.fontFamily = "monospace";
    button.style.letterSpacing = "1px";
    button.style.animation = "mysteriosPulse 4s infinite";
  }, 4500);

  // Effet de fond subtil
  setTimeout(() => {
    document.body.style.animation = "darkPulse 6s infinite alternate";
  }, 5200);

  // Message final élégant
  setTimeout(() => {
    const finalMessage = document.createElement("div");
    finalMessage.innerHTML = "◈ SYSTÈME OPÉRATIONNEL ◈";
    finalMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.95);
      color: #ddd;
      padding: 40px 60px;
      border-radius: 20px;
      font-size: clamp(18px, 4vw, 28px);
      font-weight: 300;
      text-align: center;
      z-index: 9999;
      border: 1px solid #444;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      font-family: monospace;
      letter-spacing: 3px;
      animation: shadowGlow 2s infinite;
    `;
    document.body.appendChild(finalMessage);

    // Effet de disparition graduelle
    setTimeout(() => {
      finalMessage.style.transition = "all 2s ease-out";
      finalMessage.style.opacity = "0";
      finalMessage.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => {
        finalMessage.remove();
      }, 2000);
    }, 3000);
  }, 6000);

  // Ajouter des particules flottantes pour l'ambiance
  setTimeout(() => {
    createFloatingParticles();
  }, 7000);

  // Programmer le retour à la normale après 10 secondes
  setTimeout(() => {
    deactivateDarkMode();
  }, 10000);
}