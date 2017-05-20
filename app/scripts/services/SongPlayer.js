(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        /**
         * @desc album array filled with array of songs
         * @type {Array}
         */
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc returns a number corresponding to the index of the current song that is playing
         * @param  {Object} song
         * @return {integer}
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;
        SongPlayer.volume = 80;


        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;


        /**
         * @desc sets the value of the currently playing song to null
         */
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };


        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audiofile as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };


        /**
         * @function playSong
         * @desc Plays current buzzObject audiofile and sets song.playing to true
         * @param  {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;

        };


        /**
         * @function play
         * @param  {Object}
         * @desc check if there the song playing is the song clicked, if it isn't play and set the song if it is, check if it is paused, and if that is true, play song
         */

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;

            if (song === null) {
                song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong !== song) {
                setSong(song);

                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                playSong(song);
            }
        };


        /**
         * @function pause
         * @param  {Object} song
         * @desc the set the clicked song's playing attribute to false and pause audiofile
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
         * @desc decrements the index of teh array of songs
         * sets current song playing to 0 if at the beginning of teh array
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


        /**
         * @desc increments the index of the array of songs
         * if end of array of songs is hit, stops playing songs
         */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setVolume = function(vol) {
            if (currentBuzzObject) {
                $rootScope.$apply(function() {
                    var volume = parseInt(vol);
                    currentBuzzObject.setVolume(volume);
                })
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
