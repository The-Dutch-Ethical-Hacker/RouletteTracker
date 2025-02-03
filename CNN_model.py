import tensorflow as tf
from tensorflow.keras import layers, models

# Stel een eenvoudig CNN-model in
model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(height, width, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(2))  # 2 output: x, y

model.compile(optimizer='adam', loss='mean_squared_error')

# Train het model (je moet de juiste trainingsdata voorbereiden)
model.fit(train_images, train_labels, epochs=10)
