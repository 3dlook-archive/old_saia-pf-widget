pipeline {
    agent {
        node {
            label 'slave_node_ruby'
        }
    }
    stages {
        stage('Test') { 
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run build:shopify'
                sh 'cd dist'
                sh 'ls -la'
                }
        }
        stage('Deploy') { 
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'gcp-shopify-plugin-test', transfers: [sshTransfer(excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/opt/shopify_plugin/code/views/widget/', remoteDirectorySDF: false, removePrefix: 'dist/', sourceFiles: 'dist/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sshPublisher(publishers: [sshPublisherDesc(configName: 'gcp-shopify-plugin-test', transfers: [sshTransfer(excludes: '', execCommand: 'cd /opt/shopify_plugin/code/app/widget-assets && ls -la && sudo supervisorctl restart all', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/opt/shopify_plugin/code/app/widget-assets', remoteDirectorySDF: false, removePrefix: 'dist/widget-assets/', sourceFiles: 'dist/widget-assets/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                }
        }
    }
    post {
      // Default values
        def colorName = 'RED'
        def colorCode = '#FF0000'
        def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
        def summary = "${subject} (${env.BUILD_URL})"
      // only triggered when blue or green sign
        success {
            slackSend (color: '#439FE0', message: summary)
        }
        // triggered when red sign
        failure {
            slackSend (color: '#439FE0', message: summary)
        }
        // trigger every-works
        always {
            slackSend (color: '#439FE0', message: summary)
        }
    }
}

