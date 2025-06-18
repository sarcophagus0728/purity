// ==UserScript==
// @name SillyTavern Final Punctuation Purifier (Automatic)
// @description This script automatically processes every new AI-generated message to fix punctuation and syntax issues. Designed for import via the Global Scripts extension.
// ==/UserScript==

(function() {
    'use strict';

    // This is the core purification function containing our final, perfected set of regex rules.
    function purifyText(text) {
        // Safety check: if the input is not a string, do nothing.
        if (typeof text !== 'string' || text.length === 0) {
            return text;
        }
        
        let purifiedText = text;

        // --- The Final Special Operations Protocol ---

        // Rule 1: Adjective/Adverb List Coordinator
        // Target: Typical list structures involving "的" or "地".
        // Action: Harmonizes lists like "A的、B的、C的" into "A的 B的 C的".
        const regex1 = /([^，、。？！\s…—]{1,})(的|地)(、|，)\s*/g;
        purifiedText = purifiedText.replace(regex1, '$1$2 ');

        // Rule 2: Atomic Punctuation Annihilator
        // Target: Commas/enumeration commas after short words not ending in "的" or "地".
        // Action: Fixes "atomic" sentences like "他，转身，离开。" into "他转身离开。".
        const regex2 = /([^，、。？！\s…—的地]{1,3})(、|，)\s*/g;
        purifiedText = purifiedText.replace(regex2, '$1');

        // Rule 3: Single-Character Period Pulverizer
        // Target: Periods used to separate single Chinese characters.
        // Action: Fixes "说。我。的。名字。" into "说我的名字。".
        const regex3 = /(。)(?=[\u4e00-\u9fa5])/g;
        purifiedText = purifiedText.replace(regex3, '');

        // Rule 4: Smart Ellipsis Manager
        // Target: Ellipses used in narrative text.
        // Action: Removes them while preserving ellipses used at the end of dialogue.
        const regex4 = /(…|\.\.\.)\s*(?=[^，、。？！\s…—"”」』])/g;
        purifiedText = purifiedText.replace(regex4, ' ');

        // Rule 5: Subject-Verb Bridge Builder
        // Target: Illegal commas separating a subject from its core action.
        // Action: Removes the comma based on a dictionary of common action verbs.
        const regex5 = /(，)\s*(?=(?:伸出|拿出|拿起|俯下身|转过身|抬起头|皱起眉|闭上眼|睁开眼|动了动|张开|合上|看着|听着|感觉|感到|觉得|闻到|看见|看到|发现|愣住|僵住|退后|向前|走近|开口|说道|低语|咆哮|重复|变成|发出|充满|散发|闪烁|燃烧|是如此|安置在|要在这里|守着|冲上前|告诉他|端起|瓦解|消融|松弛下来|冲出来|穿透了))/g;
        purifiedText = purifiedText.replace(regex5, '');

        // Return the fully processed text.
        return purifiedText;
    }

    // This is the core execution block.
    // It hooks into the 'message_generated' event of SillyTavern.
    // This event fires for every new AI message, before it is rendered in the chat.
    SillyTavern.extension_events.on('message_generated', function (data) {
        // Check if the message data is valid.
        if (data && data.message) {
            // Directly modify the content of the message in the data object.
            // This change will be reflected when the message is displayed.
            data.message = purifyText(data.message);
        }
    });

    // Log a confirmation message to the browser's developer console (F12) to confirm the script is active.
    console.log("SillyTavern Final Punctuation Purifier (Automatic) is now active.");

})();