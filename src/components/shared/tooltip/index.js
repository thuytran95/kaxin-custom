import Portal from 'components/shared/portal';
import Stick from 'components/shared/stick';
import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Theme from 'components/shared/Theme';
import { RootWrap, WrapTooltip } from './styled';

export default class Tooltip extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: PropTypes.object,
        maxWidth: PropTypes.number,
        dark: PropTypes.bool
    };

    state = {
        showing: false
    };

    holder = createRef();

    showTooltip = () => {
        this.setState({
            showing: true
        });
    };

    hideTooltip() {
        this.setState({
            showing: false
        });
    }

    onMouseEnter = () => {
        this.timeout = setTimeout(this.showTooltip, 1000);
    };

    onMouseLeave = () => {
        clearTimeout(this.timeout);
        this.hideTooltip();
    };

    render() {
        const { className, style, children, ...props } = this.props;
        delete props.maxWidth;
        return (
            <RootWrap
                className={className}
                style={style}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                innerRef={this.holder}
                {...props}
            >
                {children}
                {this.renderTooltip()}
            </RootWrap>
        );
    }

    renderTooltip = () => {
        if (this.state.showing) {
            const { label, maxWidth, dark } = this.props;
            const tooltipStyle = {
                maxWidth
            };

            return (
                <Portal>
                    <Stick
                        element={this.holder.current}
                        verticalPosition="bottom"
                        horizontalPosition="center"
                        verticalOffset={5}
                    >
                        <Theme>
                            <WrapTooltip dark={dark} style={tooltipStyle}>
                                {label}
                            </WrapTooltip>
                        </Theme>
                    </Stick>
                </Portal>
            );
        }
    };
}
