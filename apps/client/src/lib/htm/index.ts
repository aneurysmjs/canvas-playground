import { MINI } from "./constants.js";
import { build, evaluate } from "./build.js";

const CACHES = new Map();

function regular(statics: TemplateStringsArray) {
  let tmp = CACHES.get(this);

  if (!tmp) {
    tmp = new Map();
    CACHES.set(this, tmp);
  }

  tmp = evaluate(
    this,
    tmp.get(statics) || (tmp.set(statics, (tmp = build(statics))), tmp),
    arguments,
    []
  );

  return tmp.length > 1 ? tmp : tmp[0];
}

export default MINI ? build : regular;
