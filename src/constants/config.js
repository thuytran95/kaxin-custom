const defaultAvatar = '/static/assets/images/avatar.jpeg';

const { NEXT_APP_API_URL = '', NEXT_APP_ASSET_URL = '', NEXT_APP_SOCKET_URL = '' } = process.env;
// const { NEXT_APP_BUILD_ENV = 'development' } = process.env;

export const APP_DOM_CONTAINER = 'root';

//API URL
export const API_URL = NEXT_APP_API_URL;

// ASSET URL
export const ASSET_URL = NEXT_APP_ASSET_URL;

// BASE URL
export const BASE_URL = process.env;

// Socket URL
export const SOCKET_URL = NEXT_APP_SOCKET_URL;

//CLIENT_ID
export const CLIENT_ID = 1;

export const UPLOAD_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
export const UPLOAD_MAX_FILECV_SIZE = 500 * 1024 * 1024; // 500MB

export const DEFAULT_AVATAR = defaultAvatar;

export const GOOGLE_MAP_API_KEY = 'AIzaSyDWgwCQGoLetkP-8OFb84Dr_jjI8ogHPj8';

export const CLIENT_TIMEOUT = 15000;

export const FB_APP_ID = '1709228422490559';

//Config ngân lượng
// export const BASE_LINK_NL =
//     process.env.NEXT_APP_ENV === 'production'
//         ? 'https://mentor.vn'
//         : process.env.NEXT_APP_ENV === 'testing' ? 'http://qwiki.tqms.net:33002' : 'https://beta.mentor.com.vn';

export const BASE_LINK_NL = process.env.NEXT_APP_BASE_LINK_NL;

// export const MERCHANT_SITE_CODE = process.env.NEXT_APP_ENV === 'production' ? '56474' : '46118';
export const MERCHANT_SITE_CODE = process.env.NEXT_APP_MERCHANT_SITE_CODE;

// export const BASE_EMAIL_NL = process.env.NEXT_APP_ENV === 'production' ? 'Nganluong@mcbooks.vn' : 'mcbook888@gmail.com';
export const BASE_EMAIL_NL = process.env.NEXT_APP_BASE_EMAIL_NL;

// export const SECURE_PASS_NL =
//     process.env.NEXT_APP_ENV === 'production' ? '7373d39ebebed0e6861f21310140b727' : 'a551b62ff42882f12de417a32ba8c97a';

export const SECURE_PASS_NL = process.env.NEXT_APP_SECURE_PASS_NL;

// export const BASE_URL_NL =
//     process.env.NEXT_APP_ENV === 'production'
//         ? 'https://www.nganluong.vn/checkout.php'
//         : 'https://sandbox.nganluong.vn:8088/nl30/checkout.php';

export const BASE_URL_NL = process.env.NEXT_APP_BASE_URL_NL;

// export const TEACHER_LINK =
//     process.env.NEXT_APP_ENV === 'production'
//         ? 'https://teacher.mentor.vn/#/admin/course/create'
//         : 'https://beta.teacher.mentor.vn/#/admin/course/create';

export const TEACHER_LINK = process.env.NEXT_APP_TEACHER_LINK;

// export const SOCKETS_URL =
//     process.env.NEXT_APP_ENV === 'production'
//         ? 'https://sockets.mentor.vn'
//         : process.env.NEXT_APP_ENV === 'testing' ? 'https://103.28.38.94:4000' : 'https://beta.sockets.mentor.vn';

export const SOCKETS_URL = process.env.NEXT_APP_SOCKET_URL;

// export const appIdOS =
//     process.env.NEXT_APP_ENV === 'production'
//         ? 'df3c565c-4be1-412a-9b00-1b78dbe44f85'
//         : 'df3c565c-4be1-412a-9b00-1b78dbe44f85'; //Local

// export const appIdOS =
//     process.env.NEXT_APP_ENV === 'production'
//         ? '7d967127-717b-4d43-b968-6a17963e9eef'
//         : '2d9163b1-41f3-43d0-9e2a-53379fa7c5df'; //Beta

export const appIdOS = process.env.NEXT_APP_APP_IDOS;
