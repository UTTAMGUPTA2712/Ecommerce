import { Upload } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';

const UploadImage = ({ changeImage, fileList, setFileList, count = 4 }) => {
    const handleChange = ({ file: newFile, fileList: newFileList }) => { setFileList(newFileList); (newFile.status === "done") && changeImage(newFile.response) }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    textAlign: "center",
                }}>
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Upload
                name="image"
                action="http://localhost:1000/upload"
                listType="picture-card"
                fileList={fileList}
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: count === 1 }}
                onChange={handleChange}>
                {fileList.length >= count ? null : uploadButton}
            </Upload>
        </>
    )
}

export default UploadImage