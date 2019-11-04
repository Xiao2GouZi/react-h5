class Msg {
    subs: any
    constructor() {
        this.subs = {}
    }

    on(event: string, cd: Function) {
        (this.subs[event] || (this.subs[event] = [])).push(cd)
    }

    trigger(event: string, ...args: any) {
        this.subs[event] && this.subs[event].forEach((cd: any) => {
            cd(...args)
        });
    }

    once(event: string, onceCb: Function) {
        const cd = (...args: any) => {
            onceCb(...args)
            this.off(event, onceCb)
        }
        this.on(event, cd)
    }

    off(event: string, offCb: any) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex((cb: any) => cb === offCb)
            this.subs[event].splice(index, 1)
            if (!this.subs[event].length) delete this.subs[event]
        }
    }

}


export default new Msg()