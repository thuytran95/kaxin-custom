import { lighten, darken, rgba } from 'polished';

export default {
    primary: '#12A5FF',
    get primaryLight() {
        return lighten(0.3, this.primary);
    },
    get primaryDarker() {
        return darken(0.2, this.primary);
    },
    primarySub: '#73CAFF',
    primaryBack: '#DFF3FF',

    alert: '#ff0000',
    success: '#17B923',
    warning: '#e99815',
    draft: '#F7CF00',
    changed: '#e99815',
    red: 'hsl(348, 100%, 61%)',

    chromeBackgroundColor: '#fff',
    chromeBackgroundDarkerColor: '#fff',
    chromeBackgroundActive: '#3f4249',
    chromeColorActive: '#fff',
    chromeBordersColor: '#d9d9d9',
    chromeTextColor: '#000',
    chromeTextSubColor: '#999999',
    chromeTextColorHighlight: '#ffffff',

    dropSuccess: '#7ED321',
    get dropSuccessBack() {
        return rgba(this.dropSuccess, 0.1);
    },

    symbolColor: '#ff9f00',
    linkColor: '#D64BFF',

    adminBorders: '#efefef',
    adminInputBorders: '#cccccc',
    adminText: '#999999',
    adminTextSub: '#dbdbdb',
    adminTextHighlight: '#3a3a3a',
    adminBordersInputs: '#E1E1E1'
};
