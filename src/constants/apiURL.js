export const authAPI = '/kong/auth/api/v1/auth';
export const logoutAPI = '/kong/auth/api/v1/auth/logout';
export const registerAPI = '/kong/users/api/v1/users/register';
export const meAPI = '/kong/auth/api/v1/auth';
export const myCoursesAPI = '/kong/courses/api/v1/courses/auth';
export const orderHistoriesAPI = '/kong/orders/api/v1/orders/auth';

//Order API
export const ordersAPI = '/kong/orders/api/v1/orders';
export const orderAPI = id => `/kong/orders/api/v1/orders/${id}`;
export const verificationAPI = '/kong/orders/api/v1/orders/verification';
export const sendCouponAPI = '/kong/promotions/api/v1/discountPromotions/amounts';

export const courseAPI = '/kong/courses/api/v1/courses';
export const coursePromotionsAPI = '/kong/promotions/api/v1/discountsCourses/list-courses-sale-off';
export const courseHighLightAPI = '/kong/categories/api/v1/categories/high-light';
//export const cartAPI = '/kong/courses/api/v1/courses/cart';

export const courseDetailAPI = id => `/kong/courses/api/v1/courses/${id}/learning`;

export const lessonDetailAPI = id => `/kong/courses/api/v1/lessons/${id}`;
export const logLessonAPI = id => `/kong/courses/api/v1/lessons/${id}/logs`;

export const activeCodeAPI = '/kong/courses/api/v1/courses/active-code';

//User API
export const userDetailAPI = id => `/kong/users/api/v1/users/${id}`;
export const changePassAPI = '/kong/users/api/v1/users/change-password';

//Category API
export const categoryAPI = '/kong/categories/api/v1/categories/high-light';
export const listCategoryAPI = '/kong/categories/api/v1/categories';
export const categoryDetailAPI = id => `/kong/categories/api/v1/categories/${id}`;

export const listPageAPI = `/kong/cms/api/v1/post`;
export const pageAPI = route => `/kong/cms/api/v1/post/${route}`;

export const refreshTokenAPI = `/kong/cms/api/refresh-token`;
export const configAPI = `/kong/cms/api/config`;
export const uploadAPI = `/kong/cms/api/upload`;
export const uploadMediaAPI = '/kong/media/api/v1/upload';

export const ratingAPI = `/kong/rating/api/v1/rating`;
export const ratingStatisticsAPI = ({ type, enityId }) => `/kong/rating/api/v1/rating/${type}/${enityId}`;
export const commentAPI = `/kong/rating/api/v1/comments`;

export const listCityAPI = '/kong/cms/api/v1/settings/cities';

//Gift

export const myGiftfAPI = '/kong/promotions/api/v1/giftPromotions/myGift';
export const redeemGiftAPI = '/kong/promotions/api/v1/giftPromotions/useGiftCode';

export const userCoursesAPI = id => `/kong/courses/api/v1/courses/users/${id}`;

//CMS
export const cmsPageAPI = '/kong/cms/api/v1/page';
export const cmsPageByIdAPI = id => `/kong/cms/api/v1/page/${id}`;
export const cmsPageByUrlAPI = '/kong/cms/api/v1/page';

//Widget API
export const widgetFeaturedTopic = '/kong/categories/api/v1/categories/widget-featured-topic';
export const widgetCouponCourse = '/kong/courses/api/v1/courses/widget-coupon-course';
export const widgetDiscountCourse = '/kong/courses/api/v1/courses/widget-promotion-course';

export const widgetSliderCourseHighlighs = '/kong/courses/api/v1/courses/widget-slide-course';
export const widgetSliderCourseNews = '/kong/courses/api/v1/courses';
export const widgetSliderCourseSale = '/kong/courses/api/v1/courses/widget-top-sale';

export const widgetRouteAPI = '/widgets/routes';
export const fieldByWidgetAPI = ({ widget }) => {
    return `/widgets/${widget}/fields`;
};

export const manualNoticeAPI = '/kong/notifications/api/v1/notiManuals';
export const myNoticeAPI = '/kong/notifications/api/v1/notifications/myNoti';
export const readNoticeAPI = id => `/kong/notifications/api/v1/notifications/${id}`;
export const resetBaggyAPI = '/kong/notifications/api/v1/notifications/resetBaggy';
export const resetReadAPI = '/kong/notifications/api/v1/notifications/resetRead';
export const deviceTokenAPI = '/kong/notifications/api/v1/deviceToken';

//Combos
export const combosAPI = '/kong/courses/api/v1/combos';
export const combosDetailAPI = id => `/kong/courses/api/v1/combos/${id}`;
export const teacherCoursesAPI = '/kong/courses/api/v1/courses/my-courses';

export const commissionAPI = '/kong/orders/api/v1/commissions';

//API SETTING
export const listSettingAPI = '/kong/cms/api/v1/settings';
export const settingAPI = id => `/kong/cms/api/v1/settings/${id}`;

//API NEWSLETTER
export const listNewsletterAPI = '/kong/cms/api/v1/newsletters';
export const newsletterAPI = id => `/kong/cms/api/v1/newsletters/${id}`;

export const reportHistoryAPI = '/kong/orders/api/v1/commissions/report-history';
export const reportCoursesHistoryAPI = '/kong/orders/api/v1/commissions/courses-history';
export const reportChartAPI = '/kong/orders/api/v1/commissions/report';

export const seoAPI = '/kong/cms/api/v1/settings/seo-meta-field';
export const unsubscriberAPI = '/kong/cms/api/v1/newsletters/unsubscriber';

//API FE

export const courseFEAPI = '/kong/courses/api/v1/courses/frontend';
export const courseSaleFEAPI = '/kong/promotions/api/v1/discountsCourses/frontend/list-courses-sale-off';
export const catHightLightAPI = '/kong/categories/api/v1/categories/frontend/high-light';
