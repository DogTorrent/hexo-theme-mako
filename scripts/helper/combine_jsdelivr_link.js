'use strict';

function combineJsdLink(strList) {
    var cdnCombineLink = "";
    var regex = "https://cdn.jsdelivr.net/";
    for (let str of strList) {
        if (str.startsWith(regex)) {
            if (!cdnCombineLink) {
                cdnCombineLink = "https://cdn.jsdelivr.net/combine/" + str.replace(regex,"");
            } else { 
                cdnCombineLink += str.replace(regex,",")
            } 
        }
    }
    return cdnCombineLink.trim();
}
hexo.extend.helper.register('combine_jsdelivr_link', combineJsdLink);
