import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Heading, SubHeading, BannerContent, ClearFix } from './../element';

const WrapContent = styled.div`
    max-width: 264px;
    padding: 22px;
    background-image: ${props => (props.image ? `url(${props.image})` : `linear-gradient(195deg, #36d1dc, #5b86e5)`)};
    background-position: center center;
    background-size: cover;
    text-align: ${props => props.align};
    box-sizing: border-box;
    display: inline-block;
`;

class LayoutContent extends PureComponent {
    static displayName = 'BannerMinimumWidth';

    render() {
        const { heading, subHeading, align, content, buttonText, buttonLink, image } = this.props;
        return (
            <WrapContent image={image} align={align}>
                <Heading align={align}>{heading}</Heading>
                <SubHeading align={align}>{subHeading}</SubHeading>
                <BannerContent align={align}>{content}</BannerContent>
                <div>
                    <Button to={buttonLink}>{buttonText}</Button>
                </div>
                <ClearFix />
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
