   $(document).ready(function () {
            const videoConfigs = {
                desktop: {
                    src: "https://cdn.shopify.com/videos/c/o/v/46198d038abe45dabd43ccdfc6c2ef1d.mp4",
                    poster: "https://cdn.shopify.com/s/files/1/0687/6128/8960/files/cut-index-banner-pc.jpg"
                },
                tablet: {
                    src: "https://cdn.shopify.com/videos/c/o/v/b90231c6827941aa8a0c2ff09c47e555.mp4",
                    poster: "https://cdn.shopify.com/s/files/1/0687/6128/8960/files/cut-index-banner-pad.jpg"
                },
                mobile: {
                    src: "https://cdn.shopify.com/videos/c/o/v/4963d725ac534fa3a0672120cb40ae96.mp4",
                    poster: "https://cdn.shopify.com/s/files/1/0687/6128/8960/files/cut-index-banner-mo.jpg"
                }
            };

            function getDeviceType() {
                const width = window.innerWidth;
                if (width < 768) return 'mobile';
                if (width <= 1024) return 'tablet';
                return 'desktop';
            }

            function loadVideo() {
                const deviceType = getDeviceType();

                const config = videoConfigs[deviceType];

                const $video = $(`
                    <video
                        id="videoPlayer1"
                        class="cut-video-background"
                        playsinline
                        muted
                        autoplay
                        preload="auto"
                        webkit-playsinline
                        loop
                        poster="${config.poster}">
                        <source src="${config.src}" type="video/mp4">
                    </video>
                `);

                $('#videoContainer').append($video);
            }

            loadVideo();
        });
  $(window).on('scroll', function () {
            const width = window.innerWidth;
            if (width <= 768) {
                const scrollTop = $(this).scrollTop();
                const windowHeight = $(this).height();
                const $btn = $('.fixed-btn');
                const $hideZone = $('.cut-full-content.bg-img, .cut-full-content.bg-img-bottom');

                let shouldHide = false;

                $hideZone.each(function () {
                    const zoneTop = $(this).offset().top;
                    const zoneBottom = zoneTop + $(this).outerHeight();

                    const btnBottom = scrollTop + windowHeight;
                    if (btnBottom > zoneTop && scrollTop < zoneBottom) {
                        shouldHide = true;
                        return false; // break
                    }
                });

                if (scrollTop > windowHeight && !shouldHide) {
                    $btn.fadeIn().css({ display: 'flex' });
                } else {
                    $btn.fadeOut();
                }
            }
        });

        $(document).ready(function () {
            //count down
            const endDate = new Date(2025, 3, 21, 12, 59, 59);

            function updateCountdown() {
                const now = new Date();
                const distance = endDate - now;

                if (distance < 0) {
                    clearInterval(countdownTimer);
                    $(".cut-count-down-hours").text("00");
                    $(".cut-count-down-minutes").text("00");
                    $(".cut-count-down-seconds").text("00");
                    return;
                }

                const totalHours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                $(".cut-count-down-hours").text(totalHours.toString().padStart(2, '0'));
                $(".cut-count-down-minutes").text(minutes.toString().padStart(2, '0'));
                $(".cut-count-down-seconds").text(seconds.toString().padStart(2, '0'));
            }

            updateCountdown();
            const countdownTimer = setInterval(updateCountdown, 1000);



            // Video lazy loading
            let observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let $video = $(entry.target);
                        let realSrc = $video.attr('data-src');
                        if (realSrc) {
                            $video.attr('src', realSrc);
                            $video[0].load();
                            $video[0].play();
                            $video.removeAttr('data-src');
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '200px 0px'
            });
            $('.cut-lazy-video').each(function () {
                observer.observe(this);
            });

        })