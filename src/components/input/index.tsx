import { TextInput, TextInputProps, Text} from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";


type Props = TextInputProps & {
    title?: string
}

export function Input({ title, ...rest }: Props) {
    return(
        <>
            <Text style={styles.text}> {title}</Text>
            <TextInput
                style={styles.container}
                placeholderTextColor={colors.orange[800]}
                {...rest}
            />
        </>
        
    )
}