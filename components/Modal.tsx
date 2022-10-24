import Button from '@components/Button'
import { saneNames } from './Maptalks'

type Props = {
    toggle: (params?: false | {municipality?: string}) => void,
    modalOpen: false | {municipality?: string},
    pageData: GroupMunicipality[]
}
const Modal = (props: Props) => {
    const {toggle, modalOpen, pageData} = props
    // console.log(pageData)
    return (
        <section id='Modal' className={`fixed inset-0 ${modalOpen && modalOpen?.municipality ? '' : 'hidden'}`}>
            <div className={`absolute inset-0 bg-black opacity-50 -z-10`}></div>
            <Button className="m-4" onClick={() => toggle(false)}>x</Button>
            <div className={`absolute inset-16 text-white overflow-auto scrollbar-hide`}>
                <>
                {modalOpen && typeof modalOpen?.municipality === 'string' && <h2 className='text-2xl'>{modalOpen.municipality}</h2>}
                {modalOpen && 
                    pageData
                    .find(m => modalOpen?.municipality ? m.title === saneNames(modalOpen?.municipality) : false)?.
                    groups
                    .map((g,i) => {
                        return(
                            <ul key={i} className="flex gap-4">
                                <li className='shrink-0'>{g.title}:</li>
                                <li><a href={g.facebook} target="_blank" rel="noreferrer">[FACEBOOK]
                                </a></li>
                            </ul>
                        )
                    }
                    )
                }
                </>
            </div>
        </section>
    )
}

export default Modal