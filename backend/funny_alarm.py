from flask import Flask, request, send_file
from gtts import gTTS
from pydub import AudioSegment
import os
from io import BytesIO

app = Flask(__name__)

@app.route("/audio", methods=["POST"])
def audio():
    data = request.get_json()
    if not data or "text" not in data:
        return {"erreur": "Pas de text."}, 400

    text = data["text"]
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
        download_name="ahaha.mp3"
    )

if __name__ == "__main__":
    app.run(debug=True, port=2000)
