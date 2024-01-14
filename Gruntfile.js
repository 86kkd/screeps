module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: '2973720373@qq.com',
                token: '6dbf038c-0ef8-4f26-a1aa-8edf92e42665',
                branch: 'main',
                // branch:'default',
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}
