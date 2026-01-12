pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
            
        stage('Run Playwright Tests (Headed)') {
            steps {
                bat 'npx playwright test --headed'
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}





















