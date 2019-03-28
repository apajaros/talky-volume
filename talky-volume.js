const addVolumeSlider = (e) => {
    const slider = document.createElement('input');
    slider.classList.add("volume");
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 100;
    slider.step = 1;

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
        if (newVolume === "0") {
            toggleMute(event.target, 'VolumeIcon');
        } else {
            toggleMute(event.target, 'VolumeOffIcon');
        }
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

document.querySelector('body').addEventListener('click', function(e) {
    let target = e.target;
    while (target != null){
        if (target.classList.contains('TalkyButton')){
            let slider = target.parentNode.nextSibling;
            if (slider && slider.classList.contains('volume')) {
                if(slider.value === "0") {
                    slider.value = slider.dataset.volumeBeforeMute;
                } else if (!target.classList.contains('TalkyButton__off')) {
                    slider.dataset.volumeBeforeMute = slider.value;
                    slider.value = 0;
                }
            }
            return;
        }
        target = target.parentElement;
    }
}, true);
