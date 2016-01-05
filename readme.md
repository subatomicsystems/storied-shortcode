## Note. This repository is deprecated and may be deleted after the Documentation has been copied over
## This repository is nested as a node_module in grunt-storied-shortcodes to prevent nested Git Key Issues with NPM
## Please do not push changes to this repository anymore as of 05/01/2016


# Shortcodes

## Test

`npm test`

## Debug

`DEBUG=parser:* mocha test/**/*.js`

or debug a particular shortcode parser

`DEBUG=parser:youtube mocha test/youtube/youtube.js`

## SoundCloud

`[soundcloud url="https://api.soundcloud.com/tracks/206370322" params="auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true" width="100%" height="450" iframe="true" /]`

params are optional and control the look of the widget.

For more information, check the [official SoundCloud help article](http://help.soundcloud.com/customer/portal/articles/1338578-how-to-post-to-wordpress).

## YouTube

`[youtube src=http://youtube.com/watch/?v=foo123]`

or

`[youtube http://youtube.com/watch/?v=foo123]`

or

`[youtube=http://youtube.com/watch/?v=123456]`

## Instagram

`[instagram url=http://instagram.com/p/bNd86MSFv6/ hidecaption=true width=320]`

or

`[instagram url=http://instagram.com/p/bNd86MSFv6/ /]`

## Twitter

`[twitter url=https://twitter.com/gdemey/status/636706988211208197]`
