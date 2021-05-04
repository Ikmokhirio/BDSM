import React, {useState, useRef} from 'react';

import {Button, Form, message, Row, Steps, Upload} from "antd"
import {UserOutlined, LoadingOutlined, EditOutlined, UploadOutlined, InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

const {Step} = Steps;

import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import './langs/ru.js';
import {useMessage} from "./hooks/useActions"; // Russia localization for text editor

export const EmailSender = ({}) => {

    const {sendMessage} = useMessage();
    const [state, setState] = useState({
        content: null
    })

    const send = (event: any) => {
        event.preventDefault(); // TODO : prepare mail
        sendMessage({
            body: state.content,
            username: "test",
            password: "1234",
            groupsIds: [1, 2, 3]
        });
    }

    const props = {
        name: 'targets',
        action: 'api/targets',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} загружен`);
            } else if (info.file.status === 'error') {
                message.success(`${info.file.name} ошибка`);
            }
        }
    }

    const steps = [
        {
            title: 'Создайте письмо',
            content: (
                <div className={"stepContent"}>
                    <h1>Ваше письмо</h1>
                    <FroalaEditor model={state.content}
                                  config={
                                      {
                                          language: "ru",
                                          heightMin: 384
                                      }
                                  }
                                  onModelChange={(model: any) => {
                                      setState({content: model})
                                  }}/>
                </div>
            ),
            description: "Напишите письмо, которое хотите разослать",
            icon: <EditOutlined/>
        },
        {
            title: "Выберите цели",
            content: (
                <div className={"stepContent"}>
                    <Dragger {...props} className={"targetDragger"}>
                        <p className={"ant-upload-drag-icon"}>
                            <InboxOutlined/>
                        </p>
                        <p>
                            Нажмите или перетащите файл, содержаший цели для рассылки
                        </p>
                    </Dragger>
                </div>
            ),
            description: "Выберите цели для рассылки писем",
            icon: <UserOutlined/>
        },
        {
            title: "Ожидайте",
            content: (
                <div className={"stepContent"}>

                </div>
            ),
            description: "Ожидайте завершения рассылки",
            icon: <LoadingOutlined/>
        }
    ]

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }

    return (
        <div className="taskCreator">

            <Steps current={current} type="navigation">
                {steps.map(item => (
                    <Step key={item.title} title={item.title} description={item.description} icon={item.icon}/>
                ))}
            </Steps>

            {steps[current].content}

            {
                current === steps.length - 1 && (
                    <Button type="primary" htmlType="submit" className="accept_message_button" onClick={send}>
                        Готово
                    </Button>
                )
            }

            {
                current < steps.length - 1 && (
                    <Button type="primary" htmlType="submit" className="accept_message_button" onClick={next}>
                        Далее
                    </Button>
                )
            }

            {
                current > 0 && (
                    <Button type="primary" htmlType="submit" className="accept_message_button" onClick={prev}>
                        Назад
                    </Button>
                )
            }


        </div>
    )


}