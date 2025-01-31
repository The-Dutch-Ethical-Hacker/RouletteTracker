<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roulette Tracker 🎰</title>
    <style>
        body {
            background: radial-gradient(circle, #222, #111);
            color: white;
            text-align: center;
            font-family: 'Arial', sans-serif;
        }

        h1 {
            font-size: 36px;
            color: gold;
            text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.8);
        }

        #casino-frame {
            width: 90%;
            max-width: 600px;
            border: 8px solid gold;
            border-radius: 10px;
            padding: 10px;
            background: linear-gradient(145deg, #5a0000, #8b0000);
            box-shadow: 0px 0px 20px rgba(255, 215, 0, 0.5);
            margin: 20px auto;
        }

        video {
            width: 100%;
            border: 3px solid gold;
            border-radius: 5px;
        }

        canvas {
            display: none;
        }

        .button {
            background: gold;
            color: black;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            transition: 0.3s;
        }

        .button:hover {
            background: #ffd700;
            box-shadow: 0px 0px 10px rgba(255, 215, 0, 0.8);
        }

        #counter {
            font-size: 20px;
            margin-top: 10px;
            color: white;
        }
    </style>

    <!-- OpenCV.js laden -->
    <script async src="https://docs.opencv.org/master/opencv.js"></script>
</head>
<body>

    <h1>Roulette Tracker 🎰</h1>

    <div id="casino-frame">
        <video id="video" autoplay playsinline></video>
        <canvas id="canvas"></canvas>
        <p id="counter">🔍 Gevonden ballen: 0</p>
        <button class="button" onclick="toggleCamera()">🎥 Start / Stop Camera</button>
    </div>

    <script>
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let processing = false;
        let cameraActive = false;

        function checkOpenCV() {
            if (cv && cv.getBuildInformation) {
                console.log("✅ OpenCV.js geladen!");
            } else {
                console.log("⏳ Wachten op OpenCV...");
                setTimeout(checkOpenCV, 1000);
            }
        }
        checkOpenCV();

        async function toggleCamera() {
            if (cameraActive) {
                stopCamera();
            } else {
                startCamera();
            }
        }

        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                video.srcObject = stream;
                video.onloadeddata = () => { processFrame(); };
                cameraActive = true;
            } catch (error) {
                alert("Camera-toegang geweigerd of niet beschikbaar.");
                console.error(error);
            }
        }

        function stopCamera() {
            let stream = video.srcObject;
            let tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
            cameraActive = false;
        }

        function processFrame() {
            if (!cameraActive) return;
            if (processing) return;
            processing = true;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            let src = cv.imread(canvas);
            let gray = new cv.Mat();
            let blurred = new cv.Mat();
            let circles = new cv.Mat();

            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
            cv.GaussianBlur(gray, blurred, new cv.Size(9, 9), 2);
            cv.threshold(gray, gray, 100, 255, cv.THRESH_BINARY);

            cv.HoughCircles(blurred, circles, cv.HOUGH_GRADIENT, 1, 20, 50, 30, 5, 50);

            document.getElementById("counter").innerText = `🔍 Gevonden ballen: ${circles.rows}`;

            for (let i = 0; i < circles.rows; i++) {
                let circle = circles.data32F.slice(i * 3, i * 3 + 3);
                let x = circle[0];
                let y = circle[1];
                let radius = circle[2];

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            src.delete();
            gray.delete();
            blurred.delete();
            circles.delete();

            processing = false;
            requestAnimationFrame(processFrame);
        }
    </script>

</body>
</html>
