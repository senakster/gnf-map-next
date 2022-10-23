import { useRouter } from "next/router"
import Link from "next/link"
import Button from "@components/Button"

const LanguageSwitcher = () => {
    const router = useRouter()
    const {route, locale, asPath, locales} = router

    const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        router.push(route, asPath, {
            locale: value,
        });
    };
    return (
        <header className="fixed top-4 right-4 z-10">
            <nav>
                {locales?.filter(l => l != locale).map((l, i) => 
                    <Button
                        key={i}
                        onClick={handleLocaleChange} 
                        value={l}
                    >
                    {l.split('-')[0]}                       
                    </Button>  
                )}
            </nav>
            

        </header>
    )
}

export default LanguageSwitcher