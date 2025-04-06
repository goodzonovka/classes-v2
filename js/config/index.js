import {spacingConfig} from "./spacingConfig";
import {textConfig} from "./textConfig";
import {position} from "./position.js";
import {display} from "./display.js";
import {size} from "./size.js";

export const config = {
    ...spacingConfig,
    ...textConfig,
    ...position,
    ...display,
    ...size,
}