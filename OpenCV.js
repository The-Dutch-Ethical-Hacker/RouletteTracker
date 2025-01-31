<script>
    async function startCamera() {
        const video = document.getElementById('video');
        const cameraSelect = document.getElementById('cameraSelect');
        const selectedCamera = cameraSelect.value;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: selectedCamera }
            });

            video.srcObject = stream;
            video.onloadeddata = () => {
                processFrame();
            };
        } catch (error) {
            alert("Camera-toegang geweigerd of niet beschikbaar.");
            console.error(error);
        }
    }

    // Verwerk het camerabeeld met OpenCV.js
    function processFrame() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Converteer canvas naar een OpenCV Mat
        let src = cv.imread(canvas);
        let gray = new cv.Mat();
        let blurred = new cv.Mat();

        // Zet het beeld om naar grijs en pas een blur toe
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.GaussianBlur(gray, blurred, new cv.Size(15, 15), 0);

        // Detecteer cirkels (roulette balletje)
        let circles = new cv.Mat();
        cv.HoughCircles(blurred, circles, cv.HOUGH_GRADIENT, 1, 20, 50, 30, 10, 50);

        // Teken de gevonden cirkels (roulette balletje)
        for (let i = 0; i < circles.rows; i++) {
            let circle = circles.data32F.slice(i * 3, i * 3 + 3);
            let x = circle[0];
            let y = circle[1];
            let radius = circle[2];
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }

        // Opruimen
        src.delete();
        gray.delete();
        blurred.delete();
        circles.delete();

        // Blijf frames verwerken
        requestAnimationFrame(processFrame);
    }
</script>
