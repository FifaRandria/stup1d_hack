
from gtts import gTTS
from pydub import AudioSegment

# Ton texte, version souriante
text = "Il est temps de faire caca et pipi!"

# Génération avec gTTS
tts = gTTS(text=text, lang="fr")
tts.save("voix_originale.mp3")

# Modification de la voix avec pydub : pitch + vitesse
sound = AudioSegment.from_file("voix_originale.mp3")

# Rendre plus aigu (pitch up)
octaves = 0.5  # 0.5 = +6 demi-tons
new_sample_rate = int(sound.frame_rate * (2.0 ** octaves))
high_pitch = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})
high_pitch = high_pitch.set_frame_rate(44100)

# Accélérer légèrement (optionnel)
faster = high_pitch.speedup(playback_speed=1.2)

# Sauvegarde
faster.export("voix_souriante.mp3", format="mp3")
