import { View, Text, } from 'react-native';
import styled from 'styled-components/native';

export default function Barbers() {
    return (
        <StyledView>
            <Text style={{ color: 'white'}}>BARBERS</Text>
        </StyledView>
    )
}

const StyledView = styled.View`
display: flex;
flex: 1;
justify-content: center;
align-items: center;
`;

