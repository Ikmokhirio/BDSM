import React, {useState, useRef, useEffect} from 'react';

import {Button, Checkbox, Form, message, Row, Steps, Upload} from "antd"
import {UserOutlined, LoadingOutlined, EditOutlined, UploadOutlined, InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

const {Step} = Steps;

import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import './langs/ru.js'; // Russia localization for text editor
import {useMessage} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {store} from "./store";
import {groupInfo} from "./store/reducers/MessageReducer";

export const EmailSender = ({}) => {

    const {sendMessage, getGroups} = useMessage();
    const [state, setState] = useState<{
        groups: null | groupInfo[],
        content: null | string
    }>({
        content: null,
        groups: []
    })
    const {groups, loading} = useTypedSelector(state => state.message);
    const componentIdMounted = useRef(true);

    useEffect(() => {
        getGroups();
        return () => {
            componentIdMounted.current = false;
        }
    }, []);

    store.subscribe(() => {
            if (componentIdMounted.current) {
                setState({
                    content: state.content,
                    groups: store.getState().message.groups
                });
            }
        }
    )

    const send = (event: any) => {
        console.log("SENDING");
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
                                      setState({content: model, groups: state.groups})
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
                    {
                        state.groups ? state.groups.map((group: any) => {
                            return (<Checkbox key={group.id}>{group.name}</Checkbox>); // TODO : ID select
                        }) : <div/>
                    }
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