const icons={
 book:'M4 4h6c2 0 3 1 3 2 0-1 1-2 3-2h4v16h-4c-2 0-3 1-3 2 0-1-1-2-3-2H4V4Zm9 2v16M7 8h3m-3 4h3m6-4h2m-2 4h2',
 sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
 calendar:'M7 3v4m10-4v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 8h1m3 0h1m3 0h1M8 17h1m3 0h1',
 vault:'M4 4h16v5H4V4Zm1 5v11h14V9M9 13h6',chart:'M4 4v16h16M8 16v-4m4 4V8m4 8V5',search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM15 15l6 6',
 settings:'M4 7h16M4 17h16M8 4v6m8 4v6',plus:'M12 5v14M5 12h14',pen:'m15 4 5 5M4 20l1-5L16 4a2 2 0 0 1 3 0l1 1a2 2 0 0 1 0 3L9 19l-5 1Z',lock:'M8 10V7a4 4 0 0 1 8 0v3M7 10h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Zm5 5v2',close:'M6 6l12 12M6 18 18 6',
 star:'m12 3 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1-6.2L2 9.6l6.3-.9L12 3Z',mic:'M9 6a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V6ZM6 10v2a6 6 0 0 0 12 0v-2m-6 8v4m-3 0h6',photo:'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm-2 12 6-6 4 4 3-3 5 6M15 8h.1',check:'M5 12l4 4L19 6',download:'M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3',
 people:'M14 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6m3 5a5 5 0 0 1 2 4v2',place:'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',chevron:'m14 6-6 6 6 6',trash:'M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
 palette:'M21 11a9 9 0 1 0-9 10c1 0 2-.7 2-1.7 0-.8-.6-1.2-.6-2.2 0-.9.8-1.7 1.7-1.7H18c2 0 3-1.8 3-4.4ZM7 9h.1M10 5h.1M15 6h.1M18 10h.1',reset:'M3 11a9 9 0 1 1 2 7M3 4v7h7',menu:'M4 6h16M4 12h16M4 18h16',arrow:'M4 12h16m-6-6 6 6-6 6',spark:'m12 3 2 6 6 3-6 2-2 7-2-7-6-2 6-3 2-6',heart:'M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6l-8 8Z'
};
const logoPaths='<path d="M43 18a19 19 0 1 0 1 27"/><path d="m35 37 14 15"/><path class="logo-detail" d="M23 25h12M23 32h8"/>';
const icon=n=>n==='logo'?`<svg class="qadawi-symbol" viewBox="0 0 64 64" aria-hidden="true">${logoPaths}</svg>`:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[n]||icons.book}"/></svg>`;
const nav=[['today','اليوم','sun'],['journal','دفتر الأيام','book'],['calendar','التقويم','calendar'],['memories','الذكريات','vault'],['insights','لمحات من حياتي','chart'],['search','البحث','search']];
import {boot} from './journal.js';
boot({icon,nav});
