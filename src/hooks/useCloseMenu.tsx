import { useEffect } from "react"

const useCloseMenu = (menuRef: React.RefObject<HTMLElement>, cartButtonRef: HTMLElement | null, reducer: (boolean: boolean) => void, toggle: boolean) => {

    useEffect(() => {    
        const closeMenu = (e: MouseEvent) => {
            if (menuRef.current && cartButtonRef) {
                
                if (!menuRef.current.contains(e.target as Node) && !cartButtonRef.contains(e.target as Node)) {
                    reducer(false);
                    console.log('Клик')
                }
            }
        }

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu)
    }, [toggle]);
}

export default useCloseMenu;

// Кастомны хуки могут содержать в себе аргументы которые можно изменять, но так же они могут возвращать какие-то елементы