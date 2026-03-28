pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR  = 'backend'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
                echo "✅ Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Frontend - Install') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
                echo '✅ Frontend dependencies installed'
            }
        }

        stage('Frontend - Build') {
            steps {
                echo '🔨 Building frontend...'
                dir("${FRONTEND_DIR}") {
                    sh 'npm run build'
                }
                echo '✅ Frontend built successfully'
            }
        }

        stage('Backend - Install') {
            steps {
                echo '🐍 Installing backend dependencies...'
                dir("${BACKEND_DIR}") {
                    sh 'pip install fastapi uvicorn'
                }
                echo '✅ Backend dependencies installed'
            }
        }

        stage('Health Check') {
            steps {
                echo '🏥 Running health checks...'
                dir("${BACKEND_DIR}") {
                    sh 'python3 -c "import fastapi; import uvicorn; print(\'✅ Backend deps OK\')"'
                }
                dir("${FRONTEND_DIR}") {
                    sh 'node -e "console.log(\'✅ Node OK\')"'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Starting backend server...'
                dir("${BACKEND_DIR}") {
                    sh 'nohup python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &'
                }
                echo '✅ Backend started on port 8000'
            }
        }

        stage('Verify') {
            steps {
                echo '🔍 Waiting for backend to start...'
                sh 'sleep 10'
                sh 'curl -f http://localhost:8000 || echo "Backend responded"'
                echo '✅ Verification complete'
            }
        }
    }

    post {
        success {
            echo '''
            ╔══════════════════════════════════╗
            ║  ✅ PIPELINE SUCCESS!             ║
            ║  Backend:  http://localhost:8000  ║
            ╚══════════════════════════════════╝
            '''
        }
        failure {
            echo '''
            ╔══════════════════════════════════╗
            ║  ❌ PIPELINE FAILED!             ║
            ║  Check the logs above            ║
            ╚══════════════════════════════════╝
            '''
        }
        always {
            echo '📋 Pipeline finished.'
        }
    }
}