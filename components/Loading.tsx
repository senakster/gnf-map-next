import { it } from 'node:test'
import {useState, useEffect} from 'react'

type Props = {
    type?: string
}
const Loading = (props: Props) => {
    const {type} = props
    const [iterator,setIterator] = useState<number>(0)
    useEffect(() => {
        setTimeout(() => {
            setIterator(iterator > 2 ? 0 : iterator + 1)
        }, 500)
    },[iterator])
    return (
        <div id="__LOADING" className={``}>
            Loading {type} {[...Array.from(Array(iterator).keys())].map((_, i) => '.')
            }
        </div>
    )
}

export default Loading