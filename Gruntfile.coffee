module.exports = (grunt) ->
  grunt.loadNpmTasks("grunt-sass")
  grunt.loadNpmTasks("grunt-webpack")
  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.loadNpmTasks("grunt-contrib-copy")

  APP_DIR = 'app'
  TMP_DIR = 'app/temp'
  DEV_DIR = 'app/public'
  DST_DIR = 'dst'
  NPM_DIR = 'node_modules'

  webpackConfig = require("./webpack.config")


  grunt.initConfig

    sass:
      app:
        options:
            includePaths: [
              "#{APP_DIR}/styles"
              "#{NPM_DIR}/uikit/src/scss"
            ]
        files:
            "#{DEV_DIR}/style.css": "#{APP_DIR}/styles/style.sass"

    webpack:
      #options:
      #  stats: !process.env.NODE_ENV or process.env.NODE_ENV == 'development'
      
      app: webpackConfig,
      #dev: Object.assign({ watch: true }, webpackConfig)
        

    watch:
      sass:
        files: ["style.sass"]
        tasks: ["sass"]
        options:
          spawn: no
          livereload: yes

  grunt.registerTask "default", ["sass", "watch"]