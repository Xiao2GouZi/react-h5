class Msg {
    subs: any
    constructor() {
        this.subs = {}
    }

    on(event: any, cd: any) {
        (this.subs[event] || (this.subs[event] = [])).push(cd)
    }

    trigger(event: any, ...args: any) {
        this.subs[event] && this.subs[event].forEach((cd: any) => {
            cd(...args)
        });
    }

    once(event: any, onceCb: any) {
        const cd = (...args: any) => {
            onceCb(...args)
            this.off(event, onceCb)
        }
        this.on(event, cd)
    }

    off(event: any, offCb: any) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex((cb: any) => cb === offCb)
            this.subs[event].splice(index, 1)
            if (!this.subs[event].length) delete this.subs[event]
        }
    }

}


export default new Msg()