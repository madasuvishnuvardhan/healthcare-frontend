pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/madasuvishnuvardhan/healthcare-frontend.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKERHUB_CREDENTIALS_USR}/healthcare-frontend ."
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
                    sh "docker push ${DOCKERHUB_CREDENTIALS_USR}/healthcare-frontend"
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build frontend'
            }
        }
    }
}