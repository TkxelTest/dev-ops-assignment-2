pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('sonar_token') // Ensure this matches your Jenkins credentials ID
    }

    stages {
        stage('SCM') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    node {
                        def scannerHome = tool 'SonarScanner'
                        withSonarQubeEnv('SonarQube') { // Replace with your actual SonarQube server name if needed
                            dir('app/backend') {
                                sh "${scannerHome}/bin/sonar-scanner"
                            }
                        }
                    }
                }
            }
        }

        stage('Backend - Install Dependencies') {
            steps {
                dir('app/backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend - Build Docker Image') {
            steps {
                script {
                    dir('app/backend') {
                        sh "docker build -t my-image-name:latest ."
                    }
                }
            }
        }

        stage('Backend - Push Docker Image to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_password', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker push my-image-name:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                archiveArtifacts artifacts: 'app/backend/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'frontend/reports/jest/jest-test-results.xml', allowEmptyArchive: true
                archiveArtifacts artifacts: 'backend/coverage/**', allowEmptyArchive: true
            }
        }
    }
}
