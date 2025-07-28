from flask import Flask, send_file, jsonify
from gtts import gTTS
import os
from io import BytesIO
import random
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# More explicit CORS configuration
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

phrases = [
    "Il est l'heure de te raser comme tout les mois mec",
    "Tu veux pas faire caca, ça commence vraiment a sentir",
    "Tu t'es pas douché pendant 6 mois, il est temps maintenant",
]

@app.route("/audio", methods=["GET"])
@cross_origin()
def audio():
    try:
        text = random.choice(phrases)
        print(f"Generating audio for: {text}")
        
        # Create TTS with slow speech
        tts = gTTS(text=text, lang="fr", slow=True)
        
        # Save directly to BytesIO buffer
        buffer = BytesIO()
        tts.write_to_fp(buffer)
        buffer.seek(0)
        
        print("Audio generated successfully")
        
        return send_file(
            buffer,
            as_attachment=False,
            mimetype="audio/mpeg",
            download_name="voix.mp3"
        )
    
    except Exception as e:
        print(f"Error in audio endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/test", methods=["GET"])
@cross_origin()
def test():
    return jsonify({"message": "Server is working!"})

if __name__ == "__main__":
    app.run(debug=True, port=2000, host="0.0.0.0")