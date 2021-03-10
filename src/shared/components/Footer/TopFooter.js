import style from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import Link from 'next/link';
class TopFooter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: ''
        };
    }
    handleToggle = tab => {
        if (this.state.isShowInfo !== tab || this.state.isShowInfo !== '') {
            this.setState({ isShowInfo: tab });
        }
        if (this.state.isShowInfo === tab) {
            this.setState({ isShowInfo: '' });
        }
    };
    render() {
        return (
            <Fragment>
                <div className={style.topFooter}>
                    <div className="container">
                        <div className="row">
                            <div className={`col-12 col-lg-6 ${style.textIntroApp}`}>
                                <h3>TẢI APP ĐỌC SÁCH</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis nulla
                                    molestie velit sagittis, ut elementum ipsum suscipit. Phasellus ac sapien sit amet
                                    urna viverra consectetur. Cras vehicula mauris ipsum.
                                </p>
                                <div className={style.btnApp}>
                                    <h4 className={style.widgetTitleFooter}>App Kaixin</h4>
                                    <Link href="https://play.google.com/store/apps/details?id=com.mc.books">
                                        <a>
                                            <img
                                                src="/static/assets/images/app/1.png"
                                                alt="Công ty sách Kaixin – Knowlege sharing"
                                            />
                                        </a>
                                    </Link>
                                    <Link href="https://itunes.apple.com/vn/app/mcbooks-ver2/id1383126097?mt=8">
                                        <a>
                                            <img
                                                src="/static/assets/images/app/2.png"
                                                alt="Công ty sách Kaixin – Knowlege sharing"
                                            />
                                        </a>
                                    </Link>
                                </div>

                                <div className={style.btnApp}>
                                    <h4 className={style.widgetTitleFooter}>App TKBooks</h4>
                                    <Link href="https://play.google.com/store/apps/details?id=com.tk.books">
                                        <a>
                                            <img
                                                src="/static/assets/images/app/1.png"
                                                alt="Công ty sách MCBooks – Knowlege sharing"
                                            />
                                        </a>
                                    </Link>
                                    <Link href="https://itunes.apple.com/vn/app/tkbooks/id1441525512?mt=8">
                                        <a>
                                            <img
                                                src="/static/assets/images/app/2.png"
                                                alt="Công ty sách Kaixin – Knowlege sharing"
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className={`col-12 col-lg-6 ${style.imgIntroApp}`}>
                                <img
                                    src="/static/assets/images/iphone.png"
                                    alt="Công ty sách Kaixin – Knowlege sharing"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TopFooter;
