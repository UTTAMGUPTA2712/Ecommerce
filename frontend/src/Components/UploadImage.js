import { Upload } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';

const UploadImage = ({ changeImage }) => {
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ file: newFile, fileList: newFileList }) => { setFileList(newFileList); (newFile.status === "done") && changeImage(newFile.response) }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    // marginTop: 8,
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
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
                onChange={handleChange}>
                {fileList.length >= 4 ? null : uploadButton}
            </Upload>
        </>
    )
}

export default UploadImage