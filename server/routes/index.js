const routes = (module.exports = require('next-routes')());

routes
    .add({ name: 'home', pattern: '/', page: 'index' })
    .add({ name: 'about', pattern: '/about', page: 'about' })
    .add({ name: 'khoa-hoc.chi-tiet', pattern: '/khoa-hoc/:id-:slug', page: 'khoa-hoc/chi-tiet' })
    .add({
        name: 'khoa-hoc-cua-toi.chi-tiet',
        pattern: '/khoa-hoc-cua-toi/:id-:slug',
        page: 'khoa-hoc/chi-tiet/owner'
    })
    .add({
        name: 'khoa-hoc.bai-hoc',
        pattern: '/khoa-hoc-cua-toi/:courseId-:slug/bai-hoc/:lessonId',
        page: 'khoa-hoc/bai-hoc'
    })
    .add({ name: 'kich-hoat-khoa-hoc', pattern: '/kich-hoat-khoa-hoc', page: 'khoa-hoc/kich-hoat' })
    .add({
        name: 'kich-hoat-khoa-hoc.activeCode',
        pattern: '/kich-hoat-khoa-hoc/:activeCode',
        page: 'khoa-hoc/kich-hoat'
    })
    .add({ name: 'dang-nhap', pattern: '/dang-nhap', page: 'dang-nhap' })
    .add({ name: 'dang-ky', pattern: '/dang-ky', page: 'dang-ky' })
    .add({ name: 'kich-hoat-thanh-cong', pattern: '/kich-hoat-thanh-cong', page: 'dang-ky/kich-hoat-tai-khoan' })
    .add({
        name: 'kich-hoat-khong-thanh-cong',
        pattern: '/kich-hoat-khong-thanh-cong',
        page: 'dang-ky/kich-hoat-tai-khoan/false'
    })
    .add({ name: 'gio-hang', pattern: '/gio-hang', page: 'gio-hang' })
    .add({ name: 'thanh-toan', pattern: '/thanh-toan', page: 'thanh-toan' })
    .add({ name: 'thanh-toan.chi-tiet', pattern: '/thanh-toan/:type/:id-:slug', page: 'thanh-toan' })
    .add({ name: 'thanh-toan.cong-tac-vien', pattern: '/thanh-toan/:type/:id-:slug/:refs', page: 'thanh-toan' })
    .add({ name: 'tim-kiem', pattern: '/tim-kiem', page: 'tim-kiem' })
    // .add({ name: 'trang-dong', pattern: '/page/:id-:slug', page: 'pages' })
    .add({ name: 'danh-muc', pattern: '/danh-muc', page: 'khoa-hoc' })
    .add({ name: 'khoa-hoc.combo', pattern: '/combo-khoa-hoc', page: 'khoa-hoc/combo' })
    .add({ name: 'khoa-hoc.combo.chi-tiet', pattern: '/chi-tiet-combo/:id-:slug', page: 'khoa-hoc/combo/chi-tiet' })
    .add({ name: 'danh-muc.chi-tiet', pattern: '/danh-muc/:id-:slug', page: 'khoa-hoc' })
    .add({ name: 'thong-tin-ca-nhan', pattern: '/thong-tin-ca-nhan', page: 'tai-khoan/thong-tin' })
    .add({ name: 'khoa-hoc-cua-toi', pattern: '/khoa-hoc-cua-toi', page: 'tai-khoan/khoa-hoc' })
    .add({
        name: 'tai-khoan.lich-su-dang-ky-khoa-hoc',
        pattern: '/tai-khoan/lich-su-dang-ky-khoa-hoc',
        page: 'tai-khoan/lich-su'
    })
    .add({
        name: 'tai-khoan.chi-tiet-don-hang',
        pattern: '/tai-khoan/lich-su-dang-ky-khoa-hoc/chi-tiet-don-hang-:id',
        page: 'tai-khoan/don-hang'
    })
    .add({ name: 'tin-he-thong', pattern: '/tin-he-thong', page: 'tin-he-thong' })
    .add({ name: 'tai-khoan.thong-bao.chi-tiet', pattern: '/thong-bao/:id', page: '/tai-khoan/thong-bao/chi-tiet' })
    .add({ name: 'tai-khoan.thong-bao', pattern: '/thong-bao', page: 'tai-khoan/thong-bao' })
    .add({ name: 'tai-khoan.qua-tang', pattern: '/tai-khoan/qua-tang', page: 'tai-khoan/qua-tang' })
    .add({ name: 'tai-khoan.cai-dat', pattern: '/tai-khoan/thiet-lap', page: 'tai-khoan/cai-dat' })
    .add({ name: 'tai-khoan.hoa-hong', pattern: '/tai-khoan/quan-ly-hoa-hong', page: 'tai-khoan/hoa-hong' })
    .add({ name: 'tai-khoan.giang-day', pattern: '/khoa-hoc-toi-giang-day', page: 'tai-khoan/giang-day' })
    .add({ name: 'tai-khoan.dang-ky-gv', pattern: '/dang-ky-lam-giang-vien', page: 'tai-khoan/dang-ky-gv' })
    .add({ name: 'dang-ky.cong-tac-vien', pattern: '/dang-ky/cong-tac-vien', page: 'dang-ky/ctv' })
    .add({ name: 'tai-khoan.giang-vien', pattern: '/tai-khoan/giang-vien', page: 'tai-khoan/giang-vien' })
    .add({ name: 'thanh-toan.nganluong', pattern: '/thanh-toan/nganluong', page: 'thanh-toan/nganluong' })
    .add({ name: 'khuyen-mai', pattern: '/khuyen-mai', page: 'khuyen-mai' })
    .add({ name: 'affiliate', pattern: '/affiliate', page: 'affiliate' })
    .add({ name: 'tai-khoan.get-link-affiliate', pattern: '/lay-link-affiliate', page: 'tai-khoan/get-link-affiliate' })
    .add({ name: 'tai-khoan.report', pattern: '/bao-cao-thu-nhap', page: 'tai-khoan/report' })
    .add({ name: 'page', pattern: '/page/:slug', page: 'page' })
    //.add({ name: 'pages', pattern: '/pages/:id-:slug', page: 'pages' })
    .add({ name: 'bai-viet', pattern: '/bai-viet/:route', page: 'pages' })
    .add({ name: 'doi-mat-khau', pattern: '/doi-mat-khau', page: 'tai-khoan/doi-mat-khau' })
    .add({ name: 'tai-khoan.unsubscriber', pattern: '/unsubscriber', page: 'tai-khoan/unsubscriber' });
