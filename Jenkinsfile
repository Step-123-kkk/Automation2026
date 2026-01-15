pipeline {
    agent any

    environment {
        NODE_VERSION = '24.x'
    }

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    npm ci
                    npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests (Headless)') {
            steps {
                bat '''
                    npx playwright test --headed --workers=1 --reporter=html || exit /b %ERRORLEVEL%
                '''
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                junit 'playwright-report/**/*.xml'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Check artifacts and test reports."
        }
        success { echo "✅ Jenkins tests passed!" }
        failure { echo "❌ Jenkins tests failed!" }
    }
}
