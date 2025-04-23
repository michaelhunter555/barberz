import { ScrollView } from 'react-native';
import { StyledView, StyledText, StyledBlurItem } from "../shared/SharedStyles";
import { Divider } from "react-native-paper";
import UserReview from './UserReview'

// userReviews.map((review,i) => review{...data})

const testImg = "https://plus.unsplash.com/premium_photo-1661542987765-f39368ff358d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const ReviewList = () => {
    return Array.from({ length: 10 }).map((_, i) => (
       <StyledView direction="column" justifyContent="flex-start">
        <UserReview 
        userImage={testImg}
        userName="user name"
        reviewDate="4/1/25" 
        reviewRating={5} 
        reviewText="this is a reivew list this is a reivew list  this is a reivew list this is a reivew list this is a reivew list this is a reivew list this is a reivew list" />
        <Divider style={{ width: '100%', marginVertical: 2 }} />
       </StyledView>

    ))
};

export default ReviewList;