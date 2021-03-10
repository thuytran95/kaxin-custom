import { auth, authActions } from './auth';
import { common, commonActions } from './common';
import { register, registerActions } from './register';
import { course, courseActions } from './course';
import { order, orderActions } from './order';
import { cart, cartActions } from './cart';
import { user, userActions } from './user';
import { category, categoryActions } from './category';
import { page, pageActions } from './cms';
import { entities } from './entities';
import { rating, ratingActions } from './rating';
import { comment, commentActions } from './comment';
import { gift, giftActions } from './gift';
import { pageBuilder, pageBuilderActions } from './page-builder';
import { widget, widgetActions } from './widget';
import { setting, settingActions } from './setting';
import { newsletter, newsletterActions } from './newsletter';

export const reducers = {
    auth,
    common,
    register,
    course,
    order,
    cart,
    user,
    category,
    page,
    entities,
    rating,
    comment,
    gift,
    pageBuilder,
    widget,
    setting,
    newsletter
};

export const actions = {
    authActions,
    commonActions,
    registerActions,
    courseActions,
    orderActions,
    cartActions,
    userActions,
    categoryActions,
    pageActions,
    ratingActions,
    commentActions,
    giftActions,
    pageBuilderActions,
    widgetActions,
    settingActions,
    newsletterActions
};
