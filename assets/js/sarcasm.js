// sarcasm.js

const GEMINI_API_KEY = "AIzaSyBbyiEk3D6emsgOWBWfxF-694yDS1IkhaA";

function closeSarcasmModal() {
  document.getElementById("sarcasm-modal").classList.add("hidden");
}

function showHomerCommentCard(comment) {
  const container = document.getElementById("homer-surprise");
  const text = document.getElementById("homer-comment");
  if (!container || !text) return;
  text.innerText = comment;
  container.classList.remove("hidden");
}


async function generateHomerAssistantComment(activity, startTime, endTime) {
  const prompt = `Tu es Ho;er Simpson transformé en assistant IA sarcastique, tu dis une phrase de 5 mot max pour dire aue tu vas surveiller ton activite louche, et dis  je vais te perturber apres, heim hein, soit creativemet stupid`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    const comment =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Mmmh... activité détectée. Moi j’préfère dormir 🍩";

    showHomerCommentCard(comment);
  } catch (err) {
    console.error("Erreur commentaire Homer IA :", err);
  }
}

async function triggerSarcasticJudge() {
  const activity = document.getElementById("activity-input").value.trim();
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const button = document.getElementById("add-btn");

  if (!activity || !startTime || !endTime) {
    alert("Merci de remplir tous les champs !");
    return;
  }

  const prompt = `Tu es Homer Simpson transformé en assistant IA sarcastique. L'utilisateur veut faire "${activity}" de ${startTime} à ${endTime}. Donne un jugement sarcastique, drôle et absurde. Max 15 mots. Termine par une recommandation inutile à la Homer. Corrige l'orthographe de l'activité si besoin.`;

  const modal = document.getElementById("sarcasm-modal");
  const sarcasmText = document.getElementById("sarcasm-text");
  sarcasmText.innerText = "Analyse en cours de ton choix douteux...";

  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyse...';

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    const sarcasm =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "L'IA a trop ri pour te répondre.";

    sarcasmText.innerText = sarcasm;
    modal.classList.remove("hidden");

    // Appelle Homer Assistant en plus
    await generateHomerAssistantComment(activity, startTime, endTime);
  } catch (err) {
    sarcasmText.innerText =
      "Erreur pendant le jugement. L'IA est probablement en train de te juger en silence.";
    console.log(err);
    modal.classList.remove("hidden");
  } finally {
    button.disabled = false;
    button.innerHTML = '<i class="fas fa-plus-circle"></i> Ajouter';
  }
}
