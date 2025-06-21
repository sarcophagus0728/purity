(function () {
    'use strict';

    jQuery(document).ready(function () {
        const defaultKeywords = "伸出,拿出,拿起,俯下身,转过身,抬起头,皱起眉,闭上眼,睁开眼,动了动,张开,合上,看着,听着,感觉,感到,觉得,闻到,看见,看到,发现,愣住,僵住,退后,向前,走近,开口,说道,低语,咆哮,重复,变成,发出,充满,散发,闪烁,燃烧,是如此,安置在,要在这里,守着,冲上前,告诉他,端起,瓦解,消融,松弛下来,冲出来,穿透了";

        function purifyText(text) {
            if (typeof text !== 'string' || text.length === 0) { return text; }
            
            let purifiedText = text;

            // 获取用户设置，如果不存在则使用默认值
            const settings = SillyTavern.extensions.getSettings('Purifier') || {};
            const userKeywords = settings.keywords || defaultKeywords;
            const keywordList = userKeywords.split(',').map(k => k.trim()).join('|');

            // --- The Final Special Operations Protocol ---
            const regex1 = /([^，、。？！\s…—]{1,})(的|地)(、|，)\s*/g;
            purifiedText = purifiedText.replace(regex1, '$1$2 ');

            const regex2 = /([^，、。？！\s…—的地]{1,3})(、|，)\s*/g;
            purifiedText = purifiedText.replace(regex2, '$1');

            const regex3 = /(。)(?=[\u4e00-\u9fa5])/g;
            purifiedText = purifiedText.replace(regex3, '');

            const regex4 = /(…|\.\.\.)\s*(?=[^，、。？！\s…—"”」』])/g;
            purifiedText = purifiedText.replace(regex4, ' ');

            // **核心升级**：动态构建第五条规则的正则表达式
            if (keywordList) {
                const regex5 = new RegExp(`(，)\\s*(?=:(?:${keywordList}))`, 'g');
                purifiedText = purifiedText.replace(regex5, '');
            }

            return purifiedText;
        }

        SillyTavern.extension_events.on('message_generated', function (data) {
            if (data && data.message) {
                data.message = purifyText(data.message);
            }
        });

        console.log("SillyTavern Punctuation Purifier (with settings) is now active.");
    });
})();
