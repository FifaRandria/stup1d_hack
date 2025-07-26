from flask import Flask, send_file
from gtts import gTTS
from pydub import AudioSegment
import os
from io import BytesIO
import random

from flask_cors import CORS

app = Flask(__name__)

CORS(app)

phrases = [
    "Il est l'heure de te raser comme tout les mois mec",
    "Tu veux pas faire caca, ca commence vraiment a sentir",
    "Tu t'es pas douche pendant 6 mois, il est temps maintenant",
]
@app.route("/audio", methods=["GET"])
def audio():
    text = random.choice(phrases)
    tts = gTTS(text=text, lang="fr")
    tts.save("voix.mp3")

    sound = AudioSegment.from_file("voix.mp3")

    # Réduction de la vitesse de lecture (ralentir la voix)
    slow_down_factor = 0.9  # < 1.0 pour ralentir
    new_sample_rate = int(sound.frame_rate * slow_down_factor)

    slowed_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})
    slowed_sound = slowed_sound.set_frame_rate(44100)

    buffer = BytesIO()
    slowed_sound.export(buffer, format="mp3")
    buffer.seek(0)

    os.remove("voix.mp3")

    return send_file(
        buffer,
        as_attachment=False,
        mimetype="audio/mpeg",
        download_name="voix_ralentie.mp3"
    )


if __name__ == "__main__":
    app.run(debug=True, port=2000, host="0.0.0.0")
