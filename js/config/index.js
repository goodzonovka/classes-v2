import {position} from "./position.js";
import {spacingConfig} from "./spacingConfig";
import {display} from "./display.js";
import {size} from "./size.js";

export const config = {
    ...spacingConfig,
    ...position,
    ...display,
    ...size,
}