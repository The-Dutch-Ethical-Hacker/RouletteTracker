# Lijst om de gedetecteerde locaties van het balletje op te slaan
ball_positions = []

# In de loop waar je de frames verwerkt:
if contours:
    largest_contour = max(contours, key=cv2.contourArea)
    (x, y, w, h) = cv2.boundingRect(largest_contour)
    
    # Opslaan van de gedetecteerde positie van het balletje
    ball_positions.append((frame_number, x, y))  # frame_number, x, y
