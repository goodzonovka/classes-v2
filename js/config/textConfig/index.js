import {fontWeight} from "./fontWeight.js";
import {fontSize} from "./fontSize.js";
import {lineHeight} from "./lineHeight.js";
import {textAlign} from "./textAlign.js";
import {whiteSpace} from "./whiteSpace.js";
import {userSelect} from "./userSelect.js";

export const textConfig = {
    ...fontWeight,
    ...fontSize,
    ...lineHeight,
    ...textAlign,
    ...whiteSpace,
    ...userSelect,
}