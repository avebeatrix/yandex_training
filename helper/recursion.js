function trampoline(fn) {
    return function(...args) {
        let result = fn(...args);

        while (result && typeof result === 'function') {
            result = result();
        }

        return result;
    };
}


let recursion = () => {    
    return () => recursion();					
}	

const _recursion = trampoline(recursion);

_recursion();