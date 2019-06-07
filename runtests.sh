#!/bin/sh
npx qx serve --machine-readable --target=source --listen-port=28089 &
pid=$!
while ! nc -z localhost 28089; do sleep 1; done
node compiled/source/resource/qxl/testtapper/run.js http://localhost:28089/compiled/source/testtapper/
kill $pid