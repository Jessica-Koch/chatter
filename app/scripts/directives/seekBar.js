(function() {
    function seekBar($document) {
        /**
         * @desc calculates horizontal % on seek bar 
         * @param  {element} seekBar as a jQuery obj
         * @param  {event} 
         * @return {Integer}
         */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);

            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

                var seekBar = $(element);

                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });

                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });

                /**
                 * @desc calculates the percentage that the volume or seek bar should be filled
                 * @return {string}
                 */
                var percentString = function() {
                    /**
                     * @desc Holds value of seek bar, currenttime/volume
                     * @type {integer}
                     */
                    var value = scope.value;

                    /**
                     * @desc max value of song/volume
                     * @type {integer}
                     */
                    var max = scope.max;

                    /**
                     * @desc calculate percentage on the value and maxiumum
                     * @type {function}
                     */
                    var percent = value / max * 100;
                    return percent + '%';
                };

                /**
                 * @desc implements the style change based on teh value of precentString
                 * @return {Object}
                 */
                scope.fillStyle = function() {
                    return { width: percentString() };
                };

                scope.thumbStyle = function() {
                    return { left: percentString() };
                };

                /**
                 * @desc notify onChange that scope.value was updated
                 * @param  {attribute}
                 */
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({ value: newValue });
                    }
                };

                /**
                 * @desc updates seek bar val based on width and click location
                 * @param  {event} 
                 */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };

                /**
                 * @desc constantly applies changes to scope.value as user drags seek bar thumb
                 */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };


            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
