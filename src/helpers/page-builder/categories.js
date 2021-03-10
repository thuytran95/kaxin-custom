import elements from 'components/elements';
import _ from 'lodash';

// Categories
export const categories = ['structure', 'content', 'media', 'form'];
_.forEach(elements, element => {
    if (element.settings && element.settings.category) {
        if (!categories.includes(element.settings.category)) {
            categories.push(element.settings.category);
        }
    }
});
categories.push('other');

// Collapsed categories map
export const categoriesCollapsed = {};
_.forEach(categories, category => {
    categoriesCollapsed[category] = false;
});
