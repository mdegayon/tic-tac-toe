// blinkService.js
// Servicio singleton que emite un tick true/false sincronizado para todas las celdas.
const BlinkService = (() => {
    const ev = new EventTarget();
    let state = false;
    const duration = 500; // ms - ritmo de alternancia (ajusta si quieres)
    setInterval(() => {
        state = !state;
        ev.dispatchEvent(new CustomEvent('tick', { detail: state }));
    }, duration);
    return {
        subscribe: (handler) => {
            const h = (e) => handler(e.detail);
            ev.addEventListener('tick', h);
            return () => ev.removeEventListener('tick', h); // unsubscribe
        },
        // opcional: permite reiniciar el time base (no necesario en la mayoría de casos)
        // reset: () => { state = false; }
    };
})();

export default BlinkService;
