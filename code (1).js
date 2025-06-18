// ==UserScript==
// @name purify
// @description Applies a series of regex rules to the last message to remove redundant punctuation.
// ==/UserScript==

function purifyText(text) {
    let purifiedText = text;

    // Rule 1: Adjective/Adverb List Coordinator
    const regex1 = /([^，、。？！\s…—]{1,})(的|地)(、|，)\s*/;
    purifiedText = purifiedText.replace(regex1, '$1$2 ');

    // Rule 2: Atomic Punctuation Annihilator
    const regex2 = /([^，、。？！\s…—的地]{1,3})(、|，)\s*/;
    purifiedText = purifiedText.replace(regex2, '$1');

    // Rule 3: Single-Character Period Pulverizer
    const regex3 = /(。)(?=[\u4e00-\u9fa5])/;
    purifiedText = purifiedText.replace(regex3, '');

    // Rule 4: Smart Ellipsis Manager
    const regex4 = /(…|\.\.\.)\s*(?=[^，、。？！\s…—"”」』])/;
    purifiedText = purifiedText.replace(regex4, ' ');

    // Rule 5: Subject-Verb Bridge Builder
    const regex5 = /(，)\s*(?=(?:伸出|拿出|拿起|俯下身|转过身|抬起头|皱起眉|闭上眼|睁开眼|动了动|张开|合上|看着|听着|感觉|感到|觉得|闻到|看见|看到|发现|愣住|僵住|退后|向前|走近|开口|说道|低语|咆哮|重复|变成|发出|充满|散发|闪烁|燃烧|是如此|安置在|要在这里|守着|冲上前|告诉他|端起|瓦解|消融|松弛下来|冲出来|穿透了))/g;
    purifiedText = purifiedText.replace(regex5, '');

    return purifiedText;
}

return purifyText(lastMessage);
