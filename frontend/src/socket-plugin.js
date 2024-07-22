import { socket } from '@/socket/';

export default {
    install: (app) => {
        app.config.globalProperties.$socket = socket;
        app.provide('socket', socket);
    }
};
