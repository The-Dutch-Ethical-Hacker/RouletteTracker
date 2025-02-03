import cv2
import os  

# Laad de video
video_path = r"C:\Users\Randy\OneDrive\Bureaublad\RouletteTracker\roulette_video.mp4"
output_folder = "frames"
os.makedirs(output_folder, exist_ok=True)

cap = cv2.VideoCapture(video_path)
frame_rate = 10  # Pak elke 10e frame

frame_id = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    if frame_id % frame_rate == 0:
        filename = f"{output_folder}/frame_{frame_id}.jpg"
        cv2.imwrite(filename, frame)
        print(f"Frame opgeslagen: {filename}")

    frame_id += 1
import cv2

video_path = "roulette_video.mp4"
cap = cv2.VideoCapture(video_path)

# Controleer of de video is geopend
if not cap.isOpened():
    print("Er is een probleem met het openen van de video!")
else:
    print("Video geladen!")

cap.release()
print("✅ Alle frames geëxtraheerd!")
