pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        COMPOSE_PROJECT_NAME = 'user-management-fastapi'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm

                sh '''
                    echo "Repository checked out"
                    git log -1 --oneline
                    test -f Dockerfile.backend
                    test -f Dockerfile.frontend
                    test -f docker-compose.yml
                '''
            }
        }

        stage('Prepare Environment') {
            steps {
                sh '''
                    set +x

                    if [ ! -f .env ]; then
                        printf '%s\\n' \
                          'MYSQL_ROOT_PASSWORD=UserMgmtRoot_2026_local' \
                          'SECRET_KEY=local-only-change-this-to-a-long-random-secret-before-production' \
                          'VITE_API_URL=http://localhost:8008' \
                          > .env
                    fi

                    test -s .env
                    docker compose config -q
                    echo "Docker Compose configuration is valid"
                '''
            }
        }

        stage('Validate Backend') {
            steps {
                sh '''
                    docker compose build backend

                    docker compose run --rm --no-deps backend \
                        python -m compileall -q /app

                    echo "Backend Python syntax validation passed"
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    docker compose build frontend
                    echo "Frontend production build completed"
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose up -d --wait --wait-timeout 180
                    docker compose ps
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker compose ps

                    docker compose exec -T backend \
                        python -c "import urllib.request; print(urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=5).read().decode())"

                    docker compose exec -T frontend \
                        wget -q -O /dev/null http://127.0.0.1/

                    echo "Frontend and backend health checks passed"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully.'
            echo 'Frontend: http://localhost:3018'
            echo 'Backend API: http://localhost:8008'
            echo 'Swagger UI: http://localhost:8008/docs'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
            sh 'docker compose logs --tail=100 || true'
        }
    }
}
