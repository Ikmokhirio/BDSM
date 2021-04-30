import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import React, {Component, useState} from 'react';


const [state, setState] = useState({
    imageUrl: "",
    loading: false
})

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

function handleChange(info: any) {
    if (info.file.status === 'uploading') {
        setState({imageUrl: state.imageUrl, loading: true});
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl: any) =>
            setState({
                imageUrl,
                loading: false,
            }),
        );
    }
};

const uploadButton = (
    <div>
        {state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
        <div style={{marginTop: 8}}>Загрузить</div>
    </div>
);

const AvatarForm: React.FC<any> = () => (
    <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/uploadPath" // TODO : BACKEND STUFF https://www.mocky.io/v2/5cc8019d300000980a055e76
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {state.imageUrl ? <img src={state.imageUrl} alt="avatar"/> : uploadButton}
    </Upload>
);

export default AvatarForm
