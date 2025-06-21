jQuery(document).ready(function () {
    const defaultKeywords = "伸出,拿出,拿起,俯下身,转过身,抬起头,皱起眉,闭上眼,睁开眼,动了动,张开,合上,看着,听着,感觉,感到,觉得,闻到,看见,看到,发现,愣住,僵住,退后,向前,走近,开口,说道,低语,咆哮,重复,变成,发出,充满,散发,闪烁,燃烧,是如此,安置在,要在这里,守着,冲上前,告诉他,端起,瓦解,消融,松弛下来,冲出来,穿透了";

    // 加载设置
    function loadSettings() {
        const settings = SillyTavern.extensions.getSettings('Purifier') || {};
        const keywords = settings.keywords || defaultKeywords;
        $('#purifier_keywords').val(keywords);
    }

    // 保存设置
    function saveSettings() {
        const keywords = $('#purifier_keywords').val();
        let settings = SillyTavern.extensions.getSettings('Purifier') || {};
        settings.keywords = keywords;
        SillyTavern.extensions.saveSettings('Purifier', settings);
        toastr.success("净化器关键词已保存！");
    }

    // 绑定事件
    $('#purifier_save_settings').on('click', saveSettings);

    // 初始加载
    loadSettings();
});
