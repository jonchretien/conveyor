#!/bin/bash

# minifies conveyor.js
# requires nodejs & UglifyJS

IN=conveyor.js
OUT=conveyor.min.js

# minify with UglifyJS
# then, add newline characters after `*/`, but not last newline character
# credit to @desandro for the newline fix
uglifyjs $IN \
  | awk '{ORS=""; gsub(/\*\//,"*/\n"); if (NR!=1) print "\n"; print;}' > $OUT
echo "Minified" $IN "as" $OUT