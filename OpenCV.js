// Get video element and button for camera start
const videoElement = document.getElementById('video');
const startButton = document.getElementById('startButton');
const framesContainer = document.getElementById('framesContainer');
const statsDisplay = document.getElementById('statsDisplay');

let stats = {
    totalPredictions: 0,
    correctPredictions: 0,
    ballLocationPredictions: [],
};

// Start camera feed
startButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
        })
        .catch((err) => {
            console.error("Camera access denied:", err);
        });
});

// Function to display frames
function displayFrames() {
    const framePath = 'frames/frame_'; // Assumed folder location of frames
    for (let i = 1; i <= 10; i++) {
        let imgElement = document.createElement('img');
        imgElement.src = `${framePath}${i}.jpg`;
        framesContainer.appendChild(imgElement);
    }
}

// Function to simulate ball detection and update stats
function updateStats(predictedLocation, actualLocation) {
    stats.totalPredictions++;
    if (predictedLocation === actualLocation) {
        stats.correctPredictions++;
    }

    statsDisplay.innerHTML = `
        <p>Totaal aantal voorspellingen: ${stats.totalPredictions}</p>
        <p>Aantal correcte voorspellingen: ${stats.correctPredictions}</p>
        <p>Voorspelde locatie van het balletje: ${predictedLocation}</p>
    `;
}

// Simulate ball location prediction (in real use case, this would come from AI)
setInterval(() => {
    const predictedLocation = Math.floor(Math.random() * 37); // Random number 0-36
    const actualLocation = Math.floor(Math.random() * 37); // Random number 0-36 (for testing)
    updateStats(predictedLocation, actualLocation);
}, 5000);

// Call displayFrames() to show initial frames when the page loads
displayFrames();
