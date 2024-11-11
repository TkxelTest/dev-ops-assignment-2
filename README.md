# DevOps Assignment Pipeline

This repository contains a project with a Jenkins pipeline setup for automating the build, test, and deployment process. The pipeline includes tasks for running frontend and backend tests, SonarQube analysis, Docker image creation, and DockerHub deployment.

## Prerequisites

Before setting up the Jenkins pipeline, make sure the following requirements are met:

- **Jenkins**: Jenkins should be set up with necessary plugins, including:
  - **Docker** plugin for building Docker images.
  - **SonarQube Scanner** plugin for code quality analysis.
  - **JUnit** plugin for publishing test results.
  
- **Docker**: The Jenkins agent must have Docker installed to build and push images.
  
- **SonarQube**: Ensure a SonarQube instance is available for code analysis.

- **Node.js**: Install Node.js and npm for building the frontend and backend.

- **DockerHub Credentials**: Set up credentials for DockerHub with a Jenkins credentials ID `dockerhub_password` containing the DockerHub username and password.

- **SonarQube Token**: A valid SonarQube token is required, configured in Jenkins with the ID `sonar_token`.

## Environment Variables

The pipeline uses the following environment variables:

- `DOCKER_IMAGE`: Name of the Docker image (e.g., `'abdulrahmantkxel/dev-ops-assignment-2'`).
- `DOCKER_TAG`: Tag for the Docker image (e.g., `'latest'`).
- `DOCKER_TARBALL`: The name for the Docker image tarball (e.g., `'dev-ops-assignment-2_image.tar'`).
- `SONAR_TOKEN`: SonarQube token stored as Jenkins credentials.

## Pipeline Stages

### 1. SCM (Source Code Management)
- **Task**: Checkout the repository from the configured SCM source.
- **Steps**:  
  - `checkout scm`: Pulls the latest code from the source control.

### 2. Frontend - Run Tests
- **Task**: Run frontend tests using Jest.
- **Steps**:
  - Install dependencies using `npm install`.
  - Run tests with `npm run test`.

### 3. Frontend - Publish Test Results
- **Task**: Publish frontend test results to Jenkins.
- **Steps**:  
  - Use the `junit` plugin to publish test results from `jest-test-results.xml`.

### 4. Frontend - Install Dependencies
- **Task**: Install npm dependencies for the frontend.
- **Steps**:  
  - `npm install` in the `app/frontend` directory.

### 5. Frontend - Build Assets
- **Task**: Build frontend assets for production.
- **Steps**:  
  - Run `npm run build` to build the frontend assets.

### 6. SonarQube Analysis
- **Task**: Run SonarQube analysis on the backend.
- **Steps**:  
  - Use SonarQube scanner to analyze the code quality.

### 7. Backend - Install Dependencies
- **Task**: Install npm dependencies for the backend.
- **Steps**:  
  - `npm install` in the `app/backend` directory.

### 8. Backend - Run Tests
- **Task**: Run backend tests using Jest.
- **Steps**:  
  - Run tests with `npm run test`.

### 9. Backend - Publish Test Results
- **Task**: Publish backend test results to Jenkins.
- **Steps**:  
  - Publish Jest test results for backend tests using `junit`.

### 10. Backend - Build Docker Image
- **Task**: Build a Docker image for the backend.
- **Steps**:  
  - Run `docker build` to create the Docker image.

### 11. Backend - Save Docker Image as Tarball
- **Task**: Save the Docker image as a `.tar` file.
- **Steps**:  
  - Run `docker save` to save the Docker image as a tarball.

### 12. Backend - Push Docker Image to Registry
- **Task**: Push the Docker image to DockerHub.
- **Steps**:  
  - Log in to DockerHub using Jenkins credentials.
  - Push the Docker image to the Docker registry.

## Post Build Actions

- **Artifacts**: Archives build artifacts and test results for both frontend and backend.
- **Docker Logout**: Logs out from DockerHub.

## Setup Instructions

1. **Install Jenkins Plugins**:
   - Docker plugin.
   - SonarQube Scanner plugin.
   - JUnit plugin.

2. **Configure Jenkins Credentials**:
   - **SonarQube Token**: Add your SonarQube token as Jenkins credentials with the ID `sonar_token`.
   - **DockerHub Credentials**: Add your DockerHub credentials with the ID `dockerhub_password` in Jenkins.

3. **Set Environment Variables**:
   - Ensure that the `DOCKER_IMAGE`, `DOCKER_TAG`, and `DOCKER_TARBALL` environment variables are set correctly.

4. **Configure SonarQube**:
   - Ensure that SonarQube is properly configured in Jenkins and linked to your project.

## Testing

### Frontend Tests
- The frontend tests are run using Jest. Ensure the test results are correctly generated in the `frontend/reports/jest/jest-test-results.xml` file.

### Backend Tests
- The backend tests are run using Jest as well. Ensure the test results are correctly generated in the `backend/reports/jest/jest-test-results.xml` file.

### SonarQube Analysis
- The backend code is analyzed using SonarQube. Ensure the project is correctly configured in SonarQube.

## Troubleshooting

- **Docker Issues**: Verify that the Jenkins agent has Docker installed and configured correctly.
- **SonarQube Analysis**: If the SonarQube analysis fails, check the token and server configuration in Jenkins.
- **Test Results**: Ensure the test result paths are correctly set in the `junit` steps.

---


