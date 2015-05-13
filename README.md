electron-updater-sample
=======================
This is the sample application for the [`electron-updater`](http://github.com/EvolveLabs/electron-updater) project.

# Install
Below are steps to run the electron-updater-sample application. For more details on how to integrate the electron-updater into your project see the [`electron-updater` wiki](https://github.com/EvolveLabs/electron-updater/wiki).

## Install global dependencies

    $ npm install electron-prebuilt -g
    $ npm install gulp -g
    
## Get the code

    $ git clone git@github.com:evolvelabs/electron-updater-sample.git
    $ cd electron-updater-sample
    $ npm install

## Running

    $ electron .
    
## Optionally Deploy app to release directory

    $ gulp
    $ cd release
    $ ./electron
