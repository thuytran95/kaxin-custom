import style from './style.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const commonLinks = [
    { as: '/thong-tin-ca-nhan', name: 'Thông tin cá nhân', href: '/tai-khoan/thong-tin'},
    { as: '/khoa-hoc-cua-toi', name: 'Khóa học của tôi', href: '/tai-khoan/khoa-hoc'},
    {   href: '/tai-khoan/lich-su',
        as: '/tai-khoan/lich-su-dang-ky-khoa-hoc',
        matchFunc: function(href) {
            return href.match(/^\/tai-khoan\/lich-su-dang-ky-khoa-hoc\/chi-tiet-don-hang-\d{1,}$/) !== null;
        },
        name: 'Lịch sử đăng ký khóa học'
    },
    { href: '/tai-khoan/qua-tang', as: '/tai-khoan/qua-tang', name: 'Quà tặng' },
    { href: '/tai-khoan/dang-ky-gv', as: '/dang-ky-lam-giang-vien', name: 'Đăng ký làm giảng viên', for: ['customer'] },
    { href: '/dang-ky/ctv', as: '/dang-ky/cong-tac-vien', name: 'Đăng ký làm công tác viên', for: ['customer'] },
    { href: '/tai-khoan/doi-mat-khau', as: '/doi-mat-khau', name: 'Đổi mật khẩu' }
];

const teacherLinks = [
    { href: '/tai-khoan/giang-vien', name: 'Thông tin giảng viên' },
    { href: '/khoa-hoc-toi-giang-day', name: 'Khóa học của tôi giảng dạy' },
    { href: '/tai-khoan/quan-ly-hoa-hong', name: 'Quản lý hoa hồng' }
];

const partnerLinks = [
    { href: '/lay-link-affiliate', name: 'Lấy link affiliate' },
    { href: '/bao-cao-thu-nhap', name: 'Báo cáo thu nhập' }
];

class NavComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { href, authInfo } = this.props;
        const { userInfo: data = {} } = authInfo;
        return (
            <div className={style.navigationWrapper}>
                <ul>
                    {commonLinks.map(
                        link =>
                            link.for && !link.for.includes(data.rolePermissions.name) ? null : (
                                <li key={link.href}>
                                    <Link href={link.href} as={link.as}>
                                        <a
                                            data-selected={
                                                link.href === href || (link.matchFunc && link.matchFunc(href))
                                            }
                                        >
                                            {link.name}
                                        </a>
                                    </Link>
                                </li>
                            )
                    )}
                </ul>
                {data.rolePermissions.name === 'teacher' ? (
                    <ul className={style.hasHeader}>
                        <li>Giảng viên</li>
                        {teacherLinks.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} as={link.as}>
                                    <a data-selected={link.href === href}>{link.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : null}

                {data.rolePermissions.name === 'partner' ? (
                    <ul className={style.hasHeader}>
                        <li>Công tác viên</li>
                        {partnerLinks.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} as={link.as}>
                                    <a data-selected={link.href === href}>{link.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    }
}
NavComponent.propTypes = {
    authInfo: PropTypes.object,
    href: PropTypes.string.isRequired
};
export default NavComponent;
