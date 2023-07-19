import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { server } from '../data/constants';

const UploadImage = ({ changeImage, count = 4 }) => {
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ file: newFile, fileList: newFileList }) => { setFileList(newFileList); (newFile.status === "done") && changeImage(server+newFile.response) }
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