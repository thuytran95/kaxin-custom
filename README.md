## TL;DR

![alt text](https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png 'Next.JS')

## Requirement

*   Nodejs >=8.6.0
*   Yarn >=1.0.0

### Command

**Install**

```bash
yarn install
```

**Start**

```bash
yarn start
```

**Build**

```bash
yarn build
```

### Reference

*   [Next.js document](https://github.com/zeit/next.js)
*   [learnnextjs.com](https://learnnextjs.com/)
*   [Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist)
*   [Front-End-Checklist Vietnamese](https://github.com/euclid1990/Front-End-Checklist)

### Template

*   [Ant Design](https://ant.design/docs/react/introduce)
*   [Bootstrap](https://reactstrap.github.io/)

> **Note**: _Recommend use [gitflow](https://github.com/nvie/gitflow) in project_

*   [Hướng dẫn](#huong-dan)
    *   [Higher-Order Components](#higher-order-components)
    *   [Context props](#context-props)
    *   [Tạo trang](#tao-trang)
    *   [SEO](#seo)

## Hướng dẫn

### Higher-Order Components

### Context props

* Object **context** in `getInitialProps(context)`
    * **store**: Object
    * **isServer**: Boolean
    * **req**: Object
    * **res**: Object
    * **pathname**: String
    * **query**: Object
    * **asPath**: String

### Tạo trang

Tạo trang AboutUs trong thư mục `pages`

```javascript
// pages/about-us.js
import React,{ Component } from 'react';
import { connect } from 'src/redux';

// Tạo trang
class AboutUs extends Component {
    // Có thể lấy dữ liệu nếu cần ở đây
    static async getInitialProps(context) {

        return { title: 'About Us' };
    }

    render() {
        return <div />;
    }
}

//Sử dụng HOC LayoutWrapped để lấy thông tin người dùng nếu đã đăng nhập
export default connect(null, null)(AboutUs);
```

Tạo trang có yêu cầu người dùng đã đăng nhập trước đó

```javascript
// pages/user/profile.js
import React,{ Component } from 'react';
import { connect } from 'src/redux';
import Error from 'next/error';

// Tạo trang
class ProfileComponent extends Component {

    static async getInitialProps(context) {
        return { title: 'Auth',requireAuth:true };
    }

    render() {
        return <div />;
    }
}

ProfileComponent.propTypes = {

};

const mapStateToProps = state => {
    const { auth } = state;
    return { authInfo: auth };
};

export default connect(mapStateToProps, null)(ProfileComponent);
```

### SEO

Sử dụng [react-helmet](https://github.com/nfl/react-helmet)

```javascript
// pages/about-us.js
import React, { Component } from 'react';
import { connect } from 'src/redux';
import Helmet from 'react-helmet';

// Tạo trang
class AboutUs extends Component {
    // Có thể lấy dữ liệu nếu cần ở đây
    static async getInitialProps(context) {
        return { title: 'About Us' };
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <Helmet title={`${title}`} meta={[{ property: 'og:title', content: title }]} />
            </div>
        );
    }
}

export default connect()(AboutUs);
```

> **Chú ý**: Có 2 loại connect là

```js
// Sử dụng với root component của 1 trang
import { connect } from 'src/redux';

// và
// Dùng cho các component nhỏ nằm trong root component của 1 trang
import { connect } from 'react-redux';

```

### Deploy

```bash
pm2 deploy ecosystem.config.js production setup
pm2 deploy ecosystem.config.js production --force

// or
pm2 deploy production update
```
