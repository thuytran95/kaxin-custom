import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Heading, SubHeading, BannerContent } from '../element';

const WrapContent = styled.div`
    display: block;
    text-align: ${props => props.align};
    background-image: ${props => (props.image ? `url(${props.image})` : `linear-gradient(240deg, #36d1dc, #5b86e5)`)};
    background-position: center center;
    background-size: cover;
    padding: 132px;
    box-sizing: border-box;
`;

class LayoutContent extends PureComponent {
    static displayName = 'BannerFullWidth';

    render() {
        const { heading, subHeading, align, content, buttonText, buttonLink, image } = this.props;
        return (
            <WrapContent align={align} image={image}>
                <Heading>{heading}</Heading>
                <SubHeading>{subHeading}</SubHeading>
                <div>
                    <BannerContent>{content}</BannerContent>
                </div>
                <div>
                    <Button to={buttonLink}>{buttonText}</Button>
                </div>
            </WrapContent>
        );
    }
}

LayoutContent.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    content: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    image: PropTypes.string
};

export default LayoutContent;
