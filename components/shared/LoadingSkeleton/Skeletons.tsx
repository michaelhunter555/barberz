import { View } from 'react-native';
import { StyledBlurView, StyledView } from '../SharedStyles';
import SkeletonLoading from "./LoadingSkeleton";

// Input Skeleton
export const SkeletonInput = () => {
    return (
        <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
        <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          
          <StyledView style={{ flex:1, }}>
              <StyledView style={{ backgroundColor: "#adadad", height: 50, marginBottom: 3, borderRadius: 5 }} />
          </StyledView>
        </StyledView>
            </SkeletonLoading>
    )
};

export const SkeletonButton = () => {
    return (
        <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
        <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          
          <StyledView style={{ flex:1, }}>
              <StyledView style={{ backgroundColor: "#adadad", height: 40, marginBottom: 3, borderRadius: 30 }} />
          </StyledView>
        </StyledView>
            </SkeletonLoading>
    )
}


export const SkeletonCard = () => {
    return (
        <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: 60, height: 60, backgroundColor: "#adadad", borderRadius: 50 }} />

          <View style={{ flex:1, marginLeft: 10 }}>
              <View style={{ backgroundColor: "#adadad", width: "60%", height: 10, marginBottom: 3, borderRadius: 5 }} />
              <View style={{ backgroundColor: "#adadad", width: '40%', height: 8, borderRadius: 5 }} />
              <View style={{ backgroundColor: "#adadad", width: '40%', height: 8, borderRadius: 5, marginTop: 3 }} />
          </View>
        </View>
    </SkeletonLoading>
        
    )
}

export const SkeletonTextLine = () => {
    return (
        <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
          <View style={{ flex:1, marginLeft: 10 }}>
              <View style={{ backgroundColor: "#adadad", width: "60%", height: 10, marginBottom: 3, borderRadius: 5 }} />
          </View>
    </SkeletonLoading>
    )
}


export const ManySkeletonTextLines = ({lines, isColumn, width }: {width: number; isColumn?: boolean; lines?: number;}) => {
    if(lines && lines > 1) {
        return (
            <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
                <StyledView style={{ flex: 1 }} direction={isColumn ? "column": "row"}>
                {Array.from({ length: lines }).map((_, i) => (
                    <View key={i} style={{ width }}>
                        <View style={{ backgroundColor: "#adadad", width: "60%", height: 10, borderRadius: 5 }} />
                    </View>
                ))}
                </StyledView>
            </SkeletonLoading>
        )
    }
    return (
        <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
          <View style={{ flex:1, }}>
              <View style={{ backgroundColor: "#adadad", width , height: 10, borderRadius: 5 }} />
          </View>
        
    </SkeletonLoading>
    )
}
