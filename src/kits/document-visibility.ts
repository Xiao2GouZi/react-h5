import { useState, useEffect } from 'react'


type VisibilityState = "hidden" | "visible" | "prerender";

/**
 * 'visible' : 此时页面内容至少是部分可见. 即此页面在前景标签页中，并且窗口没有最小化.
 * 'hidden' : 此时页面对用户不可见. 即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态' . 
 * 'prerender' : 页面此时正在渲染中, 因此是不可见的 (considered hidden for purposes of document.hidden). 文档只能从此状态开始，永远不能从其他值变为此状态.注意: 浏览器支持是可选的.
 * 'unloaded' : 页面从内存中卸载清除. 注意: 浏览器支持是可选的.
 */
export function useDocumentVisibility(): VisibilityState | boolean {
    function getVisibility() {
        if (typeof document === "undefined") return true;
        return document.visibilityState;
    }

    let [documentVisibility, setDocumentVisibility] = useState(getVisibility());

    function handleVisibilityChange() {
        setDocumentVisibility(getVisibility());
    }

    useEffect(() => {
        window.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return documentVisibility;
}

/**
 * 
 * function MyComponent() {
 *  let documentVisibility = useDocumentVisibility();
 *  // documentVisibility = "hidden" | "visible" | "prerender"
 *  // ...
 * }
 * 
 */
