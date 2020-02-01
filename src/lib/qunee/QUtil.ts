/**
 *
 * @param t
 */
function toColor(t: number): string {
  return 16777216 > t
    ? `#${("000000" + t.toString(16)).slice(-6)}`
    : `rgba(${(t >> 16) & 255},${(t >> 8) & 255},${255 & t},${(
        ((t >> 24) & 255) /
        255
      ).toFixed(2)})`;
}

/**
 *
 * @param t
 */
function randomColor(t: number): string {
  if (t && t > 0 && 1 > t) {
    const i = Math.floor(16777215 * Math.random());
    return `rgba(${(i >> 16) & 255},${(i >> 8) & 255},${255 & i},${t.toFixed(
      2
    )})`;
  }

  return toColor(Math.floor(16777215 * Math.random()));
}

/**
 *
 * @param fn
 * @param ctx
 * @param timeout
 */
function callLater(
  fn: (...args: any[]) => void,
  ctx?: string | object,
  timeout?: number
): number {
  if (typeof ctx === "object") {
    fn = fn.bind(ctx);
  } else if (ctx && !timeout) {
    timeout = Number.parseInt(ctx, 10);
  }

  if (timeout) {
    return window.setTimeout(fn, timeout);
  } else {
    return window.setTimeout(fn);
  }
}

/**
 *
 * @param t
 */
function randomInt(t: number): number {
  return Math.floor(Math.random() * t);
}

/**
 *
 */
function randomBool(): boolean {
  return Math.random() >= 0.5;
}

/**
 *
 * @param e
 */
function eventPreventDefault(e?: Event) {
  if (!e) {
    e = window.event;
  }

  if (e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }
}

/**
 *
 * @param e
 */
function eventStopPropagation(e?: Event) {
  if (!e) {
    e = window.event;
  }

  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (!e.cancelBubble) {
      e.cancelBubble = true;
    }
  }
}

/**
 *
 * @param e
 */
function stopEvent(e?: Event) {
  eventPreventDefault(e);
  eventStopPropagation(e);
}

/**
 *
 * @param el
 * @param className
 */
function setClass(el: Element, className: string): Element {
  el.className = className;
  return el;
}

/**
 *
 * @param el
 * @param className
 */
function appendClass(el: Element, className: string): Element {
  if (!el.hasOwnProperty("classList")) {
    let classAttr = el.getAttribute("class");
    if (!classAttr) {
      return setClass(el, className);
    }

    const classes = classAttr.split(" ");
    for (let i = 0, length = classes.length; length > i; i++) {
      if (classes[i] == className) {
        return el;
      }
    }

    classAttr += ` ${className}`;
    return setClass(el, classAttr);
  }

  el.classList.add(className);

  return el;
}

/**
 *
 * @param el
 * @param className
 */
function removeClass(el: Element, className: string): Element {
  if (!el.hasOwnProperty("classList")) {
    let classAttr = el.getAttribute("class");
    if (!classAttr || !classAttr.indexOf(className)) {
      return el;
    }

    const classes = classAttr.split(" ");
    let _className = "";
    for (let i = 0, length = classes.length; length > i; i++) {
      if (classes[i] != className) {
        _className += `${classes[i]} `;
      }
    }

    return setClass(el, _className);
  }

  el.classList.remove(className);

  return el;
}

/**
 *
 * @param fn
 * @param ctx
 */
function nextFrame(fn: (time: number) => void, ctx?: any): number {
  if (ctx) {
    fn = fn.bind(ctx);
  }

  return window.requestAnimationFrame(fn);
}

export {
  toColor,
  randomColor,
  callLater,
  randomInt,
  randomBool,
  stopEvent,
  eventPreventDefault,
  eventStopPropagation,
  setClass,
  appendClass,
  removeClass,
  nextFrame
};
