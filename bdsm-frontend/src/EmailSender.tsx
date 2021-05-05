import React, {useState, useRef, useEffect} from 'react';

import {Button, Checkbox, Form, message, Row, Steps, Upload} from "antd"
import {UserOutlined, LoadingOutlined, EditOutlined, UploadOutlined, InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

import {Redirect} from "react-router-dom";

const {Step} = Steps;

import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import './langs/ru.js'; // Russia localization for text editor
import {useMessage} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {store} from "./store";
import {groupInfo} from "./store/reducers/MessageReducer";
import {userData} from "./store/reducers/UserReducer";

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

    const [groupIds, setGroupIds] = useState<number[]>([]);

    useEffect(() => {
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
        event.preventDefault(); // TODO : prepare mail
        sendMessage({
            body: state.content,
            username: "test",
            password: "1234",
            groupsIds: groupIds
        });
    }

    const onChange = (checkedValues: any) => { // TODO : set state
        setGroupIds(checkedValues);
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
            title: "Загрузите цели",
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
            description: "Загрузите файл с целями, если необходимо",
            icon: <InboxOutlined/>
        },
        {
            title: "Выберите группы рассылки",
            content: (
                <div className={"stepContent"}>
                    <Checkbox.Group onChange={onChange}>
                        {
                            state.groups ? state.groups.map((group: any) => {
                                return (<Checkbox key={group.id} value={group.id}>{group.name}</Checkbox>); // TODO : ID select
                            }) : <div/>
                        }
                    </Checkbox.Group>
                </div>
            ),
            description: "Выберите группы из списка доступных, чтобы начать рассылку",
            icon: <UserOutlined/>
        }
    ]

    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current === steps.length - 2) {
            getGroups(); // TODO : better place?
        }
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }


    if (store.getState().user.userData.username) {
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
    } else {
        return (<Redirect to={"/login"}/>)
    }


}