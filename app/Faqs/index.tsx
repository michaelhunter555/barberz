import { StyledView, StyledText, StyleText } from '../../components/shared/SharedStyles';
import AccordionGroup from '@/components/Accordion/AccordionGroup';
import { Button, List } from 'react-native-paper';
// Array.from({ length: 10 }).map((_, i) => ({ id: i, isOpen: false, questionText: }))
const FAQS = [
    {id: 0, isOpen: false, questionText: 'How can I contact support?', explanationText: 'You can contact support by opening a support item, live Chat or email @email.com'},
    {id: 1, isOpen: false, questionText: 'When am I charged?', explanationText: 'After sending the selected service an appointment confirmation, your registered card is only charged once the service accepts the appointment.'},
    {id: 2, isOpen: false, questionText: 'The service accepted the appointment but did not honor our appointment.', explanationText: 'Please notify us immediately by filing a claim. File your claim within 48 hours and you\'ll receive a credit full amount.'},
    {id: 3, isOpen: false, questionText: 'Can I request to reschedule an appointment after it\'s been confirmed?', explanationText: 'If the service has accepted your appointment and you\'ve already been charged, there will be a 30% service fee for requesting a reschedule.'},
    {id: 4, isOpen: false, questionText: 'I am not happy with my service. What are my options?', explanationText: 'If you are unhappy with the service you received, you are entitled to request a partial or full refund. The service/business also has the right to respond from which if an agreement cannot be made, we will make the final decision.'},
    {id: 5, isOpen: false, questionText: 'What happens if I ordered an on-demand service (house call) and decided not to let them for my own personal reasons.', explanationText: 'On-demand is created for your convenience, but we also understand that your comfort and safety always comes first. If you feel the service/individual has presented themselves in an unprofessional manner, you may refuse the service. However, there will be a service charge of 50% if we cannot determine a legitimate grounds for refusing the service entry.'},
    {id: 6, isOpen: false, questionText: 'How are tips handled?', explanationText: 'You have two opportunities to tip. Once before sending the confirmation and once again 2 hours after the service has been completed and you are prompted for a review. You do not have to tip if you do not want to.'},
    {id: 7, isOpen: false, questionText: 'Do you offer referrals?', explanationText: 'Yes, you can earn up to $15 in credit for every user that joins with your referral code. Your referals will also get a $15 discount on their first service.'},
];

const FaqAccordion = () => {
   return (
    <StyledView>
        <StyledView style={{ marginVertical: 10 }} align="center" justify="center">
        <StyleText style={{ fontWeight: 700, fontSize: 20 }}>FAQS</StyleText>
        </StyledView>
        <AccordionGroup arr={FAQS} />
        <StyledView style={{ marginTop: 50 }} align="center" justify="center">
            <StyleText>Don't see your question?</StyleText>
            <Button mode="outlined">Send us a Message</Button>
        </StyledView>
    </StyledView>
) 
};

export default FaqAccordion;