'use strict';

function combineJsd(strList) {
    var cdnCombineJs = "";
    var cdnCombineCss = "";
    var result = "";
    var regex = "https://cdn.jsdelivr.net/";
    for (let str of strList) {
        if (str.endsWith('.js')) {
            if (str.startsWith(regex)) {
                if (!cdnCombineJs) {
                    cdnCombineJs = "https://cdn.jsdelivr.net/combine/" + str.replace(regex,"");
                } else { 
                    cdnCombineJs += str.replace(regex,",")
                } 
            } else { 
                result += `<script src="${str}"></script> \n `;
            }
        } else if (str.endsWith('.css')) {
            if (str.startsWith(regex)) {
                if (!cdnCombineCss) {
                    cdnCombineCss = "https://cdn.jsdelivr.net/combine/" + str.replace(regex,"");
                } else { 
                    cdnCombineCss += str.replace(regex,",")
                } 
            } else { 
                result += `<link rel="stylesheet" href="${str}" crossorigin> \n `;
            }
        }
    }
    if (cdnCombineJs) { 
        result += `<script src="${cdnCombineJs}"></script> \n `;
    }
    if (cdnCombineCss) {
        result += `<link rel="stylesheet" href="${cdnCombineCss}" crossorigin> \n `;
    }
    return result.trim();
}
hexo.extend.helper.register('combine_jsdelivr_cdn', combineJsd);
