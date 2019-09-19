
import Msg from './msg'

export const push = ({ path, state }: { path: string, state?: string }) => {
    Msg.trigger('app:route', { type: 'push', path, state })
}

export const replace = ({ path, state }: { path: string, state?: string }) => {
    Msg.trigger('app:route', { type: 'replace', path, state })
}

export const goBack = () => {
    Msg.trigger('app:route', { type: 'goBack' })
}

export const go = ({ go }: { go: number }) => {
    Msg.trigger('app:route', { type: 'go', go })

}

