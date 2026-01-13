pipeline {
    agent any

    environment {
        DISPLAY = ":99"
    }

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

        stage('Prepare Display') {
            steps {
                bat '''
                    Xvfb :99 -screen 0 1920x1080x24 > /dev/null 2>&1 &
                    sleep 3
                    echo "DISPLAY=$DISPLAY"
                '''
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
                bat'''
                    npx playwright test --headed --workers=4
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            bat 'pkill Xvfb || true'
        }
    }
}
