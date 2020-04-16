# Front-end gulp template
### features

1. [gulp-sass](https://www.npmjs.com/package/gulp-sass "gulp-sass") - SASS plugin for gulp
2. [gulp-sass-glob](https://www.npmjs.com/package/gulp-sass-glob "gulp-sass-glob") - Gulp plugin for gulp-sass to use glob imports.
3. [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer "gulp-autoprefixer") - Prefix CSS
4. [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css "gulp-clean-css") - Fast and efficient CSS optimizer for Node.js
5. [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps "gulp-sourcemaps") - Sourcemap support for gulpjs
6. [gulp-include](https://www.npmjs.com/package/gulp-include "gulp-include") - Makes inclusion of files a breeze. Enables functionality similar to that of snockets / sprockets or other file insertion compilation tools.
7. [gulp-minify](https://www.npmjs.com/package/gulp-minify "gulp-minify") - Minify js
8. [del](https://www.npmjs.com/package/del "del") - Delete files and directories
9. [gulp-rename](https://www.npmjs.com/package/gulp-rename "gulp-rename") - File renaming
10. [gulp-if](https://www.npmjs.com/package/gulp-if "gulp-if") - Conditionally control the flow of vinyl objects
11. [browser-sync](https://browsersync.io/docs/gulp "browser-sync") - Synchronised browser testing
12. [gulp-notify](https://www.npmjs.com/package/gulp-notify "gulp-notify") - Notification plugin
13. [gulp-plumber](https://www.npmjs.com/package/gulp-plumber "gulp-plumber") - Prevent pipe breaking caused by errors from gulp plugins
------------
### How to use
Clone this repository
```
git clone https://github.com/atomr-web/gulp-project-template
```
Install the project dependencies
```
cd gulp-project-template
npm install
```
Run dev command
```
gulp dev
```
###Template structure 
```
|- frontend/                                    # dev dir
|----- assets/                                  # ASSETS
|---------- fonts/                              # fonts
|---------- img/                                # images
|---------- favicon.ico                         # other files (exm. favicon)
|----- js/                                      # SCRIPTS
|---------- script.js                           # main scripts
|---------- vendors.js                          # vendors scripts
|----- libs/                                    # css/js libraries
|---------- css/                                # css libraries
|-------------- normalize.css                   # normalize lib
|-------------- owl.theme.default.min.css       # owl carouser plugin style
|-------------- selectize.min.css               # selectize plugin style
|-------------- simplelightbox.min.css          # simple lightbox plugin style
|---------- js/                                 # js libraries
|-------------- jquery-3.4.1.min.js             # jQuery
|-------------- jquery.mask.min.js              # mask plugin script
|-------------- owl.carousel.min.js             # owl carousel plugin script
|-------------- selectize.min.js                # selectize plugin script
|-------------- simple-lightbox.min.js          # simple lightbox script
|----- styles/                                  # STYLES
|---------- _fonts.sass                         # all @font-face
|---------- _libs.sass                          # @import css libs
|---------- _media.sass                         # @media queries
|---------- _variables.sass                     # variables
|---------- index.sass                          # main sass file
|----- templates/                               # TEMPLATES HTML
|---------- parts/                              # block, sections, etc.
|--------------- blocks/                        # html blocks
|-------------------- footer__menu.html         # footer menu
|-------------------- header__menu.html         # header menu
|--------------- sections/                      # sections html
|-------------------- footer.html               # footer section
|-------------------- header.html               # header section
|---------- index.html                          # index.html, blog.html and etc.
|- public/                                      # BUILD DIRECTORY
|----- css/                                     # styles
|---------- main.min.css                        # main style file
|----- fonts/                                   # all fonts file
|----- img/                                     # images
|----- js/                                      # scripts (main and vendors)
|----- favicon.ico                              # exm. favicon
|----- index.html                               # exm. index.html
|-----
| .gitignore                                    # ignore dir/files for github
| gulpfile.js                                   # gulpfile
| package.json                                  # package.josn
```