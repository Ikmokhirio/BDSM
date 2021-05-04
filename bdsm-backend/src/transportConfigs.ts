export interface transportConfig {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    }
}

export function generateYandexConfig(login: string, password: string): transportConfig {
    return ({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: login,
            pass: password,
        },
    });
}

export function generateMailRuConfig(login: string, password: string): transportConfig {
    return ({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: login,
            pass: password,
        },
    });
}