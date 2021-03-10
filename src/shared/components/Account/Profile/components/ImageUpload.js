import styles from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { notification, Popconfirm } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import { generateImageUrl } from 'src/helpers/Common';
import { actions } from 'src/redux-utils';
//import { UPLOAD_MAX_FILE_SIZE } from 'constants/config';

class ImageUpload extends PureComponent {
    constructor() {
        super();
        this.state = {};
    }
    onDropFile = (accepted, rejected) => {
        const { commonActions, onChange } = this.props;
        if (Array.isArray(accepted) && accepted.length) {
            const [image] = accepted;
            const typeFileUpload = image.name.substring(image.name.lastIndexOf('.') + 1);
            if (typeFileUpload === 'jpg' || typeFileUpload === 'jpeg' || typeFileUpload === 'png') {
                commonActions
                    .uploadImage({ file: image, type: 'users-avatar' })
                    .then(({ data }) => {
                        this.setState(() => onChange(_.get(data, 'data', '')));
                    })
                    .catch(() => {
                        this.setState({
                            isFetching: false
                        });
                    });
            } else {
                notification['error']({
                    message: 'Không đúng định dạng cho phép',
                    description: 'Định dạng cho phép ( jpg, jpeg, png)'
                });
            }
        } else {
            notification['error']({
                message: 'Không đúng định dạng cho phép',
                description: 'Định dạng cho phép ( jpg, jpeg, png)'
            });
        }
    };

    removeImage = e => {
        this.props.onChange('');
    };

    render() {
        const { isFetching } = this.state;
        const { value } = this.props;
        return (
            <Fragment>
                <div className={styles.wrapDrop}>
                    <Dropzone
                        accept="image/*"
                        multiple={false}
                        onDrop={this.onDropFile}
                        role="button"
                        //maxSize={UPLOAD_MAX_FILE_SIZE}
                        className={`${styles.uploadBox} ${classnames({ [styles.hasImage]: value })}`}
                    >
                        {value && <img src={generateImageUrl(value)} alt="Cover" />}
                        {!value && !isFetching && 'Tải lên'}
                    </Dropzone>
                    {value && (
                        <Popconfirm
                            title="Bạn muốn xóa ảnh này?"
                            onConfirm={this.removeImage}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <button type="button" className={styles.removeButton}>
                                Xóa
                            </button>
                        </Popconfirm>
                    )}
                </div>
            </Fragment>
        );
    }
}

ImageUpload.defaultProps = {
    onChange: () => null
};

ImageUpload.propTypes = {
    commonActions: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string
};

const mapDispatchToProps = dispatch => {
    return {
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};
export default connect(null, mapDispatchToProps)(ImageUpload);
