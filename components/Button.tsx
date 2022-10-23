import { DOMAttributes } from "react"

type Props = {
    onClick: (event?: any) => any
    children: React.ReactNode
    value: number | string
}
const Button = (props: Props) => {

    return (
        <button
        className={`py-2 px-4 bg-green-100 rounded-full`}
        {...props}
        />
    )
}

export default Button