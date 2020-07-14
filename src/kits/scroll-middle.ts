
/** 延迟执行 */
const promiseDelay = (delay: number) => (
    new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
)

/** 元素滑动 */
const contentScrollTo = (contentRef: any, cCurrent: number, type: 'x' | 'y') => {
    if (contentRef && contentRef.scrollTo) {
        if (type === 'x') {
            contentRef.scrollTo(cCurrent, 0)
        } else {
            contentRef.scrollTo(0, cCurrent)
        }
    }
}

/** 滑动动画 */
const scrollAnimation = async (current: number, target: number, contentRef: any, type: 'x' | 'y') => {
    const needScrollTop = target - current
    let cCurrent = current
    await promiseDelay(1)
    const dist = Math.ceil(needScrollTop / 10)
    cCurrent += dist
    contentScrollTo(contentRef, cCurrent, type)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
        await scrollAnimation(cCurrent, target, contentRef, type)
    } else {
        contentScrollTo(contentRef, cCurrent, type)
    }
}

/** 水平方向滑动 */
const scrollXMiddle = async (contentClientWidth: number, contentScrollWidth: number, currentOffsetLeft: number, currentClientWidth: number, currentScroll: number, contentRef: any, offset: IScrollOffect) => {
    let scrollX = 0
    if (currentOffsetLeft + currentClientWidth <= contentClientWidth / 2) {
        scrollX = 0 - offset.left
    } else if (currentOffsetLeft + currentClientWidth + contentClientWidth / 2 > contentScrollWidth) {
        scrollX = contentScrollWidth - contentClientWidth + offset.right
    } else {
        const a = currentOffsetLeft % contentClientWidth
        // eslint-disable-next-line radix
        const b = parseInt(`${currentOffsetLeft / contentClientWidth}`)
        scrollX = b * contentClientWidth + a + currentClientWidth / 2 - contentClientWidth / 2
    }
    await scrollAnimation(currentScroll, scrollX, contentRef, 'x')
    return scrollX
}

/** 竖直方向滑动 */
const scrollYMiddle = async (contentClientHeight: number, contentScollHeight: number, currentOffsetTop: number, currentClientHeight: number, currentScroll: number, contentRef: any, offset: IScrollOffect) => {
    let scrollY = 0
    if (currentOffsetTop + currentClientHeight <= contentClientHeight / 2) {
        scrollY = 0 - offset.top
        // eslint-disable-next-line max-len
    } else if (currentOffsetTop + currentClientHeight + contentClientHeight / 2 > contentScollHeight) {
        scrollY = contentScollHeight - contentClientHeight + offset.bottom
    } else {
        const a = currentOffsetTop % contentClientHeight
        // eslint-disable-next-line radix
        const b = parseInt(`${currentOffsetTop / contentClientHeight}`)
        scrollY = b * contentClientHeight + a + currentClientHeight / 2 - contentClientHeight / 2
    }
    await scrollAnimation(currentScroll, scrollY, contentRef, 'y')
    // eslint-disable-next-line no-param-reassign
    return scrollY
}

interface IScrollOffect {
    left: number,
    right: number,
    top: number,
    bottom: number
}

/**
 *  scroll 中的item滑动到中间
 * @param currentRef   item ref
 * @param contentRef   scroll ref
 * @param type         x: x轴 y: y轴
 * @param currentScroll  记录变量
 */
export const scrollMiddle = async (currentRef: any, contentRef: any, type: 'x' | 'y', offset: IScrollOffect = { left: 0, right: 0, top: 0, bottom: 0 }) => {
    const {
        clientWidth: contentClientWidth,
        scrollWidth: contentScrollWidth,
        clientHeight: contentClientHeight,
        scrollHeight: contentScollHeight,
        scrollLeft: contentScrollLeft,
        scrollTop: contentSrollTop,
    } = contentRef
    const {
        offsetLeft: currentOffsetLeft,
        clientWidth: currentClientWidth,
        offsetTop: currentOffsetTop,
        clientHeight: currentClientHeight,
    } = currentRef
    if (type === 'x') {
        // eslint-disable-next-line max-len
        return scrollXMiddle(contentClientWidth, contentScrollWidth, currentOffsetLeft, currentClientWidth, contentScrollLeft, contentRef, offset)
    }
    // eslint-disable-next-line max-len
    return scrollYMiddle(contentClientHeight, contentScollHeight, currentOffsetTop, currentClientHeight, contentSrollTop, contentRef, offset)
}
