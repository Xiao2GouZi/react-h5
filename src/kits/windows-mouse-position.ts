import { useState, useEffect } from 'react'

interface IWindowMousePositionRes {
    x: number,
    y: number
}

export function useWindowMousePosition(): IWindowMousePositionRes {
    let [WindowMousePosition, setWindowMousePosition] = useState({
        x: 0,
        y: 0
    });

    function handleMouseMove(e: { pageX: number, pageY: number }) {
        setWindowMousePosition({
            x: e.pageX,
            y: e.pageY
        });
    }
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return WindowMousePosition;
}

/**
 *
 * function MyComponent() {
 *  let { x, y } = useWindowMousePosition();
 *  return (
 *      <div style={{ width: "100%", height: "100%" }}>
 *          <pre>{JSON.stringify({ x, y })}</pre>
 *      </div>
 *  );
 * }
 *
 */
