var infiles,
    outfiles;

infiles = {
    http: [
        "src/main/resources/static/index.html"
    ],
    source_html: [
        "src/main/resources/static/assets/components/**/*.html"
    ],
    source_images: [
        "src/main/resources/static/assets/images"
    ],
    source_sass: [
        "src/main/resources/static/assets/components/**/*.scss",
        "src/main/resources/static/assets/components/**/**/*.scss"
    ],
    source_css: [
        "src/main/resources/static/assets/css"
    ],
    source_js: [
        "src/main/resources/static/*.js",
        "src/main/resources/static/assets/*.js",
        "src/main/resources/static/assets/components/**/*.js",

    ],
    vendor_css: [

    ],
    vendor_js: [
        "src/main/resources/static/bower_components/jquery/dist/jquery.js",
        "src/main/resources/static/bower_components/angular/angular.js",

    ]
};

outfiles = {
    dest_index: "src/main/resources/dist",
    dest_images: "src/main/resources/dist/images",
    dest_source_css: "src/main/resources/dist/css",
    dest_source_js: "src/main/resources/dist/js",
    dest_vendor_js: "src/main/resources/dist/js",
    dest_vendor_css: "src/main/resources/dist/css"
}