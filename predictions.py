# Dit is een voorbeeld van hoe de werkelijke posities eruit zouden kunnen zien
# Dit zou normaal gesproken worden opgeslagen en ingevoerd door een gebruiker
real_positions = [(1, 100, 200), (2, 150, 250), (3, 120, 180)]  # frame, x, y

# Vergelijken van voorspellingen met werkelijke locatie
correct_predictions = 0
for predicted in ball_positions:
    frame, px, py = predicted
    for real in real_positions:
        real_frame, rx, ry = real
        if frame == real_frame and abs(px - rx) < 10 and abs(py - ry) < 10:
            correct_predictions += 1
            break
