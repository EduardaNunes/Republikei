import { MaterialIcons } from "@expo/vector-icons"

type Category = {
    id: string
    name: string
    icon: keyof typeof MaterialIcons.glyphMap
}

export const categories: Category[] = [
    {id:"1", name:"Meus Imóveis", icon:"code"},
    {id:"2", name:"República", icon:"folder"},
    {id:"3", name:"Apartamento", icon:"language"},
    {id:"4", name:"Kitnet", icon:"newspaper"},
    {id:"5", name:"Quarto", icon:"movie"},
    {id:"6", name:"Documentação", icon:"content-paste"},
]