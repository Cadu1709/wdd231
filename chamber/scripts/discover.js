document.addEventListener("DOMContentLoaded", function() {

    //set variables to use
    const lastVisitKey = 'LastVistDate';
    const messageContainer = document.createElement('div');
    const sidebar = document.querySelector('.sidebar');

    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem('lastVisitKey');
    let message = '';

    let lazyImages = [].slice.call(document.querySelectorAll("lazyy"));

    if (lastVisit === null) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - lastVisit;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (timeDifference < 1000 * 60 * 60 * 24) {
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem(lastVisitKey, currentVisit);

    messageContainer.textContent = message;
    messageContainer.className = 'visit-message';
    sidebar.prepend(messageContainer);


    const SetupLazyLoad = () => {
        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazyy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
    
            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            // Fallback for browsers without IntersectionObserver support
            let lazyLoad = function() {
                lazyImages.forEach(function(lazyImage) {
                    if (lazyImage.getBoundingClientRect().top < window.innerHeight && lazyImage.getBoundingClientRect().bottom > 0) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazyy");
                    }
                });
    
                if (lazyImages.length === 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationchange", lazyLoad);
                }
            };
    
    
            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
        }
    };
    //set up lazy load on first scroll
    const onFirstScroll = () => {
        SetupLazyLoad();
        document.removeEventListener("scroll", onFirstScroll);
    };
    document.addEventListener("scroll", onFirstScroll);
    

    //handle join button on discover page
    document.getElementById('toJoin').addEventListener('click',redirect);

    //functionto redirect
    function redirect(){
        window.location.href = "join.html"
    }
});