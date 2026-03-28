// Jenkinsfile
pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR  = 'backend'
    }

    stages {

        // ── Stage 1: Show what commit triggered this build ──
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
                echo "✅ Branch: ${env.BRANCH_NAME}"
                echo "✅ Commit: ${env.GIT_COMMIT}"
            }
        }

        // ── Stage 2: Install & build frontend ──
        stage('Frontend - Install') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                echo '🔨 Building frontend...'
                dir("${FRONTEND_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        // ── Stage 3: Install backend dependencies ──
        stage('Backend - Install') {
            steps {
                echo '🐍 Installing backend dependencies...'
                dir("${BACKEND_DIR}") {
                    bat 'pip install fastapi uvicorn'
                }
            }
        }

        // ── Stage 4: Run basic health checks ──
        stage('Health Check') {
            steps {
                echo '🏥 Running health checks...'
                dir("${BACKEND_DIR}") {
                    bat 'python -c "import fastapi; import uvicorn; print(\'Dependencies OK\')"'
                }
                dir("${FRONTEND_DIR}") {
                    bat 'node -e "console.log(\'Node OK\')"'
                }
            }
        }

        // ── Stage 5: Deploy using Docker Compose ──
        stage('Deploy') {
            steps {
                echo '🚀 Deploying with Docker Compose...'
                bat 'docker-compose down --remove-orphans'
                bat 'docker-compose build --no-cache'
                bat 'docker-compose up -d'
                echo '✅ Deployment complete!'
            }
        }

        // ── Stage 6: Verify deployment ──
        stage('Verify') {
            steps {
                echo '🔍 Verifying services are running...'
                // Wait for services to start
                bat 'timeout /t 10 /nobreak'
                bat 'docker-compose ps'
                echo '✅ All services up!'
            }
        }
    }

    // ── Post-build actions ──
    post {
        success {
            echo '''
            ╔══════════════════════════════╗
            ║  ✅ BUILD SUCCESSFUL!        ║
            ║  PipelineOS is deployed!     ║
            ╚══════════════════════════════╝
            '''
        }
        failure {
            echo '''
            ╔══════════════════════════════╗
            ║  ❌ BUILD FAILED!            ║
            ║  Check logs above            ║
            ╚══════════════════════════════╝
            '''
        }
        always {
            echo '📋 Build finished. Check Jenkins dashboard for details.'
        }
    }
}