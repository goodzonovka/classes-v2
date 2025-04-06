export const specialLogic = {
 /*   'display': (className) => {
        const map = {
            'block': 'block', 'inline': 'inline', 'inline-block': 'inline-block',
            'flex': 'flex', 'd-flex': 'flex', 'inline-flex': 'inline-flex', 'grid': 'grid',
            'inline-grid': 'inline-grid', 'hidden': 'none', 'table': 'table'
        };
        return map[className];
    },*/
    'display': {
        'd-flex': 'flex',
        'hidden': 'none'
    },
    'position': true,
    'width': {
        'w-screen': '100vw',
    },
    'min-width': {
        'min-w-screen': '100vw',
    },
    'max-width': {
        'max-w-screen': '100vw',
        'max-w-none': 'none',
    },
    'height': {
        'h-screen': '100vh',
    },
    'min-height': {
        'min-h-screen': '100vh',
    },
    'max-height': {
        'max-h-screen': '100vh',
    },
    'width,height': {
    }
}