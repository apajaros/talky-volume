const addVolumeSlider = (e) => {
    const slider = document.createElement('input');
    slider.classList.add("volume");
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 100;
    slider.step = 1;

    let oldVolume = slider.value;

    const toggleMute = (element, icon) => {
        [].slice.call(element.previousSibling.childNodes)
            .flatMap(e => [].slice.call(e.childNodes))
            .filter(node => node.classList.contains(icon))
            .forEach(e => {
                e.click();
            })
    };

    function adjustVolume(element, newVolume) {
        [].slice.call(element.parentNode.childNodes)
            .filter(node => node.nodeName === "AUDIO")
            .forEach(audio => {
                audio.volume = newVolume / 100
            });
    }

    slider.addEventListener('change', event => {
        const newVolume = event.target.value;
        adjustVolume(event.target, newVolume);
        if (newVolume == 0) {
            toggleMute(event.target, 'VolumeIcon');
        } else if (oldVolume == 0) {
            toggleMute(event.target, 'VolumeOffIcon');
        }
        oldVolume = newVolume;
    });
    e.appendChild(slider);
};

const addVolumeSliders = () => {
    [].slice.call(document.getElementsByClassName("RosterItem__base _1XONa"))
        .forEach(e => {
            if ([].slice.call(e.childNodes).find(e => e.classList.contains('volume'))) {
                // this slider already exists
                return;
            }
            addVolumeSlider(e);
            clearInterval(checker);
        });
};

// Check for users to join
const checker = setInterval(addVolumeSliders, 1000);
