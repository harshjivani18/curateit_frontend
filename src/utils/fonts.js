import { 
    Literata, 
    Piazzolla, 
    Source_Serif_4, 
    Atkinson_Hyperlegible, 
    Inter, 
    IBM_Plex_Sans, 
    Public_Sans, 
    Source_Sans_3, 
    Rubik 
}                       from "next/font/google"

const literata      = Literata({ subsets: ['latin'] }) 
const piazzolla     = Piazzolla({ subsets: ['latin'] })
const sourceSerif   = Source_Serif_4({ subsets: ['latin'] })
const atkinson      = Atkinson_Hyperlegible({ subsets: ['latin'], weight: "400" })
const inter         = Inter({ subsets: ['latin'] })
const ibmPlex       = IBM_Plex_Sans({ subsets: ['latin'], weight: "300" })
const publicSans    = Public_Sans({ subsets: ['latin'] })
const sourceSans    = Source_Sans_3({ subsets: ['latin'] })
const rubik         = Rubik({ subsets: ['latin'] })

export { literata, piazzolla, sourceSerif, atkinson, inter, ibmPlex, publicSans, sourceSans, rubik }