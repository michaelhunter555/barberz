import { View} from 'react-native';
import { Chip, Icon } from 'react-native-paper';

const filterOptions = [
    { icon: "triangle", text: 'near' },
    { icon: "square", text: 'deals' },
    { icon: "cards-diamond", text: 'best' }
]

export const FilterBarberChips = () => {
    return(
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}}>
            {filterOptions.map(({text, icon}) => (
                <Chip textStyle={{ color:'black', fontSize: 12}} style={{ borderWidth:1, borderColor: '#999', borderRadius: 50, backgroundColor: '#fff', }} icon={() => (
                    <Icon source={icon} color="#222" size={10} />
                )} key={text}>
                    {text}
                </Chip>
            ))}
        </View>
    )
}