import { TouchableOpacity, View, } from 'react-native';
import { Avatar, Icon, IconButton, Button, Divider } from 'react-native-paper';
import { StyleText, StyledBlurView, StyledView } from '../shared/SharedStyles';
import { router } from 'expo-router';

interface IBarberInfoSection {
    name: string;
    userImgPath: string;
    location: string;
    rating: number;
    price: number;
    id?: number;
    handleClose: () => void;
}
// title: "0", id:0 , image: '', rating: 4.5, name: 'Dave Marcus', location: 'Baltimore, Md', price: 80}

const BarberMapProfile = ({ name, userImgPath, location, rating, price, id, handleClose }: IBarberInfoSection) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end', gap: 45
        }}>
            <View style={{ width: '100%' }}>
                <StyledView direction="row" align="center" justify="space-between">

                <StyledView direction="row" align="center" gap={10}>
                    <StyleText style={{ fontSize: 20, fontWeight: 600 }}>{name}</StyleText>
                    <StyledBlurView isPaper style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}>
                        <Icon source="star" size={15} /> 
                    <StyleText>{rating}</StyleText>
                    </StyledBlurView>
                    <StyledBlurView isPaper style={{ overflow: 'hidden', borderRadius: 5, padding: 5, flexDirection: 'row', gap: 2 }}> 
                    <Icon source="check-circle" size={15} />
                        <StyleText>Verified</StyleText>
                        </StyledBlurView>
                </StyledView>

                <IconButton icon="close" onPress={handleClose} />
                </StyledView>
                
                <StyledView direction="row" align="center" gap={10}>
                <Avatar.Image style={{ marginVertical: 5 }} size={70} source={{ uri: userImgPath }} />
                <Divider style={{ width: 1, height: 50 }} />
                  
                <StyledBlurView isPaper style={{ padding: 10 }}>
                    <StyledView direction="column" align="center">
                        <StyleText>Starting Price:</StyleText>
                        <StyleText style={{ fontSize: 15 }}>${price}</StyleText>
                    </StyledView>
                    </StyledBlurView> 

                    <StyledBlurView isPaper style={{ padding: 10 }}>
                    <StyledView direction="column" align="center">
                        <StyleText>Status:</StyleText>
                        <StyleText style={{ fontSize: 15 }}>Available</StyleText>
                    </StyledView>
                    </StyledBlurView>   

                    <StyledBlurView 
                        clickable 
                        onClick={() => router.push({ 
                        pathname: "/barbers/[id]", 
                        params: {   
                        id: String(id), 
                        name,
                        location,
                        image: userImgPath,
                        price: price.toString(),
                        }})} style={{ padding: 10, backgroundColor: '#007AFF' }}>
                    <StyledView direction="column" align="center">
                        <StyleText style={{ color: 'white'}}>View</StyleText>
                        <Icon color="white" source="arrow-right" size={20} />
                    </StyledView>
                    </StyledBlurView>          
                </StyledView>
            </View>
        </View>
    )
}

export default BarberMapProfile;