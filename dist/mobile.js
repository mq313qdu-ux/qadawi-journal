/* Presentation-only keyboard handling; never reads or stores field contents. */
export function observeKeyboard(){
 const viewport=window.visualViewport;if(!viewport)return;
 let baseline=innerHeight,width=innerWidth,frame;
 const update=()=>{
  const active=document.activeElement,editing=active?.matches('textarea,input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color])')||active?.isContentEditable;
  if(Math.abs(width-innerWidth)>80){baseline=innerHeight;width=innerWidth}
  if(!editing)baseline=innerHeight;
  const keyboard=innerWidth<=700&&viewport.scale===1&&editing&&Math.max(baseline,innerHeight)-viewport.height-viewport.offsetTop>120;
  document.body.dataset.keyboard=String(Boolean(keyboard));
  document.documentElement.style.setProperty('--keyboard-inset',keyboard?`${Math.max(0,innerHeight-viewport.height-viewport.offsetTop)}px`:'0px');
  document.documentElement.style.setProperty('--visible-viewport-height',`${viewport.height}px`);
 };
 const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};
 viewport.addEventListener('resize',schedule);viewport.addEventListener('scroll',schedule);window.addEventListener('resize',schedule);document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);update();
}
