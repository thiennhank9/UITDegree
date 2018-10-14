const globalstate = {
    state: {
        userdata: ''
    },
    setState(state) {
        this.state = state;
    },
    clearState() {
        this.state = {
            userdata: ''
        };
    }
};

export { globalstate }