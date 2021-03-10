import styles from './style.scss';

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { Popconfirm, notification } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import { generateImageUrl } from 'src/helpers/Common';
import { actions } from 'src/redux-utils';
import { UPLOAD_MAX_FILECV_SIZE } from 'src/constants/config';

class FileUpload extends PureComponent {
    constructor() {
        super();
        this.state = {
            isFetching: false,
            percent: 0
        };
    }
    onDropFile = (accepted, rejected) => {
        const { commonActions, onChange } = this.props;
        if (Array.isArray(accepted) && accepted.length) {
            const [file] = accepted;
            const typeFileUpload = file.name.substring(file.name.lastIndexOf('.') + 1);
            if (
                typeFileUpload === 'xls' ||
                typeFileUpload === 'pdf' ||
                typeFileUpload === 'docx' ||
                typeFileUpload === 'doc' ||
                typeFileUpload === 'xlsx'
            ) {
                this.setState({ isFetching: true });
                commonActions
                    .uploadCV(
                        { file: file, type: 'users-cv' },
                        {
                            onUploadProgress: progressEvent => {
                                const { isUnmount } = this.state;
                                const { loaded, total } = progressEvent;
                                const percent = Math.floor(loaded * 100 / total);
                                if (!isUnmount) this.setState({ percent });
                            }
                        }
                    )
                    .then(({ data }) => {
                        this.setState({ isFetching: false });
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
                    description: 'Định dạng cho phép (word, excel, pdf)'
                });
            }
        } else {
            notification['error']({
                message: 'Không đúng định dạng cho phép',
                description: 'Định dạng cho phép ( word, excel, pdf)'
            });
        }
    };

    removeImage = e => {
        this.props.onChange('');
    };
    cancleUpload = () => {
        const { commonActions, onChange } = this.props;
        commonActions.cancelUpload();
        this.setState({
            isFetching: false
        });
        onChange('');
    };
    render() {
        const { isFetching, percent } = this.state;
        const { value } = this.props;
        return (
            <Fragment>
                <div className={styles.wrapDropCV}>
                    {value && <span className={styles.file}>{generateImageUrl(value)}</span>}
                    {isFetching ? (
                        <Fragment>
                            <progress value={percent} max="100" /> <span> {percent} %</span>
                            <p onClick={() => this.cancleUpload()} className={styles.cancleUpload}>
                                Hủy
                            </p>
                        </Fragment>
                    ) : (
                        <Dropzone
                            multiple={false}
                            onDrop={this.onDropFile}
                            role="button"
                            maxSize={UPLOAD_MAX_FILECV_SIZE}
                            className={`${styles.uploadBoxCV} ${classnames({ [styles.hasValue]: value })}`}
                        >
                            {!value &&
                                !isFetching && (
                                    <span className={styles.buttonText}>Lựa chọn file upload ( word, excel, pdf)</span>
                                )}
                        </Dropzone>
                    )}
                    {value && (
                        <Popconfirm
                            title="Bạn muốn xóa file này?"
                            onConfirm={this.removeImage}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <span className={styles.removeFile}>x</span>
                        </Popconfirm>
                    )}
                </div>
            </Fragment>
        );
    }
}

FileUpload.defaultProps = {
    onChange: () => null
};

FileUpload.propTypes = {
    commonActions: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string
};

const mapDispatchToProps = dispatch => {
    return {
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};
export default connect(null, mapDispatchToProps)(FileUpload);
