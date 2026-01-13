pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    node -v
                    npm -v
                    npm ci
                    npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests (Headed)') {
            steps {
                bat '''
                    npx playwright test --headed
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
