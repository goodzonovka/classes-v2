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
        'w-min': 'min-content',
        'w-max': 'max-content',
        'w-fit': 'fit-content',
    }
}