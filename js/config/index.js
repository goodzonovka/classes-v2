import {spacingConfig} from "./spacingConfig";
import {textConfig} from "./textConfig";
import {position} from "./position.js";
import {display} from "./display.js";
import {size} from "./size.js";
import {flexConfig} from "./flexConfig";

export const config = {
    ...spacingConfig,
    ...textConfig,
    ...flexConfig,
    ...position,
    ...display,
    ...size,
}