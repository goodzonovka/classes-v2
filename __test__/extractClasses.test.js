const { parse } = require('node-html-parser');
const config = require('../config/index.js');

const { extractMatchingClassesFromDomElements } = require('../build-css');

test('извлекает классы из HTML', () => {
    const html = parse(`<div><div class="mg-10 m-10 p-5 bg-red-500 text-sm"></div></div>`);
    const elementsWithClass = html.querySelectorAll('[class]')
    const result = extractMatchingClassesFromDomElements(elementsWithClass, config);

    expect(result).toEqual(new Set(['mg-10', 'p-5', 'bg-red-500', 'text-sm']));
});

test('игнорирует классы без известного префикса', () => {
    const html = parse(`<div class="unknown-5 m-5 pd-6 display-text text-lg"></div>`);
    const result = extractMatchingClassesFromDomElements(html.querySelectorAll('[class]'), config);
    expect(result).toEqual(new Set(['text-lg']));
});

test('обрабатывает responsive префиксы', () => {
    const html = parse(`<div class="xs:mg-5 sm:p-10 md:font-bold lg:text-sm xl:bg-blue-600 xxxl:w-50 xxxxl:h-40"></div>`);
    const result = extractMatchingClassesFromDomElements(html.querySelectorAll('[class]'), config);
    expect(result).toEqual(new Set(['xs:mg-5', 'sm:p-10', 'md:font-bold', 'lg:text-sm', 'xl:bg-blue-600', 'xxxl:w-50', 'xxxxl:h-40']));
});

test('обрабатывает state префиксы', () => {
    const html = parse(`<div class="rtl:-scale-x-100 disabled:bg-gray-500 hover:text-gold focus:border-blue-600 before:absolute after:-translate-x-1/2 has:[img]:pl-24 first:mgt-0 last:mgb-0 odd:bg-gray-50 even:font-bold"></div>`);
    const result = extractMatchingClassesFromDomElements(html.querySelectorAll('[class]'), config);
    expect(result).toEqual(new Set(['rtl:-scale-x-100', 'disabled:bg-gray-500', 'hover:text-gold', 'focus:border-blue-600', 'before:absolute', 'after:-translate-x-1/2', 'has:[img]:pl-24', 'first:mgt-0', 'last:mgb-0', 'odd:bg-gray-50', 'even:font-bold']));
});