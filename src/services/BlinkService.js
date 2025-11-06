// blinkService.js
// Servicio singleton que emite un tick true/false sincronizado para todas las celdas.
const BlinkService = (() => {

    const ev = new EventTarget();
    let state = false;
    const duration = 500; // ms - ritmo de alternancia (ajusta si quieres)

    setInterval(
        function() {
            console.log("Tick");
            state = !state;
            ev.dispatchEvent(new CustomEvent('tick', { detail: state }));
        },
        duration
    );

    return {
        subscribe: function(handler){

            const handleWrapper = function(e){
                handler(e.detail);
            }

            ev.addEventListener('tick', handleWrapper);

            return function(){
                ev.removeEventListener('tick', handleWrapper); // unsubscribe
            }
        },

    };

})(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CALLED!!!

export default BlinkService;
