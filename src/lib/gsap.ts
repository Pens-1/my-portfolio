import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** 動きを減らす設定でないときだけ演出を走らせる（それ以外は全内容が最初から見える） */
export const MOTION_QUERY = '(prefers-reduced-motion: no-preference)';
export const EASE_OUT = 'power3.out';

export { gsap, ScrollTrigger };
