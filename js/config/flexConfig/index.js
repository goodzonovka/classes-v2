import {direction} from "./direction.js";
import {gap} from "./gap.js";
import {grow} from "./grow.js";
import {shrink} from "./shrink.js";
import {justifyContent} from "./justifyContent.js";
import {alignItems} from "./alignItems.js";
import {alignSelf} from "./alignSelf.js";
import {alignContent} from "./alignContent.js";
import {wrap} from "./wrap.js";
import {order} from "./order.js";

export const flexConfig = {
    ...direction,
    ...gap,
    ...grow,
    ...shrink,
    ...justifyContent,
    ...alignItems,
    ...alignSelf,
    ...alignContent,
    ...wrap,
    ...order,
}