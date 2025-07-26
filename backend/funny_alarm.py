from flask import Flask, send_file
from gtts import gTTS
from pydub import AudioSegment
import os
from io import BytesIO
import random

app = Flask(__name__)

phrases = [
    "Bonjour, je suis une voix rigolote !",
    "Attention, ceci est un message important.",
    "Tu as gagné un ticket pour la planète Mars !",
    "Il est temps de faire une pause café.",
    "Je chante sous la douche, tu veux écouter ?"
]

@app.route("/audio", methods=["GET"])
def audio():
    text = random.choice(phrases)
    tts = gTTS(text=text, lang="fr")
    tts.save("voix.mp3")

    sound = AudioSegment.from_file("voix.mp3")
    octaves = 0.5
    new_sample_rate = int(sound.frame_rate * (2.0 ** octaves))
    high_pitch = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})
    high_pitch = high_pitch.set_frame_rate(44100)
    faster = high_pitch.speedup(playback_speed=1.1)

    buffer = BytesIO()
    faster.export(buffer, format="mp3")
    buffer.seek(0)

    os.remove("voix.mp3")

    return send_file(
        buffer,
        as_attachment=False,
        mimetype="audio/mpeg",
        download_name="voix_souriante.mp3"
    )

if __name__ == "__main__":
    app.run(debug=True, port=2000, host="0.0.0.0")
