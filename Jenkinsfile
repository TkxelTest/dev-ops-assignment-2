pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'abdulrahmantkxel/dev-ops-assignment-2'
        DOCKER_TAG = "latest"
        DOCKER_TARBALL = 'dev-ops-assignment-2_image.tar'
        SONAR_TOKEN = credentials('sonar_token') // Confirm this ID matches your Jenkins credentials
    }

    stages {
        // Frontend stages
        stage('Frontend - Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Frontend - Run Tests') {
            steps {
                dir('app/frontend') {
                    sh 'npm run test'
                }
            }
        }

        stage('Frontend - Publish Test Results') {
            steps {
                junit '**/frontend/reports/jest/jest-test-results.xml'
            }
        }


        stage('Frontend - Install Dependencies') {
            steps {
                dir('app/frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build Assets') {
            steps {
                dir('app/frontend') {
                    sh 'npm run build'
                }
            }
        }

        

        // Backend stages
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv() { // Replace with your actual SonarQube server name if needed
                        dir('app/backend') {
                            sh "${scannerHome}/bin/sonar-scanner"
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

        stage('Backend - Run Tests') {
            steps {
                dir('app/backend') {
                    sh 'npm run test'
                }
            }
        }

        stage('Backend - Publish Test Results') {
            steps {
                junit '**/backend/reports/jest/jest-test-results.xml'
            }
        }

        stage('Backend - Build Docker Image') {
            steps {
                script {
                    dir('app/backend') {
                        sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG ."
                    }
                }
            }
        }

        stage('Backend - Save Docker Image as Tarball') {
            steps {
                script {
                    dir('app/backend') {
                        sh "mkdir -p app/backend"
                        sh "docker save -o $DOCKER_TARBALL $DOCKER_IMAGE:$DOCKER_TAG"
                    }
                }
            }
        }

        stage('Backend - Push Docker Image to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_password', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                    }
                }
            }
        }
    }

    post {
        always {
            // Remove the node block here, as it's not needed
            script {
                archiveArtifacts artifacts: 'app/frontend/build/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: "app/backend/${DOCKER_TARBALL}", allowEmptyArchive: true
                archiveArtifacts artifacts: 'frontend/reports/jest/jest-test-results.xml', allowEmptyArchive: true
                archiveArtifacts artifacts: 'backend/coverage/**', allowEmptyArchive: true
                sh 'docker logout'
            }
        }
    }
}
