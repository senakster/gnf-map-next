import { DOMAttributes } from "react"

type Props = {
    onClick: (event?: any) => any
    children: React.ReactNode
    name?: string,
    value?: number | string
    className?: string
}
const Button = (props: Props) => {
    const {name, value, className, onClick, children} = props
    
    
    return (
        <button
        className ={`py-2 px-4 bg-green text-black rounded-full ${className}`}
        {...{name, value, onClick}}
        >
         {children}
        </button>
    )
}

export default Button