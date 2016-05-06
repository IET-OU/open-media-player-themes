#!/usr/bin/env php
<?php

/**
 * CLI utility to output JSON to feed to "uglify" task in Gruntfile.js.
 *
 * @author Nick Freear, 1 April 2016.
 * @link   https://npmjs.com/package/grunt-contrib-uglify#options
 */

define('OMP_BUILD_THEME', true);
define('OMP_BUILD_JSON_FILE', __DIR__ . '/../uglify-theme.json');
define('OMP_BUILD_MAX_LINE', 2048);  # Was: 640, default: 32000;
define('OMP_BUILD_COMMENTS', false); # Was: 'some'

require_once __DIR__ . '/../vendor/autoload.php';

$theme = new \IET_OU\Open_Media_Player\Ouplayer_Base_Theme();

$json = getUglifyJson($theme->getJavascripts(), $theme->getJsMin());
$bytes = file_put_contents(OMP_BUILD_JSON_FILE, $json);

fprintf(STDERR, "JSON file written (%s):\n%s\n", $bytes, OMP_BUILD_JSON_FILE);



function getUglifyJson($input_javascripts, $output_javascript)
{
    $year = date('Y');
    return json_encode([
    "//" => [
        "auto-generated - by 'bin/build.php'",
        "banner: \" /*! <-%= pkg.name %> - v<-%= pkg.version %> - <-%= grunt.template.today('yyyy-mm-dd') %> */ \""
    ],
    "files" => [
        $output_javascript => $input_javascripts
    ],
    "options" => [
        "banner" => "/*! Open Media Player | © 2012-$year The Open University | License: MIT | http://iet-ou.github.io/open-media-player | <%= grunt.template.today('yyyy-mm-dd hh:MM:ss') %> */\n"
            . "/*! Built on MediaElement.js | Copyright 2010-2014, John Dyer | License: MIT | http://mediaelementjs.com */\n",
        "compress" => true,
        "mangle" => false,
        "maxLineLen" => OMP_BUILD_MAX_LINE,
        "preserveComments" => OMP_BUILD_COMMENTS,
        "sourceMap" => true,
    ]
    ], JSON_PRETTY_PRINT);
}

#End.
