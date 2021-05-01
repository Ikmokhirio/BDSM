import React, {useState, useRef} from 'react';

import {Button, Form, Row, Steps} from "antd"
import {UserOutlined, LoadingOutlined, EditOutlined} from '@ant-design/icons';

const {Step} = Steps;

import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import './langs/ru.js'; // Russia localization for text editor

export const EmailSender = ({}) => {

    const [state, setState] = useState({
        content: null
    })

    const sendMessage = (event: any) => {
        event.preventDefault(); // TODO : prepare mail
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

            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} description={item.description} icon={item.icon}/>
                ))}
            </Steps>

            {steps[current].content}

            {
                current === steps.length - 1 && (
                    <Button type="primary" htmlType="submit" className="accept_message_button" onClick={sendMessage}>
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