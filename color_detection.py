import cv2
import numpy as np
import os

# Definieer de kleur van het balletje in HSV. Dit moet je aanpassen afhankelijk van de kleur van het balletje.
lower_color = np.array([0, 120, 70])  # Ondergrens voor kleur in HSV (rode tint)
upper_color = np.array([10, 255, 255])  # Bovengrens voor kleur in HSV (rode tint)

# Laad het video- of afbeeldingsbestand
video_path = 'path_to_your_video.mp4'  # Het pad naar je video
cap = cv2.VideoCapture(video_path)

# Lees frames van de video
frame_number = 0
while cap.isOpened():
    ret, frame = cap.read()
    
    if not ret:
        break
    
    frame_number += 1
    
    # Converteer het frame naar het HSV-kleurmodel
    hsv_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Maak een masker voor de opgegeven kleur (in dit geval een rood balletje)
    mask = cv2.inRange(hsv_frame, lower_color, upper_color)
    
    # Verfijn het masker met wat morfologische bewerkingen (optioneel)
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    
    # Zoek naar contouren van de objecten die overeenkomen met de kleur
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Als er contouren worden gevonden, kan het balletje worden gelokaliseerd
    if contours:
        # Verkrijg het grootste contour (meestal het balletje)
        largest_contour = max(contours, key=cv2.contourArea)
        
        # Verkrijg de omtrek van het grootste object (het balletje)
        (x, y, w, h) = cv2.boundingRect(largest_contour)
        
        # Teken een rechthoek rondom het gedetecteerde balletje
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    # Je kunt hier eventueel de frames opslaan als afbeelding
    # Bijvoorbeeld: cv2.imwrite(f"output/frame_{frame_number}.jpg", frame)

# Sluit de video
cap.release()
