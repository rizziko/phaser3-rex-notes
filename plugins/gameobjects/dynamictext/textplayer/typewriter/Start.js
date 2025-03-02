import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';

var Start = function (children) {
    this.children = children;
    this.index = 0;
    this.onTypeStart(children);
    this.typing();
    return WaitComplete(this);  // Promise
}

export default Start;