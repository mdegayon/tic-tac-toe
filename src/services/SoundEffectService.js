const SoundEffectService = (function(){

    let muted = false;

    const eventTarget = new EventTarget();

    const sounds = {
        click : new Audio('/media/audio/add-cell.mp3'),
        clickErr : new Audio('/media/audio/non-empty-cell.mp3'),
        win: new Audio('/media/audio/win.mp3'),
        reload: new Audio('/media/audio/reload.mp3'),
    };

    const soundMap = {
        'cell:click': 'click',
        'cell:click-err': 'clickErr',
        'game:win': 'win',
        'game:reload' : 'reload',
    };

    const playSound = function(name) {
        if (muted){
            return;
        }
        const soundToPlay = sounds[name];
        if (soundToPlay) {
            const s = soundToPlay.cloneNode(); // permite reproducir el mismo sonido repetidamente
            s.play().catch(() => {
                console.log("Could not play sound");
            });
        }else{
            console.log("Could not find sound");
        }
    }

    eventTarget.addEventListener('gameEvent', function(evt) {
        if (muted || !evt || !evt.detail) {
            return;
        }
        const gameEventName = evt.detail;
        if (!soundMap.hasOwnProperty(gameEventName)) {
            console.error(`SoundEffectService: unknown event type "${gameEventName}"`);
            return;
        }
        playSound(soundMap[gameEventName]);
    });

    return {
        trigger: function(eventType){
            eventTarget.dispatchEvent(
                new CustomEvent( 'gameEvent', {detail: eventType} )
            );
        },
        mute: function (){
            muted = true;
        },
        unmute: function (){
            muted = false;
        },
        isMute: function (){
            return muted === true;
        },
    };
})();

export default SoundEffectService;