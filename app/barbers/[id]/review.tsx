import { useLocalSearchParams, router } from "expo-router";
import { Image } from "react-native";
import { StyledView, StyleText, StyledBlurView, StyledDivider } from "@/components/shared/SharedStyles";
import { Divider, Icon } from "react-native-paper";
import SelectedReview from "@/components/ReviewsList/SelectedReview";
import { StarRatings } from "@/components/shared/ratings/ratings";


// userReviews.map((review,i) => review{...data})

const testImg = "https://plus.unsplash.com/premium_photo-1661542987765-f39368ff358d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const review = "This barber did the full service and I have no complaints. I arrived at 10 o clock and the chair was ready. He asked me what I would like and I gave a brief description which I thought was quite vague, but he got it perfectly. In terms of cleanliness, the shop clippers, blade and chair was all good. I was very happy with this cut. Didn't push my hairline back and found a way to keep it sharp. Highly Recommended!";
const Review = () => {
    const { id, reviewText, totalImages } = useLocalSearchParams();
    return ( 
    <StyledView direction="column" align="flex-start" style={{ padding: 10 }}>
        <StyledView direction="row" align="center" gap={10} style={{ marginVertical: 10 }}>
        <SelectedReview
        userImage={testImg}
        userName="user name"
        reviewDate="4/1/25" 
        reviewRating={5} 
        reviewText={review} />
        <StyledDivider orientation="vertical" height={50} />
        <StyleText style={{ fontSize: 40, fontWeight: 700 }}>5.0</StyleText>
        </StyledView>
        <Divider style={{ width: '100%', marginVertical: 5 }} />
        <StyleText>3 Photos</StyleText>
        <StyledView direction="row" align="center" gap={10}>
        {Array.from({ length: 3}).map((_, i) => (
            <Image style={{ borderRadius: 8 }} key={i} width={70} height={70} source={{ uri: testImg }} alt="review-img" />
        ))}
        </StyledView>
        <Divider style={{ width: '100%', marginVertical: 5 }} />
        <StyledView direction="row" align="center" gap={8}>
        <StyleText style={{ fontSize: 14, fontWeight: 700, paddingBottom: 2 }}>Punctuality:</StyleText>
        <StarRatings userRating={4.8} isReview size={15} color="white"/>

        </StyledView>
        <StyledView direction="row" align="center" gap={8}>
        <StyleText style={{ fontSize: 14, fontWeight: 700, paddingBottom: 2 }}>Cleanliness:</StyleText>
        <StarRatings userRating={4.8} isReview size={15} color="white"/>

        </StyledView>
        <StyledView direction="row" align="center" gap={8}>

        <StyleText style={{ fontSize: 14, fontWeight: 700, paddingBottom: 2 }}>Overall:</StyleText>
        <StarRatings userRating={4.8} isReview size={15} color="white"/>
        </StyledView>
        <Divider style={{ marginVertical: 5, width: '80%' }} />
        <StyleText style={{ fontWeight: 700, paddingBottom: 2 }}>Review:</StyleText>
        <StyleText style={{ fontSize: 14 }}>
            {review}
        </StyleText>
        <StyledBlurView style={{ marginVertical: 10, paddingHorizontal: 10 }} borderRadius={20} clickable onClick={() => router.back()}>
        <StyledView direction="row" align="center" gap={5} style={{ marginVertical: 10 }}>

        <Icon source="arrow-left" size={15} />
            <StyleText>Go back</StyleText>
        </StyledView>
        </StyledBlurView>
       </StyledView>
       )
};



export default Review;