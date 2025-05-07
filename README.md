<h1 align="center"> AI Dashboard Face Recognition 🤖 </h1>

[AI-Dashboard-Face-Recognition](https://github.com/Nisarg-27/AI-Dashboard-Face-Recognition) is a web-based dashboard that enables face recognition and detection using the CompreFace API. Upload images to register faces and scan new images or camera feeds to identify them with confidence scores.

It provides a user-friendly interface to manage and test facial recognition capabilities.

## Table of Contents

- [Demo](#demo)
- [API Used](#api)
- [Technology Stack](#technology-stack)
- [Installation & Usage](#installation--usage)

## Demo

![AI-Dashboard-Screenshot](https://user-images.githubusercontent.com/77735347/placeholder-screenshot.png)
*Note: Replace the above placeholder with an actual screenshot of the dashboard.*

## API

This project uses the [CompreFace API](https://github.com/exadel-inc/CompreFace), a free, open-source face recognition system that provides robust APIs for face detection, recognition, and verification.

## Technology Stack

Built with modern web technologies and powered by CompreFace!

| Technology    | Description                               | Link ↘️                                    |
| ------------- | ----------------------------------------- | ------------------------------------------ |
| HTML5         | Hyper Text Markup Language                | ----                                       |
| CSS3          | Cascading Style Sheets                    | ----                                       |
| JavaScript    | High Level, Dynamic, Interpreted Language | ----                                       |
| Node.js       | JavaScript Runtime Environment            | [nodejs.org](https://nodejs.org)           |
| Docker        | Containerization Platform                 | [docker.com](https://docker.com)           |

## Installation & Usage

_Ensure [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), [Git](https://git-scm.com), and [Docker](https://docker.com) are installed._

1. **Clone or Download the Repository**:

   git clone https://github.com/Nisarg-27/AI-Dashboard-Face-Recognition.git   cd AI-Dashboard-Face-Recognition

2. **Install Dependencies**:

   npm install

3. **Set Up CompreFace Backend**:
- Ensure Docker is running.
- Start CompreFace using the provided Docker Compose file:
  ```
  docker-compose -f compareFace-docker-compose.yml up -d
  ```
- Verify CompreFace is running at `http://localhost:8000`. Note the default API keys:
  - Recognition: `00000000-0000-0000-0000-000000000002`
  - Detection: `00000000-0000-0000-0000-000000000003`

4. **Configure API Keys**:
- Update the API keys in the project’s configuration file (e.g., `config.js`):
  ```javascript
  const config = {
    recognitionApiKey: "00000000-0000-0000-0000-000000000002",
    detectionApiKey: "00000000-0000-0000-0000-000000000003",
    apiUrl: "http://localhost:8000"
  };
  ```

5. **Start the Application**:

   npm start
- Visit [http://localhost:3000](http://localhost:3000) in your browser to access the dashboard.

6. **Register and Test Faces**:
- Navigate to the "AI Dashboard" tab.
- Upload a clear, well-lit photo with a single visible face to register a user.
- Test recognition by uploading new images or using a camera feed (if configured).

## Troubleshooting

- **CompreFace Issues**: Ensure Docker is running and check `http://localhost:8000`.
- **API Key Errors**: Confirm keys match those from CompreFace.
- **Port Conflicts**: Verify `localhost:3000` is free or adjust the port in `package.json`.
- **Face Registration**: Use high-quality images with one centered face.

For advanced CompreFace setup, refer to [CompreFace GitHub](https://github.com/exadel-inc/CompreFace).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

