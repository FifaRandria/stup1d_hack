// sarcasm.js

const GEMINI_API_KEY = "AIzaSyBbyiEk3D6emsgOWBWfxF-694yDS1IkhaA";

function closeSarcasmModal() {
  document.getElementById("sarcasm-modal").classList.add("hidden");
}

async function triggerSarcasticJudge() {
  const activity = document.getElementById("activity-input").value.trim();
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;

  if (!activity || !startTime || !endTime) {
    alert("Merci de remplir tous les champs !");
    return;
  }

  const prompt = `Prend le role dQuelqu’un a prévu "${activity}" de ${startTime} à ${endTime}. Réagis de manière sarcastiqueme drole et le juge le la mamiere de Homer symson sur le choix de cette activité à cette heure avec le plus courte avec 1 phrase pas plus de 15 mots, q ef corrige l'orhtographe de l'activite et ne le ;et pas dans de guillemet, suggere le de ne pas faire ca`;

  const modal = document.getElementById("sarcasm-modal");
  const sarcasmText = document.getElementById("sarcasm-text");
  sarcasmText.innerText = "Analyse en cours de ton choix douteux...";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "L'IA a trop ri pour te répondre.";

    sarcasmText.innerText = aiText;
    modal.classList.remove("hidden");

  } catch (err) {
    sarcasmText.innerText =
      "Erreur pendant le jugement. L'IA est probablement en train de te juger en silence.";
    modal.classList.remove("hidden");
  }
}
