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

        stage('Run Playwright Tests (Headed)') {
            steps {
                bat 'npx playwright test --headed'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
pipeline {
    agent any

    environment {
        // Xvfb virtual display for headed mode on Linux
        DISPLAY = ":99"
    }

    options {
        // Keep logs for debugging
        timestamps()
        // Timeout if something hangs
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Prepare Display') {
            steps {
                bat'''
                    # Start Xvfb virtual display
                    Xvfb :99 -screen 0 1920x1080x24 > /dev/null 2>&1 &
                    sleep 3
                    echo "DISPLAY=$DISPLAY"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    # Ensure Node.js and Playwright are installed
                    npm ci
                    # Install browsers for Playwright
                    npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat'''
                    # Headed mode
                    npx playwright test --headed --workers=4
                '''
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                junit 'playwright-report/**/*.xml'
            }
        }
    }

    post {
        always {
            bat '''
                echo "Cleaning up Xvfb..."
                pkill Xvfb || true
            '''
        }
    }
}

    }
}





















