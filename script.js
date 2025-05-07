// Global variables
let emotionModel, handposeModel, poseDetector;
let isModelsLoaded = false;
const frameTimes = [];
let frameCount = 0;
let startTime = performance.now();

// DOM Elements
const video = document.getElementById('webcam');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');
const fpsDisplay = document.getElementById('fps');
const inferenceTimeDisplay = document.getElementById('inference-time');
const emotionDisplay = document.getElementById('emotion-display');
const gestureDisplay = document.getElementById('gesture-display');
const poseDisplay = document.getElementById('pose-display');

// Emotion labels (simplified for demo)
const emotionLabels = ['happy', 'sad', 'angry', 'neutral'];

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
  await tf.ready();
  await setupCamera();
  await loadModels();
  startInference();
});

// Camera setup
async function setupCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false
    });
    video.srcObject = stream;
    
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        resolve();
      };
    });
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Could not access the camera. Please ensure you've granted permissions.");
  }
}

// Load ML models
async function loadModels() {
  try {
    // Emotion detection (simplified mock)
    emotionModel = {
      predict: async () => {
        // In real implementation, replace with actual model
        const randomIndex = Math.floor(Math.random() * emotionLabels.length);
        return {
          emotion: emotionLabels[randomIndex],
          confidence: Math.random().toFixed(2)
        };
      }
    };

    // Handpose model
    handposeModel = await handpose.load();
    
    // Pose detection
    const model = poseDetection.SupportedModels.MoveNet;
    poseDetector = await poseDetection.createDetector(model, {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
    });
    
    isModelsLoaded = true;
    console.log("All models loaded successfully");
  } catch (error) {
    console.error("Error loading models:", error);
  }
}

// Main inference loop
async function startInference() {
  if (!isModelsLoaded) {
    console.log("Models not loaded yet");
    setTimeout(startInference, 100);
    return;
  }

  while (true) {
    const startTime = performance.now();
    
    // Run all models in parallel
    const [emotion, gesture, pose] = await Promise.all([
      detectEmotion(),
      detectGesture(),
      detectPose()
    ]);
    
    // Update UI
    updateUI(emotion, gesture, pose);
    
    // Calculate performance metrics
    const inferenceTime = performance.now() - startTime;
    recordFrame(inferenceTime);
    updateMetrics();
    
    // Yield to browser
    await tf.nextFrame();
  }
}

// Emotion detection (mock implementation)
async function detectEmotion() {
  try {
    return await emotionModel.predict();
  } catch (error) {
    console.error("Emotion detection error:", error);
    return { emotion: "error", confidence: 0 };
  }
}

// Hand gesture detection
async function detectGesture() {
  try {
    const predictions = await handposeModel.estimateHands(video);
    if (predictions.length === 0) return null;
    
    // Simplified gesture classification
    const landmarks = predictions[0].landmarks;
    const fingersExtended = landmarks.filter((_, i) => i % 4 === 0 && i !== 0);
    const gesture = fingersExtended.length > 3 ? "open hand" : "closed hand";
    
    return {
      gesture,
      confidence: 0.85 // Mock confidence
    };
  } catch (error) {
    console.error("Gesture detection error:", error);
    return null;
  }
}

// Pose detection
async function detectPose() {
  try {
    const poses = await poseDetector.estimatePoses(video);
    if (poses.length === 0) return null;
    
    // Simplified pose analysis
    const keypoints = poses[0].keypoints;
    const visibleKeypoints = keypoints.filter(kp => kp.score > 0.3);
    
    return {
      keypoints: visibleKeypoints.length,
      activity: visibleKeypoints.length > 5 ? "active" : "inactive"
    };
  } catch (error) {
    console.error("Pose detection error:", error);
    return null;
  }
}

// Performance tracking
function recordFrame(inferenceTime) {
  frameTimes.push(inferenceTime);
  if (frameTimes.length > 30) frameTimes.shift();
  frameCount++;
}

function updateMetrics() {
  const averageInference = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length || 0;
  const elapsed = (performance.now() - startTime) / 1000;
  const fps = elapsed > 0 ? (frameCount / elapsed).toFixed(1) : 0;
  
  fpsDisplay.textContent = `FPS: ${fps}`;
  inferenceTimeDisplay.textContent = `Inference Time: ${averageInference.toFixed(1)} ms`;
}

// UI Updates
function updateUI(emotion, gesture, pose) {
  // Update emotion display
  if (emotion) {
    emotionDisplay.innerHTML = `
      Detected: <strong>${emotion.emotion}</strong><br>
      Confidence: ${(emotion.confidence * 100).toFixed(1)}%
    `;
  }
  
  // Update gesture display
  if (gesture) {
    gestureDisplay.innerHTML = `
      Gesture: <strong>${gesture.gesture}</strong><br>
      Confidence: ${(gesture.confidence * 100).toFixed(1)}%
    `;
  } else {
    gestureDisplay.textContent = "No hands detected";
  }
  
  // Update pose display
  if (pose) {
    poseDisplay.innerHTML = `
      Keypoints detected: <strong>${pose.keypoints}</strong><br>
      Activity: <strong>${pose.activity}</strong>
    `;
  } else {
    poseDisplay.textContent = "No pose detected";
  }
  
  // Draw pose/keypoints on canvas
  drawCanvas(pose);
}

// Draw on canvas
function drawCanvas(pose) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // In a real implementation, you would draw the actual pose/keypoints here
  // This is just a placeholder visualization
  if (pose && pose.keypoints > 0) {
    ctx.fillStyle = 'red';
    for (let i = 0; i < pose.keypoints; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}