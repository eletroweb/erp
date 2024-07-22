import { reactive } from "vue";
import { io } from "socket.io-client";
import { AlertStore } from '@/store/AlertStore'

export const state = reactive({
    connected: false,
    invoicePending: [],
    barEvents: []
});

const token = localStorage.getItem("token");
export const socket = io('http://localhost:3000', {
    query: {
        token: token,
    },
    withCredentials: true,
    extraHeaders: {
        "authentication": token
    }
});

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

socket.on("invoicePending", (...args) => {
    const alertStore = AlertStore();
    alertStore.addHistory(args);
    alertStore.show(args[0], "warn")
    //state.invoicePending.push(args);
});

socket.on("bar", (...args) => {
    state.barEvents.push(args);
});