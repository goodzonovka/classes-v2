import {spacingConfig} from "./spacingConfig";
import {textConfig} from "./textConfig";
import {flexConfig} from "./flexConfig";
import {position} from "./position.js";
import {display} from "./display.js";
import {size} from "./size.js";
import {cursor} from "./cursor.js";
import {background} from "./background.js";

export const config = {
    ...spacingConfig,
    ...textConfig,
    ...flexConfig,
    ...position,
    ...display,
    ...size,
    ...cursor,
    ...background,
}