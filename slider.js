(($) => {
    $.fn.slider = function (options) {
        let $this = this;
        let $current = null;
        let rectangleWidth = Math.ceil($(".rectangle").width());
        let rectanglePosition = $(".rectangle").offset().left;
        let max = rectangleWidth + rectanglePosition;
        let min = rectanglePosition;
        let handleWidth = $(".handle").width();
        $this.addClass("slider").mousedown((event) => {
            $current = $(event.currentTarget);
        });

        $(document).mousemove((event) => {
            if ($current) {
                let newPosition = event.pageX;

                if (newPosition + handleWidth >= max) {
                    newPosition = max - handleWidth;
                } else if (newPosition < min) {
                    newPosition = min;
                }
                let percentage = Math.floor((newPosition - rectanglePosition) / (rectangleWidth - handleWidth) * 100);

                $current.offset({
                    'left': newPosition
                }).data({
                    'percent': percentage
                });

                if ($.isFunction(options.change)) {
                    options.change.call($current, percentage);
                }
            }
        }).mouseup(() => {
            $current = null;
        });
        return $this;
    };
})(jQuery);
